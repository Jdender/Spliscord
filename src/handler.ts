import { Spliscord } from './client.i';
import { Message } from 'discord.js';
import { CommandMessage } from './cmdUtil.i';

export function handleCommand (client: Spliscord, message: Message) {
    message = message as CommandMessage;
}