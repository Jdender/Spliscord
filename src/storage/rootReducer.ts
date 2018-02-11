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
                        id: action.id
                    }
                }
            };

        case TypeKeys.ADD_GUILD:
            return {
                ...state,
                guilds: {
                    ...state.guilds,
                    [action.id]: {
                        id: action.id
                    }
                }
            };

        default:
            return state;
    }
}