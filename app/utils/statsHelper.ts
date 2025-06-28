import { StatType, PlayerGameLog } from '../types/index';

export function calculateGamesOverThreshold(
	playerGameLog: PlayerGameLog[],
	statType: StatType,
	threshold: number,
	filters?: {
		lastNGames?: number;
		opponent?: string
	}
): {
	gamesOver: number;
	filteredGames: PlayerGameLog[]
} {
	let filteredGames = [...playerGameLog];

	// Apply opponent filter first
	if (filters?.opponent) {
		filteredGames = filteredGames.filter(
			game => game.matchup.split(" ").at(-1) === filters.opponent
		);
	}

	// Apply last N games filter
	if (filters?.lastNGames && filters.lastNGames > 0) {
		filteredGames = filteredGames.slice(0, filters.lastNGames);
	}

	const gamesOver = filteredGames.filter(game => (game[statType] ?? 0) > threshold).length;

	return {
		gamesOver,
		filteredGames
	};
}

// export function getStatSummary(
// 	playerGameLogData: PlayerGameLogData[],
// 	statType: StatType,
// ) {
// 	if (playerGameLogData.length === 0) {
// 		return {
// 			total: 0,
// 			average: 0,
// 			max: 0,
// 			min: 0,
// 			gamesPlayed: 0
// 		};
// 	}
//
// 	const values = playerGameLogData.map(game => game[statType] ?? 0);
//
// 	const total = values.reduce((sum, value) => sum + value, 0);
// 	const average = total / values.length;
// 	const max = Math.max(...values);
// 	const min = Math.min(...values);
//
// 	return {
// 		total,
// 		average: Math.round(average * 10) / 10,
// 		max,
// 		min,
// 		gamesPlayed: values.length
// 	};
// }
