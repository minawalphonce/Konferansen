import React, { useState } from 'react';
import { ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { Box, Text, TouchableBox, Screen } from "@konferensen/ui";
import { useMembers, useMemberSearch } from "@konferensen/query";
import type { MemberGrade, MemberGender } from "@konferensen/query";

const FilterButton = ({
    label,
    selected,
    onPress
}: {
    label: string;
    selected: boolean;
    onPress: () => void;
}) => (
    <TouchableBox
        onPress={onPress}
        backgroundColor={selected ? "primary" : "cardBackground"}
        paddingHorizontal="m"
        paddingVertical="s"
        borderRadius="m"
        marginRight="s"
    >
        <Text variant={selected ? "button" : "body"}>
            {label}
        </Text>
    </TouchableBox>
);

const MembersScreen = () => {
    const {
        filteredMembers,
        loading,
        error,
        setFilters,
        clearFilters,
        sortMembers,
        currentSort
    } = useMembers();

    const {
        searchQuery,
        setSearchQuery
    } = useMemberSearch();

    const [selectedGrade, setSelectedGrade] = useState<MemberGrade | null>(null);
    const [selectedGender, setSelectedGender] = useState<MemberGender | null>(null);

    // Handle filter changes
    const handleGradeFilter = (grade: MemberGrade) => {
        const newGrade = selectedGrade === grade ? null : grade;
        setSelectedGrade(newGrade);
        setFilters({ grade: newGrade });
    };

    const handleGenderFilter = (gender: MemberGender) => {
        const newGender = selectedGender === gender ? null : gender;
        setSelectedGender(newGender);
        setFilters({ gender: newGender });
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        setFilters({ searchQuery: text });
    };

    if (loading) {
        return (
            <Screen>
                <Box flex={1} justifyContent="center" alignItems="center">
                    <ActivityIndicator size="large" color="#0000ff" />
                </Box>
            </Screen>
        );
    }

    if (error) {
        return (
            <Screen>
                <Box flex={1} justifyContent="center" alignItems="center">
                    <Text variant="body" color="error">Error loading members</Text>
                </Box>
            </Screen>
        );
    }

    return (
        <Screen scrollable>
            <Box padding="m">
                {/* Search Bar */}
                <Box
                    backgroundColor="cardBackground"
                    borderRadius="m"
                    padding="m"
                    marginBottom="m"
                >
                    <TextInput
                        placeholder="Search members..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                        style={{
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingHorizontal: 10,
                        }}
                    />
                </Box>

                {/* Filters */}
                <Box flexDirection="row" marginBottom="m">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {/* Grade Filters */}
                        {(['10th', '11th', '12th', 'graduated'] as MemberGrade[]).map(grade => (
                            <FilterButton
                                key={grade}
                                label={grade}
                                selected={selectedGrade === grade}
                                onPress={() => handleGradeFilter(grade)}
                            />
                        ))}

                        {/* Gender Filters */}
                        {(['male', 'female'] as MemberGender[]).map(gender => (
                            <FilterButton
                                key={gender}
                                label={gender}
                                selected={selectedGender === gender}
                                onPress={() => handleGenderFilter(gender)}
                            />
                        ))}
                    </ScrollView>
                </Box>

                {/* Members List */}
                <Box>
                    {filteredMembers.map(member => (
                        <TouchableBox
                            key={member.id}
                            backgroundColor="cardBackground"
                            padding="m"
                            marginBottom="s"
                            borderRadius="m"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Box>
                                <Text variant="body">{member.name}</Text>
                                <Text variant="caption" color="textLight">
                                    {member.grade} • {member.gender}
                                </Text>
                            </Box>
                            <Box>
                                <Text variant="caption" color="textLight">
                                    Score: {member.totalScore}
                                </Text>
                            </Box>
                        </TouchableBox>
                    ))}
                </Box>
            </Box>
        </Screen>
    );
};

export default MembersScreen;