import { Client, Message, RichEmbedOptions } from 'discord.js';
import { CommandMeta } from '../../classes/registry';
import snekfetch = require('snekfetch');

// Embed Reaction Menu Image Pager

async function createErmip
(getImage: () => Promise<string>, embed: RichEmbedOptions, message: Message, client: Client) {

    const reactions = ['⭐', '▶', '❌'];

    const reactedRecently = new Set();

    function ratelimit() {
        reactedRecently.add(message.author.id);
        setTimeout(() => reactedRecently.delete(message.author.id), 5000);
    }

    embed.image = { url: await getImage() };

    const menu = await message.channel.send({ embed }) as Message;

    await reactions.forAwaitEach(async emoji => await menu.react(emoji));

    const collector = menu.createReactionCollector(
        (reaction, user) => 
        user.id === message.author.id &&
        reactions.includes(reaction.emoji.name)
    );

    function timerEnd() {

        menu.edit({
            embed: { 
                ...embed,
                image: { url: '' },
                description: '**Ermip closed for waiting too long**',
            },
        });

        collector.stop();
    }

    let timerHandle = setTimeout(timerEnd, 30000);
    function resetTimer() {
        clearTimeout(timerHandle);
        timerHandle = setTimeout(timerEnd, 30000);
    }

    const actions: {[index:string]: () => void} = {
        ['⭐']() {

            if (!(menu.embeds[0] && menu.embeds[0].image && menu.embeds[0].image.url)) return;

            message.channel.send(`Saved cat: ${menu.embeds[0].image.url}`);
        },
        ['▶']() {

            if (reactedRecently.has(message.author.id)) return;

            ratelimit();
            resetTimer();

            getImage()
            .then(url => ({ ...embed, image: { url }}))
            .then(embed => menu.edit({ embed }));
        },
        ['❌']() {

            menu.edit({
                embed: { 
                    ...embed,
                    image: { url: '' },
                    description: '**Ermip closed by message author**',
                },
            });
            
            collector.stop();
        },
    };

    ratelimit();

    collector.on('collect', reaction => {
        if (actions[reaction.emoji.name])
            actions[reaction.emoji.name]();

        reaction.users
        .filter(user => user !== client.user)
        .forEach(user => reaction.remove(user));
    });
}

const metaTemplate = {
    usage: '',
    cooldown: 3,
    permissions: 0,
    args: null,
};

const embedTemplate = {
    color: 3447003,
    timestamp: new Date(),
    footer: {
      text: 'Please wait for all reactions to appear and don\'t spam; this will timeout if it has no activity in 30 seconds.',
    },
    image: { url: '' },
};

interface AutoErmipCommandConfig {

    meta: CommandMeta;
    embed: RichEmbedOptions;
    getImage: () => Promise<string>;
}

const autoCommands: AutoErmipCommandConfig[] = [
    {
        meta: {
            ...metaTemplate,
            name: 'ermip.cat',
            description: 'Test the bot\'s latency.',
            aliases: ['ermip.cats', 'ermip.meow', 'cat', 'cats', 'meow'],
        },
        embed: {
            ...embedTemplate,
            title: 'Random Cat Ermip',
            description: 'This is a Embed Reaction Menu Image Pager for random cat images!',
        },
        getImage: (): Promise<string> => 
            snekfetch.get('https://thecatapi.com/api/images/get?format=xml')
            .then(res => res.text)
            .then(xml => /<url>(.*)<\/url>/.exec(xml))
            .then(match => match ? match[1] : '')
    }
];



export default (client: Client) => 
    autoCommands.forEach(cmd => {
        
        client.registry.addCommand(cmd.meta);

        client.registry.on(cmd.meta.name, ({message}) => 
            createErmip(cmd.getImage, cmd.embed, message, client)
        );
    });
