import { StatType, PlayerGameLogResponse, PlayerGameLog } from '../types/index';

export function calculateGamesOverThreshold(
	playerGameLog: PlayerGameLogResponse,
	statType: StatType,
	threshold: number,
	filters?: {
		lastNGames?: number;
		opponent?: string
	}
): { gamesOver: number; filteredGames: PlayerGameLog[] } {
	let filteredGames = [...playerGameLog.data];

	// Apply opponent filter first
	if (filters?.opponent) {
		filteredGames = filteredGames.filter(
			game => game.matchup.split(" ").at(-1) === filters.opponent
		);
	}

	// Apply last N games filter
	if (filters?.lastNGames && filters.lastNGames > 0) {
		filteredGames = filteredGames.slice(-filters.lastNGames);
	}

	const gamesOver = filteredGames.filter(game => (game[statType] ?? 0) > threshold).length;

	return {
		gamesOver,
		filteredGames
	};
}

export function getStatSummary(
	gameLog: PlayerGameLog[],
	statType: StatType,
) {
	if (gameLog.length === 0) {
		return {
			total: 0,
			average: 0,
			max: 0,
			min: 0,
			gamesPlayed: 0
		};
	}

	const values = games.map(game => game[statType] ?? 0);

	const total = values.reduce((sum, value) => sum + value, 0);
	const average = total / values.length;
	const max = Math.max(...values);
	const min = Math.min(...values);

	return {
		total,
		average: Math.round(average * 10) / 10,
		max,
		min,
		gamesPlayed: values.length
	};
}
