import { useEffect } from "react";
import { useAppStoreActions, useAppStoreState } from "../store";

export const Firebase = () => {
    const isAuthenticated = useAppStoreState(state => state.me !== null);
    const [subscribeToSchedule, unsubscribe] = useAppStoreActions(actions => [actions.subscribeToSchedule, actions.unsubscribe]);

    useEffect(() => {
        if (isAuthenticated) {
            subscribeToSchedule();
        }
        return () => {
            unsubscribe();
        }
    }, [isAuthenticated]);
    return <></>;
}