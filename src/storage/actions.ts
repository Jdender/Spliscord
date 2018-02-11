export type ActionsTypes = |
    AddUserAction |
    AddGuildAction |
    SetUserPrefixAction;

export enum TypeKeys {
    ADD_USER = 'ADD_USER',
        ADD_GUILD = 'ADD_GUILD',
        SET_USER_PREFIX = 'SET_USER_PREFIX',
}

export interface AddUserAction {
    type: TypeKeys.ADD_USER;
    id: string;
}

export interface AddGuildAction {
    type: TypeKeys.ADD_GUILD;
    id: string;
}

export interface SetUserPrefixAction {
    type: TypeKeys.SET_USER_PREFIX;
    id: string;
    prefix: string;
}