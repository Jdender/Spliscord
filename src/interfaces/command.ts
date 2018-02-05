export default interface Command {
    name: string;
    execute(...args: any[]): void;
    description: string;
    cooldown: number;
    aliases?: string[];
    usage?: string;
}