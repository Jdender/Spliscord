import { Command } from '../cmdUtil/commands.i';

export type ActionsTypes = |
    SaveCommandAction;

export enum TypeKeys {
    SAVE_COMMAND = 'SAVE_COMMAND',
}

export interface SaveCommandAction {
    type: TypeKeys.SAVE_COMMAND;
    cmd: Command;
}