import { applyOptions } from '../../../util/applyOptions';
import { Command, CommandOptions, KlasaMessage } from 'klasa';
import { Collection } from 'discord.js';
import { FunMisc } from '../../../services/FunMisc';

@applyOptions<CommandOptions>({
    name: 'spinthebottle',
    aliases: ['stb', 'spin', 'bottle'],
    usage: '<start|stop|join|leave|spin|list>',
    subcommands: true,
})
export default class extends Command {

    // Collection<Guild.id, User.id[]>
    private sessions = new Collection<string, string[]>();

    start = (message: KlasaMessage) => {

        // Start game
        this.sessions.set(message.guild.id, [message.author.id]);

        return message.send('Started a game. Spin with `,stb spin`, have others join using `,stb join`, and stop the game with `,stb stop`');
    };

    stop = (message: KlasaMessage) => {

        // No active game?
        if (!this.sessions.has(message.guild.id))
            return message.send('There\'s no active game to stop.');

        // Delate active game
        this.sessions.delete(message.guild.id);

        return message.send('Stoped the current game.');
    };

    join = (message: KlasaMessage) => {

        const current = this.sessions.get(message.guild.id);

        // If not active game redirect to start subcommand
        if (!current) return this.start(message);

        // Allredy in the game?
        if (current.includes(message.author.id))
            return message.send('You can\'t join a game twice.');

        // Push to array
        current.push(message.author.id);

        this.sessions.set(message.guild.id, current);
        
        return message.send('Added you to the current game.');
    };

    leave = (message: KlasaMessage) => {
        
        // Is there a active session?
        const current = this.sessions.get(message.guild.id);

        if (!current) return message.send('There\'s to game to leave in the first place.');

        // Will session be empty?
        if (current.length <= 1) return this.stop(message);

        // Is the user in said session?
        const index = current.indexOf(message.author.id);

        if (index === -1) return message.send('You can\'t leave a game you never joined.');

        // Remove from array
        current.splice(index, 1);

        this.sessions.set(message.guild.id, current);

        return message.send('Removed you from the game.');
    };

    spin = (message: KlasaMessage) => {

        // Session?
        const current = this.sessions.get(message.guild.id);

        if (!current) return message.send('There\'s no active game to spin.');

        // At least two people?
        if (current.length < 2) return message.send('You need at least two people in the game to spin.');

        // Pick random member
        const member = FunMisc.randomEle(current);

        return message.send(`The bottle landed on <@${member}>!`);
    };

    list = (message: KlasaMessage) => {

        // Session?
        const current = this.sessions.get(message.guild.id);

        if (!current) return message.send('There\'s no active game to list.');

        // Display list
        const list = current
            .map(m => message.guild.members.get(m)) // Map ids to user
            .filter(m => m) // Filter non existant users (if it can even happen)
            .map(m => m!.nickname) // Get usernames
            .map(n => ` • ${n}`) // Add fancy dot
            .join('\n') // Join by newline

        return message.send(`Members currently in game:\n${list}`);
    };
}
