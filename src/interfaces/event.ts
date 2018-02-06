export default interface Event {
    name: string;
    execute(...args: any[]): void | Promise < void > ;
}