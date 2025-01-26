import { useState, useEffect, useMemo, useCallback } from 'react';
import { collection, query, orderBy, onSnapshot, where, Timestamp, QueryConstraint } from 'firebase/firestore';
import type { Member, MemberGrade, MemberGender } from '../models';

import { db } from '../firebase';

type MemberFilters = {
    searchQuery?: string;
    grade?: MemberGrade;
    gender?: MemberGender;
    groupId?: string;
    roomId?: string;
};

type UseMembersReturn = {
    members: Member[];
    loading: boolean;
    error: Error | null;
    filteredMembers: Member[];
    setFilters: (filters: MemberFilters) => void;
    clearFilters: () => void;
    sortMembers: (key: keyof Member) => void;
    currentSort: { key: keyof Member; ascending: boolean } | null;
};

const DEFAULT_SORT_KEY: keyof Member = 'name';

export const useMembers = (): UseMembersReturn => {
    // State management
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [filters, setFilters] = useState<MemberFilters>({});
    const [currentSort, setCurrentSort] = useState<{ key: keyof Member; ascending: boolean }>({
        key: DEFAULT_SORT_KEY,
        ascending: true,
    });

    // Firestore subscription
    useEffect(() => {
        setLoading(true);

        // Base query
        const queryConstraints: QueryConstraint[] = [
            orderBy('lastActive', 'desc')
        ];

        // Add any server-side filters here if needed
        // Example: if (filters.grade) queryConstraints.push(where('grade', '==', filters.grade));

        const membersQuery = query(
            collection(db, 'members'),
            //...queryConstraints
        );

        const unsubscribe = onSnapshot(
            membersQuery,
            (snapshot) => {
                const membersData: Member[] = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Member));

                setMembers(membersData);
                setLoading(false);
                setError(null);
            },
            (err) => {
                console.error('Error fetching members:', err);
                setError(err as Error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []); // Empty dependency array since we're handling filters client-side

    // Client-side filtering
    const filteredMembers = useMemo(() => {
        return members.filter(member => {
            let matches = true;

            if (filters.searchQuery) {
                const search = filters.searchQuery.toLowerCase();
                matches = matches && (
                    member.name.toLowerCase().includes(search) ||
                    member.phone.includes(search)
                );
            }

            if (filters.grade) {
                matches = matches && member.grade === filters.grade;
            }

            if (filters.gender) {
                matches = matches && member.gender === filters.gender;
            }

            if (filters.groupId) {
                matches = matches && member.groupId === filters.groupId;
            }

            if (filters.roomId) {
                matches = matches && member.roomId === filters.roomId;
            }

            return matches;
        }).sort((a, b) => {
            const aValue = a[currentSort.key];
            const bValue = b[currentSort.key];

            const comparison = typeof aValue === 'string'
                ? aValue.localeCompare(bValue as string)
                : (aValue as number) - (bValue as number);

            return currentSort.ascending ? comparison : -comparison;
        });
    }, [members, filters, currentSort]);

    // Filter management
    const updateFilters = useCallback((newFilters: MemberFilters) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters
        }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({});
    }, []);

    // Sorting management
    const sortMembers = useCallback((key: keyof Member) => {
        setCurrentSort(prev => ({
            key,
            ascending: prev.key === key ? !prev.ascending : true
        }));
    }, []);

    return {
        members,
        loading,
        error,
        filteredMembers,
        setFilters: updateFilters,
        clearFilters,
        sortMembers,
        currentSort
    };
};

// Helper hook for member search
export const useMemberSearch = (initialQuery: string = '') => {
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    return {
        searchQuery,
        setSearchQuery,
        debouncedQuery
    };
};

// Cache management for members
const MEMBERS_CACHE_KEY = 'members_cache';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

type CachedData = {
    timestamp: number;
    data: Member[];
};

export const useMembersCache = () => {
    const saveToCache = useCallback((members: Member[]) => {
        const cacheData: CachedData = {
            timestamp: Date.now(),
            data: members
        };
        localStorage.setItem(MEMBERS_CACHE_KEY, JSON.stringify(cacheData));
    }, []);

    const loadFromCache = useCallback((): Member[] | null => {
        const cached = localStorage.getItem(MEMBERS_CACHE_KEY);
        if (!cached) return null;

        const { timestamp, data }: CachedData = JSON.parse(cached);
        if (Date.now() - timestamp > CACHE_EXPIRY) {
            localStorage.removeItem(MEMBERS_CACHE_KEY);
            return null;
        }

        return data;
    }, []);

    const clearCache = useCallback(() => {
        localStorage.removeItem(MEMBERS_CACHE_KEY);
    }, []);

    return {
        saveToCache,
        loadFromCache,
        clearCache
    };
};