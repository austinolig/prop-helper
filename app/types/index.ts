export interface GameLog {
	seasonId: string;
	playerId: number;
	gameId: string;
	gameDate: string;
	matchup: string;
	wl: 'W' | 'L';
	min: number;
	fgm: number;
	fga: number;
	fgPct: number;
	fg3m: number;
	fg3a: number;
	fg3Pct: number;
	ftm: number;
	fta: number;
	ftPct: number;
	oreb: number;
	dreb: number;
	reb: number;
	ast: number;
	stl: number;
	blk: number;
	tov: number;
	pf: number;
	pts: number;
	plusMinus: number;
	videoAvailable: number;
}

export type GameLogData = [
	string,
	number,
	string,
	string,
	string,
	'W' | 'L',
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
];

export interface PlayersTable {
	id: number;
	full_name: string;
	first_name: string;
	last_name: string;
	is_active: boolean;
}
