import { useEffect } from "react";
import { useAppStoreActions, useAppStoreState } from "../store";

export const Firebase = () => {
    const isAuthenticated = useAppStoreState(state => state.me !== null);
    const groupId = useAppStoreState(state => state.me?.groupId);
    const [subscribeToSchedule, subscribeToProfile, subscribeToGroup] = useAppStoreActions(actions => [
        actions.subscribeToSchedule,
        actions.subscribeToProfile,
        actions.subscribeToGroup,
    ]);

    useEffect(() => {
        if (isAuthenticated) {
            let unsbSchedule1: () => void;
            let unsubProfile1: () => void;

            Promise.all([subscribeToSchedule(), subscribeToProfile()]).then(([unsbSchedule, unsubProfile]) => {
                unsbSchedule1 = unsbSchedule;
                unsubProfile1 = unsubProfile;
            })

            return () => {
                unsbSchedule1();
                unsubProfile1();
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated && groupId) {
            let unsubGroup1: () => void;
            subscribeToGroup()?.then((unsubGroup) => unsubGroup1 = unsubGroup)
            return () => {
                unsubGroup1();
            }
        }
    }, [isAuthenticated, groupId])
    return <></>;
}