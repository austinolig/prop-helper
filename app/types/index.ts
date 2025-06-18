export interface GameStat {
	opponent: string;
	points: number;
	rebounds: number;
	assists: number;
	date: string;
}

export interface PlayerSeason {
	playerId: string;
	playerName: string;
	season: string;
	team: string;
	games: GameStat[];
}

export type StatType = 'points' | 'rebounds' | 'assists';
