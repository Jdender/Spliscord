import { KlasaClient, PermissionLevels, KlasaClientOptions } from 'klasa';

// Bool to change config if in prod or not
const prod = process.env.NODE_ENV === 'production';

// Declare bot operators using ids and comments
const operators = [
    '250432205145243649' // Jdender~
];

// Change bot config here
export const config: KlasaClientOptions = {
    prefix: prod ? ',' : '`', // Use "," in prod, "`" in dev
    readyMessage: client => `${client.user.tag}, Runing in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`,
};

// Permissions levels
config.permissionLevels = new PermissionLevels()

// Eveyone
.add(0, () => true)

// Guild owner
.add(7, (_, message) => message.guild && message.member === message.guild.owner, { fetch: true })

// Bot operators
.add(9, (_, message) => operators.includes(message.author.id), { break: true })

// Bot operators (Hidden commands)
.add(10, (_, message) => operators.includes(message.author.id));
