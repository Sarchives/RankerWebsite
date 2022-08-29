export interface User {
    id: string;
    avatar: string;
    username: string;
    avatar_decoration: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string;
    banner_color: string;
    accent_color: string;
    locale: string;
    mfa_enabled: boolean;
}

export interface Guild {
    features: string[];
    icon: string;
    id: string;
    name: string;
    owner: boolean;
    permissions: string;
}

export interface SimpleGuild {
    name: string;
    description: string;
    icon: string;
    is_joinable: boolean;
}

export interface Settings {
    minRange: number;
    maxRange: number;
}

export interface Role {
    id: string;
    guild: string;
    level: number;
    roleId: string;
    roleName: string;
}

export interface Player {
    id: string;
    lastCreditDate: string;
    messages: number;
    nextXp: number;
    level: number;
    totalXp: number;
    xp: number;
    guild: string;
    user: string;
    username: string;
    discriminator: string;
    avatar: string;
    style: string;
}

export interface GuildLeaderboard {
    managesGuild: boolean;
    guild: SimpleGuild;
    settings: Settings;
    roles: Role[];
    players: Player[];
}