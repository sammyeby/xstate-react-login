import {assign, createMachine, interpret} from 'xstate';
import axios from "axios";
import { IUser, AccessEvents } from "./models";


export const accessMachine = createMachine({
        predictableActionArguments: true,
        schema: {
            context: {} as { user: IUser | null; apiBaseUrl: string },
            events: {} as AccessEvents,
        },
        id: 'access',
        initial: 'noUser',
        context: {
            user: null,
            apiBaseUrl: ''
        },
        on: {
            UPDATE_API_BASE_URL: {
                actions: "updateApiBaseUrl"
            }
        },
        states: {
            noUser: {
                on: {
                    GET_USER: {
                        target: "gettingUser"
                    },
                    GET_USER_DONE: {
                        actions: "assignToContext",
                        target: "hasUser"
                    },
                },
            },
            gettingUser: {
                invoke: {
                    src: "refreshUser",
                    onDone: {
                        target: 'hasUser',
                        actions: "assignToContext",
                    },
                    onError: {
                        target: 'noAccess',
                        actions: 'assignNoUser'
                    }
                },
            },
            hasUser: {
                on: {
                    GET_USER_DONE: {
                        actions: "assignToContext",
                    },
                    GET_USER: {
                        target: "gettingUser"
                    },
                    REVOKE_USER: {
                        target: "noAccess",
                        actions: 'assignNoUser'
                    }
                }
            },
            noAccess: {
                on: {
                    GET_USER_DONE: {
                        actions: "assignToContext",
                        target: "hasUser"
                    },
                }
            }
        },
    },
    {
        actions: {
            assignToContext: assign({
                user: (_ctx, evt) => evt.data
            }),
            assignNoUser: assign({
                user: null
            }),
            updateApiBaseUrl: assign({
                apiBaseUrl: (_ctx, evt) => evt.url
            })
        },
        services: {
            refreshUser: (ctx) =>
                async () => {
                    if (!ctx.user) {
                        const {data} = await axios.get(`${ctx.apiBaseUrl}/refresh`);
                        return {...data, isAuthenticated: true};
                    }
                }
        }
    }
);


export const globalService = interpret(accessMachine)
    // .onTransition((state) => console.log(state.value))
    // .start();
