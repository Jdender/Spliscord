import { Events } from './events';
import { Spliscord } from './client';
import { BotConfig } from './configs';
import { Constructor } from './oneline';
const { on, once, registerEvents } = Events;

export function logger < T extends Constructor < Spliscord > > (Main: T) {
    class Logger extends Main {

        constructor(...args: any[]) {
            super(...args);
            registerEvents(this);
        }

        @on('ready')
        logOnReady() {
            console.info(`[info] Runing in ${this.channels.size} channels on ${this.guilds.size} servers, for a total of ${this.users.size} users.`);

            this.user.setActivity(`@Spliscord help | ${this.guilds.size} Guilds, ${this.channels.size} Channels, ${this.users.size} Users.`);

            this.prefixMention = new RegExp(`^<@!?${this.user.id}> `);
            this.inviteLink = `https://discordapp.com/oauth2/authorize?client_id=${this.user.id}&scope=bot`;
        }

        @on('debug')
        logOnDebug(message: string) {
            console.info(message);
        }

        @on('warn')
        logOnWarn(warning: string) {
            console.warn(warning);
        }

        @on('error')
        logOnError(error: string) {
            console.error(error);
        }

        @on('disconnect')
        logOnDisconnect() {
            console.warn('[warn] [internet] Bot disconnected.');
        }

        @on('reconnect')
        logOnReconnect() {
            console.info('[info] [internet] Bot reconnected.');
        }
        
    }
    return Logger;
}