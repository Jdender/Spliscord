import applyOptions from '../util/applyOptions';
import { Event } from 'klasa';

@applyOptions({
    name: 'updateActivity',
    event: 'guildMemberAdd',
})
export default class extends Event {

    run() {
        this.client.user.setActivity(
        `@Spliscord help | ${this.client.guilds.size} Guilds, ${this.client.channels.size} Channels, ${this.client.users.size} Users.`
        );
    }

    async init() {
        // Update activity on ready
        this.run();
    }
}
