/**
 * Represents a single game log entry for a player
 * Contains comprehensive statistics from a basketball game
 */
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

/**
 * Raw game log data array from API response
 * Maps directly to GameLog interface properties in order
 */
export type GameLogData = [
	GameLog['seasonId'],
	GameLog['playerId'],
	GameLog['gameId'],
	GameLog['gameDate'],
	GameLog['matchup'],
	GameLog['wl'],
	GameLog['min'],
	GameLog['fgm'],
	GameLog['fga'],
	GameLog['fgPct'],
	GameLog['fg3m'],
	GameLog['fg3a'],
	GameLog['fg3Pct'],
	GameLog['ftm'],
	GameLog['fta'],
	GameLog['ftPct'],
	GameLog['oreb'],
	GameLog['dreb'],
	GameLog['reb'],
	GameLog['ast'],
	GameLog['stl'],
	GameLog['blk'],
	GameLog['tov'],
	GameLog['pf'],
	GameLog['pts'],
	GameLog['plusMinus'],
	GameLog['videoAvailable']
];

/**
 * Player information from the database
 */
export interface PlayersTable {
	id: number;
	full_name: string;
	first_name: string;
	last_name: string;
	is_active: boolean;
}

/**
 * Filter state for game log filtering
 * Keys represent filter types, values are the selected filter values
 */
export interface FilterState {
	[key: string]: string;
}

/**
 * Option for dropdown filters
 */
export interface FilterOption {
	value: string;
	label: string;
}
