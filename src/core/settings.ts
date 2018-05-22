import { ClientOptions } from 'discord.js';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export interface BotConfig {
    client: ClientOptions;
    maxSubCommandDepth: number;
    contributors: Array<{
        name: string;
        id: string;
        roles: number[];
    }>;
}

@Entity()
export class UserConfig {

    @PrimaryColumn('text')
    public id!: string;

    @Column({ type: 'text', nullable: true })
    public prefix?: string;
}

@Entity()
export class GuildConfig {

    @PrimaryColumn('text')
    public id!: string;

    @Column({ type: 'text', nullable: true })
    public prefix?: string;

    @Column({ type: 'text', nullable: true })
    public adminRole?: string;

    @Column({ type: 'text', nullable: true })
    public modRole?: string;

    @Column({ type: 'text', nullable: true })
    public joinRole?: string;

    @Column({ type: 'integer', nullable: true })
    public allowRoleColorme?: boolean;
}
