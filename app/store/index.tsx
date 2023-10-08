import { type PropsWithChildren } from "react";
import {
    type Computed, computed,
    type Action, action,
    type Thunk, thunk,
    createStore, StoreProvider, persist, createTypedHooks
} from "easy-peasy";

import { storage } from "./persists-storage";

type ScheduleItem = {
    date: Date,
    from: number,
    to: number,
    item: string,
    type: "food" | "location"
}

type FoodMenuItem = {
    date: Date,
    order: number,
    title: "breakfast" | "lunch" | "dinner" | "fika",
    name: string,
    ingredients?: string,
    picture?: string
}

type Group = {
    id: number,
    color: string,
    members: {
        name: string,
        picture?: string
    }[]
}

type MyProfile = {
    id: string,
    name: string,
    phone: string,
    gender: "M" | "F",
    churche: string,
    grade: string,
    groupId: number,
    groupColorCode: string,
    picture: string,
    roomId: string
}

type AppStoreModel = {
    schedule: ScheduleItem[],
    foodMenu: FoodMenuItem[],
    group: Group | null,
    me: MyProfile | null,

    isAuthenticated: Computed<AppStoreModel, boolean>,

    updateSchedule: Action<AppStoreModel, ScheduleItem[]>,
    updateFoodMenu: Action<AppStoreModel, FoodMenuItem[]>,
    updateProfile: Action<AppStoreModel, MyProfile | null>,
    updateGroup: Action<AppStoreModel, Group["members"]>,

    login: Thunk<AppStoreModel, { phoneNumber: string, code: string }>,
    logout: Thunk<AppStoreModel>,
}

const store = createStore<AppStoreModel>(persist({
    schedule: [],
    foodMenu: [],
    group: null,
    me: null,

    //#region [compted]
    isAuthenticated: computed(state => state.me !== null),
    //#endregion

    //#region [actions]
    updateSchedule: action((state, payload) => {
        state.schedule = payload
    }),
    updateFoodMenu: action((state, payload) => {
        state.foodMenu = payload
    }),
    updateProfile: action((state, payload) => {
        state.me = payload;
        if (payload !== null)
            state.group = {
                id: payload.groupId,
                color: payload.groupColorCode,
                members: [
                    ...state.group?.members || []
                ]
            }
        else
            state.group = null
    }),
    updateGroup: action((state, payload) => {
        state.group!.members = payload
    }),
    //#endregion

    login: thunk((actions, { phoneNumber, code }) => {
        //1. find firebase member by code and verify phone number 
        //2. if yes login 
        //3. if no then return error 
    }),
    logout: thunk((actions) => {
        actions.updateProfile(null);
    })
}, {
    "mergeStrategy": "overwrite",
    "storage": storage
}));

const typedHooks = createTypedHooks<AppStoreModel>();

export const AppStoreProvider = (props: PropsWithChildren) => <StoreProvider {...props} store={store} />
export const useAppStoreActions = typedHooks.useStoreActions;
export const useAppStoreState = typedHooks.useStoreState;