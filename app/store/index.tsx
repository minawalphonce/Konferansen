import { type PropsWithChildren } from "react";
import {
    type Action, action,
    type Thunk, thunk,
    createStore, StoreProvider, persist, createTypedHooks, ActionOn
} from "easy-peasy";

import { storage } from "./persists-storage";
import * as services from "../services";

import taraneem from "./taraneem.json";
import memory from "./memory.json";
import images from "../assets/images";

let storeEnhancers: any[] = [];
if (__DEV__) {
    const reactotron = require("../reactoron").default;
    storeEnhancers = [...storeEnhancers, reactotron.createEnhancer()];
}

export type ScheduleItem = {
    id: string,
    from: Date,
    to: Date,
    details: string
}

export type Tarnima = {
    image: keyof typeof images,
    id: string,
    name: string,

    formatedText: Record<string, (string | Record<string, string>)[][]> //lang : MD text
    downloadLink?: string,
}

export type Memory = {
    id: string,
    title: string,
    reference: string,
    formatedText: Record<string, (string | Record<string, string>)[]> //lang : MD text,
}

export type FoodMenuItem = {
    date: Date,
    order: number,
    title: "breakfast" | "lunch" | "dinner" | "fika",
    name: string,
    ingredients?: string,
    picture?: string
}

export type Group = {
    id: number,
    color: string,
    members: {
        name: string,
        picture?: string
    }[]
}

export type MyProfile = {
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
    taraneem: Tarnima[],
    memory: Memory[],
    group: Group | null,
    me: MyProfile | null,

    updateSchedule: Action<AppStoreModel, ScheduleItem[]>,
    updateFoodMenu: Action<AppStoreModel, FoodMenuItem[]>,
    updateProfile: Action<AppStoreModel, MyProfile | null>,
    updateGroup: Action<AppStoreModel, Group["members"]>,

    login: Thunk<AppStoreModel, { phone: string, pin: number }>,
    logout: Thunk<AppStoreModel>,
    unsubscribe: Thunk<AppStoreModel>,

    subscribeToSchedule: Thunk<AppStoreModel>,
    subscribeToGroup?: Thunk<AppStoreModel>,
    subscribeToMe?: Thunk<AppStoreModel>,
}
const store = createStore<AppStoreModel>(
    persist(
        {
            schedule: [],
            foodMenu: [],
            taraneem: taraneem as Tarnima[],
            memory: memory as Memory[],
            group: null,
            me: null,

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

            unsubscribe: thunk(() => {
                services.unsubscribe();
            }),

            login: thunk(async (actions, { phone, pin }) => {
                const result = await services.login(phone, pin);
                if (result.success) {
                    actions.updateProfile(result.data);
                    return null;
                } else {
                    return result.message;
                }
            }),
            logout: thunk((actions) => {
                actions.updateProfile(null);
            }),

            subscribeToSchedule: thunk((actions) => {
                services.schedule((data) => {
                    actions.updateSchedule(
                        data.docs.filter(x => x.data().Details).map(doc => {
                            const data = doc.data();
                            return {
                                id: doc.id,
                                to: data.To.toDate(),
                                from: data.From.toDate(),
                                details: data.Details

                            }
                        })
                    )
                })
            })
        },
        {
            "storage": storage,
            "allow": ["me"]
        }),
    {
        enhancers: [...storeEnhancers]
    });

const typedHooks = createTypedHooks<AppStoreModel>();

export const AppStoreProvider = (props: PropsWithChildren) => <StoreProvider {...props} store={store} />
export const useAppStoreActions = typedHooks.useStoreActions;
export const useAppStoreState = typedHooks.useStoreState;