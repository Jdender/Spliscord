export type ActionsTypes = |
    AddUserAction |
    SetUserPrefixAction;

export enum TypeKeys {
    ADD_USER = 'ADD_USER',
        SET_USER_PREFIX = 'SET_USER_PREFIX',
}

export interface AddUserAction {
    type: TypeKeys.ADD_USER;
    id: string;
}

export interface SetUserPrefixAction {
    type: TypeKeys.SET_USER_PREFIX;
    id: string;
    prefix: string;
}