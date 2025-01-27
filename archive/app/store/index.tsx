import { type PropsWithChildren } from "react";
import {
    type Action, action,
    type Thunk, thunk,
    createStore, StoreProvider, persist, createTypedHooks, ActionOn
} from "easy-peasy";

import { storage } from "./persists-storage";
import * as services from "../services";

import memory from "./memory.json";
import images from "../assets/images";
import { Unsubscribe } from "firebase/firestore";

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
    image: string,
    id: string,
    name: string,

    formatedText: Record<string, ((string | (string | Record<string, string>)[])[]) | undefined>
    downloadLink?: string,
}

export type Memory = {
    id: string,
    title: string,
    formatedText: Record<string, ((string | (string | Record<string, string>)[])[]) | undefined>
}

// export type FoodMenuItem = {
//     date: Date,
//     order: number,
//     title: "breakfast" | "lunch" | "dinner" | "fika",
//     name: string,
//     ingredients?: string,
//     picture?: string
// }

export type Group = {
    id: number,
    color: string,
    members: {
        name: string,
        profile?: string
    }[]
}

export type MyProfile = {
    id: string,
    name: string,
    phone: string,
    gender: "M" | "F",
    churche: string,
    grade: string,
    groupId?: number,
    groupColorText?: string,
    groupColorCode?: string,
    profile?: string,
    roomId?: string,
    building?: string,
    room?: string,

}

type AppStoreModel = {
    schedule: ScheduleItem[] | null,
    myMemory: string[],
    taraneem: Tarnima[],
    memory: Memory[],
    group: Group | null,
    me: MyProfile | null,
    groupScores: Record<string, number>,
    myScore: number,

    updateSchedule: Action<AppStoreModel, ScheduleItem[] | null>,
    updateProfile: Action<AppStoreModel, MyProfile | null>,
    updateGroup: Action<AppStoreModel, Group["members"]>,
    updateMyMemory: Action<AppStoreModel, string[]>,
    updateMyScore: Action<AppStoreModel, number>,
    updateGroupsScore: Action<AppStoreModel, Record<string, number>>,
    setTaraneem: Action<AppStoreModel, Tarnima[]>,

    login: Thunk<AppStoreModel, { phone: string, pin: number }>,
    logout: Thunk<AppStoreModel>,

    subscribeToSchedule: Thunk<AppStoreModel, void, void, any, Unsubscribe>,
    subscribeToProfile: Thunk<AppStoreModel, void, void, any, Unsubscribe>,
    subscribeToGroup: Thunk<AppStoreModel, void, void, any, Unsubscribe | undefined>,
    subscribeToMyMemory: Thunk<AppStoreModel, void, void, any, Unsubscribe | undefined>,
    subscribeToGroupsScore: Thunk<AppStoreModel, void, void, any, Unsubscribe | undefined>,
    subscribeToMemberScore: Thunk<AppStoreModel, void, void, any, Unsubscribe | undefined>,
    loadTaraneem: Thunk<AppStoreModel>
}
const store = createStore<AppStoreModel>(
    persist(
        {
            schedule: [],
            myMemory: [],
            taraneem: [],
            memory: memory as Memory[],
            group: null,
            me: null,
            groupScores: {},
            myScore: 0,

            //#region [actions]
            updateSchedule: action((state, payload) => {
                state.schedule = payload
            }),
            updateProfile: action((state, payload) => {
                state.me = payload;
                if (payload !== null)
                    state.group = {
                        id: payload.groupId!,
                        color: payload.groupColorText!,
                        members: []
                    }
                else
                    state.group = null
            }),
            updateGroup: action((state, payload) => {
                if (state.group)
                    state.group.members = payload
            }),
            updateMyMemory: action((state, payload) => {
                state.myMemory = payload
            }),
            updateGroupsScore: action((state, payload) => {
                state.groupScores = payload;
            }),
            updateMyScore: action((state, payload) => {
                state.myScore = payload
            }),
            setTaraneem: action((state, payload) => {
                state.taraneem = payload
            }),
            //#endregion

            login: thunk(async (actions, { phone, pin }) => {
                const result = await services.login(phone, pin);
                if (result.success) {
                    actions.updateProfile({
                        id: result.id!,
                        grade: result.data.Grade,
                        name: result.data.Name,
                        gender: result.data.Gender,
                        phone: result.data.Phone,
                        groupId: result.data.GroupId,
                        churche: result.data.Churche,
                        groupColorCode: result.data.Color,
                        groupColorText: result.data.Group,
                        profile: result.data.Profile,
                        roomId: result.data.RoomId,
                        room: result.data.Room,
                        building: result.data.Building
                    });
                    return null;
                } else {
                    return result.message;
                }
            }),
            logout: thunk((actions) => {
                actions.updateProfile(null);
                actions.updateSchedule(null);
            }),

            subscribeToSchedule: thunk((actions) => {
                return services.schedule((data) => {
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
            }),
            subscribeToProfile: thunk((actions, _, helpers) => {
                const meId = helpers.getState().me!.id;
                return services.profile(meId, (result) => {
                    const data = result.data()!;
                    actions.updateProfile({
                        id: result.id,
                        grade: data.Grade,
                        name: data.Name,
                        gender: data.Gender,
                        phone: data.Phone,
                        groupId: data.GroupId,
                        churche: data.Churche,
                        groupColorCode: data.Color,
                        groupColorText: data.Group,
                        profile: data.Profile,
                        roomId: data.RoomId,
                        room: data.Room,
                        building: data.Building
                    })
                })
            }),
            subscribeToGroup: thunk((actions, _, helpers) => {
                const groupId = helpers.getState().me?.groupId;
                if (groupId) {
                    return services.group(
                        groupId,
                        (data) => {
                            actions.updateGroup(data.docs.map(doc => {
                                const data = doc.data();
                                return {
                                    "name": data.Name,
                                    "profile": data.Profile
                                }
                            }))
                        })
                }
            }),
            subscribeToMyMemory: thunk((actions, _, helpers) => {
                const phoneNumber = helpers.getState().me?.phone;
                if (phoneNumber) {
                    return services.myMemory(phoneNumber, (items) => {
                        actions.updateMyMemory(items.map(i => i.memoryId));
                    });
                }
            }),
            subscribeToGroupsScore: thunk((actions) => {
                return services.groupsScoreCalculator(values => {
                    actions.updateGroupsScore(values);
                })
            }),
            subscribeToMemberScore: thunk((actions, _, helpers) => {
                const phone = helpers.getState().me?.phone;
                if (phone) {
                    return services.memberScoreCalculator(phone, value => {
                        actions.updateMyScore(value);
                    })
                }
            }),
            loadTaraneem: thunk(async (actions) => {
                const taraneem = await services.downloadTaraneem();
                actions.setTaraneem(taraneem);
            })
        },
        {
            "storage": storage,
            "allow": ["me", "group", "groupScores", "myScore"]
        }),
    {
        version: 5,
        enhancers: [...storeEnhancers]
    });

const typedHooks = createTypedHooks<AppStoreModel>();

export const AppStoreProvider = (props: PropsWithChildren) => <StoreProvider {...props} store={store} />
export const useAppStoreActions = typedHooks.useStoreActions;
export const useAppStoreState = typedHooks.useStoreState;