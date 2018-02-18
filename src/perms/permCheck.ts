import {
    _perms,
    PermsObject,
    PermsClient,
    CommandMessage,
} from './permCheck.b';

export function permCheck(client: PermsClient, message: CommandMessage) {
    let permLevel = 0;

    let perms: PermsObject[] = [..._perms];

    while (perms.length) {
        const currentLevel: PermsObject = perms.pop();
        if (message.guild && currentLevel.guildOnly) continue;
        if (currentLevel.check(client, message)) {
            permLevel = currentLevel.level;
            break;
        }
    }
    return permLevel;
};