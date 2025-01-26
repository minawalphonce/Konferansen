import React, { useEffect } from "react";
import { useAppStoreActions, useAppStoreState } from "../store";
import * as Sentry from 'sentry-expo';

export const Firebase = () => {
    const isAuthenticated = useAppStoreState(state => state.me !== null);
    const groupId = useAppStoreState(state => state.me?.groupId);
    const [subscribeToSchedule,
        subscribeToProfile,
        subscribeToGroup,
        subscribeToMyMemory,
        subscribeToGroupsScore,
        subscribeToMemberScore,
        loadTaraneem
    ] = useAppStoreActions(actions => [
        actions.subscribeToSchedule,
        actions.subscribeToProfile,
        actions.subscribeToGroup,
        actions.subscribeToMyMemory,
        actions.subscribeToGroupsScore,
        actions.subscribeToMemberScore,
        actions.loadTaraneem
    ]);

    useEffect(() => {
        try {
            if (isAuthenticated) {
                const unsbSchedule = subscribeToSchedule();
                const unsubProfile = subscribeToProfile();
                const unsbMemory = subscribeToMyMemory();
                const unsbGroupScores = subscribeToGroupsScore();
                const unsbMemberScore = subscribeToMemberScore();
                loadTaraneem();
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
        }
        catch (ex) {
            Sentry.Native.captureException(ex);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        try {
            if (isAuthenticated && groupId) {
                const unsubGroup = subscribeToGroup();
                return () => {
                    if (unsubGroup)
                        unsubGroup();
                }
            }
        }
        catch (ex) {
            Sentry.Native.captureException(ex);
        }
    }, [isAuthenticated, groupId]);

    return <></>;
}