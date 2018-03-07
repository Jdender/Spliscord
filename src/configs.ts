import { ClientOptions } from 'discord.js';
import { Entity, Column, PrimaryColumn } from 'typeorm';

export interface BotConfig {
    token: {
        path: string;
        name: string;
    };
    client: ClientOptions;
    commandPath: string;
    maxSubCommandDepth: number;
    contributors: {
        name: string;
        id: string;
        roles: number[];
    }[];
}

@Entity()
export class UserConfig {

    @PrimaryColumn('text')
    id: string;

    @Column({ type: 'text', nullable: true })
    prefix ? : string;
}

@Entity()
export class GuildConfig {

    @PrimaryColumn('text')
    id: string;

    @Column({ type: 'text', nullable: true })
    prefix ? : string;

    @Column({ type: 'text', nullable: true })
    adminRole ? : string;

    @Column({ type: 'text', nullable: true })
    modRole ? : string;
}