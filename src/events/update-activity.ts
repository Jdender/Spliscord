import applyOptions from '../util/applyOptions';
import { Event } from 'klasa';

@applyOptions({
    type: 'commands',
    name: 'backdoor',
    usage: '<Guild:guild>',
})
export default class extends Event {

    run() {
        this.client.user.setActivity(
        `@Spliscord help | ${this.client.guilds.size} Guilds, ${this.client.channels.size} Channels, ${this.client.users.size} Users.`
        );
    }
}
