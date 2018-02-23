import { ActionsTypes, TypeKeys } from './actions';

const initialState = {
    commands: {},
    guilds: {},
    users: {},
};

export function rootReducer(state = initialState, action: ActionsTypes) {
    switch (action.type) {

        case TypeKeys.SAVE_COMMAND:
            return {
                ...state,
                commands: {
                    ...state.commands,
                    [action.cmd.name]: action.cmd,
                },
            };

        default:
            return state;
    }
}