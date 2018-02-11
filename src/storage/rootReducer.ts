import { ActionsTypes, TypeKeys } from './actions';

const initialState = {
    servers: {},
    users: {},
};

export function rootReducer(state = initialState, action: ActionsTypes) {
    switch (action.type) {
        case TypeKeys.SET_USER_PREFIX:
            break;
        default:
            return state;
    }
}