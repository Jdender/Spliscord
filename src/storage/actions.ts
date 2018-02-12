export type ActionsTypes = |
    AddUserAction |
    AddGuildAction |
    SetUserPrefixAction |
    SetGuildPrefixAction;

export enum TypeKeys {
    ADD_USER = 'ADD_USER',
        ADD_GUILD = 'ADD_GUILD',
        SET_USER_PREFIX = 'SET_USER_PREFIX',
        SET_GUILD_PREFIX = 'SET_GUILD_PREFIX',
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

export interface SetGuildPrefixAction {
    type: TypeKeys.SET_GUILD_PREFIX;
    id: string;
    prefix: string;
}