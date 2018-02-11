export type ActionsTypes = |
    SetUserPrefixAction;

export enum TypeKeys {
    SET_USER_PREFIX = 'SET_USER_PREFIX',
}

export interface SetUserPrefixAction {
    type: TypeKeys.SET_USER_PREFIX;
    id: string;
    prefix: string;
}