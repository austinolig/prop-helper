export interface PlayerGameLog {
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

export type PlayerGameLogData = [
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

export type StatType = 'pts' | 'reb' | 'ast';
