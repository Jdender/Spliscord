import { Client } from '../structures/Client';
import { Event } from 'klasa';

export default (client: Client) => {

    @client.RegisterPiece({
        type: 'events',
        name: 'update-activity',
        event: 'guildMemberAdd'
    })
    class Activity extends Event {

        run() {
            client.user.setActivity(
            `@Spliscord help | ${client.guilds.size} Guilds, ${client.channels.size} Channels, ${client.users.size} Users.`
            );
        }
    }
};
