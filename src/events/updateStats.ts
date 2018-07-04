import { applyOptions } from '../util/applyOptions';
import { Event } from 'klasa';
import snek = require('snekfetch');

@applyOptions({
    name: 'updateStats',
    event: 'guildCountChange',
})
export default class extends Event {

    async run() {

        this.updateActivity();

        if (process.env.API_BOTSFORDISCORD) this.updateBotsForDiscord();
    }

    private updateActivity = () =>
        this.client.user.setActivity(
`@Spliscord help | ${this.client.guilds.size} Guilds, ${this.client.channels.size} Channels, ${this.client.users.size} Users.`
        );

    private updateBotsForDiscord = () =>
        snek.post(`https://botsfordiscord.com/api/v1/bots/${this.client.user.id}`)
        .set('Authorization', process.env.API_BOTSFORDISCORD)
        .send({
            server_count: this.client.guilds.size,
        })
        // Throw error in next tick becuase of event loop
        .catch(err => process.nextTick(() => { throw err; }));

    async init() {

        // Create guildCountChange event
        const handler = (guild: any) => this.client.emit('guildCountChange', guild);

        this.client
        .on('guildCreate', handler)
        .on('guildDelete', handler);

        // Update activity on ready
        this.run();
    }
}
