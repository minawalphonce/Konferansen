import { useEffect } from "react";
import { useAppStoreActions, useAppStoreState } from "../store";

export const Firebase = () => {
    const isAuthenticated = useAppStoreState(state => state.me !== null);
    const groupId = useAppStoreState(state => state.me?.groupId);
    const [subscribeToSchedule,
        subscribeToProfile,
        subscribeToGroup,
        subscribeToMyMemory,
        subscribeToGroupsScore,
        subscribeToMemberScore
    ] = useAppStoreActions(actions => [
        actions.subscribeToSchedule,
        actions.subscribeToProfile,
        actions.subscribeToGroup,
        actions.subscribeToMyMemory,
        actions.subscribeToGroupsScore,
        actions.subscribeToMemberScore
    ]);

    useEffect(() => {
        if (isAuthenticated) {
            const unsbSchedule = subscribeToSchedule();
            const unsubProfile = subscribeToProfile();
            const unsbMemory = subscribeToMyMemory();
            const unsbGroupScores = subscribeToGroupsScore();
            const unsbMemberScore = subscribeToMemberScore();
            return () => {
                unsbSchedule();
                unsubProfile();
                if (unsbMemory)
                    unsbMemory();
                if (unsbGroupScores)
                    unsbGroupScores();
                if (unsbMemberScore)
                    unsbMemberScore();
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated && groupId) {
            const unsubGroup = subscribeToGroup();
            return () => {
                if (unsubGroup)
                    unsubGroup();
            }
        }
    }, [isAuthenticated, groupId])
    return <></>;
}