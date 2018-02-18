import { ActionsTypes, TypeKeys } from './actions';

const initialState = {
    guilds: {},
    users: {},
};

//TODO: Split `guilds` and `users` into sepret reducers.

export function rootReducer(state = initialState, action: ActionsTypes) {
    switch (action.type) {

        case TypeKeys.ADD_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.id]: {
                        id: action.id,
                    },
                },
            };

        case TypeKeys.SET_USER_PREFIX:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.id]: {
                        ...state.users[action.id],
                        prefix: action.prefix,
                    },
                },
            }

        case TypeKeys.ADD_GUILD:
            return {
                ...state,
                guilds: {
                    ...state.guilds,
                    [action.id]: {
                        id: action.id,
                    },
                },
            };

        case TypeKeys.SET_GUILD_PREFIX:
            return {
                ...state,
                guilds: {
                    ...state.guilds,
                    [action.id]: {
                        ...state.guilds[action.id],
                        prefix: action.prefix,
                    },
                },
            }

        case TypeKeys.SET_GUILD_ADMIN_ROLE:
        return {
            ...state,
            guilds: {
                ...state.guilds,
                [action.id]: {
                    ...state.guilds[action.id],
                    adminRole: action.role,
                },
            },
        }

        case TypeKeys.SET_GUILD_MOD_ROLE:
        return {
            ...state,
            guilds: {
                ...state.guilds,
                [action.id]: {
                    ...state.guilds[action.id],
                    modRole: action.role,
                },
            },
        }

        default:
            return state;
    }
}