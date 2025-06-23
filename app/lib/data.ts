import { PlayerGameLogResponse } from '../types/index';

export async function getPlayerGameLog(
	playerId: number = 2544 // Default to LeBron James' player ID
): Promise<PlayerGameLogResponse> {
	const baseUrl = process.env.VERCEL_ENV === 'production'
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: 'http://localhost:8000';

	console.log(`${baseUrl}/api/stats/${playerId}`);

	try {
		const response = await fetch(`${baseUrl}/api/stats/${playerId}`);

		if (!response.ok) {
			throw new Error(`(Error) status: ${response.status}`);
		}

		const data = await response.json();

		return {
			headers: data.data_sets[0].data.headers,
			data: data.data_sets[0].data.data.map((game: any) => ({
				seasonId: game[0],
				playerId: game[1],
				gameId: game[2],
				gameDate: game[3],
				matchup: game[4],
				wl: game[5],
				min: game[6],
				fgm: game[7],
				fga: game[8],
				fgPct: game[9],
				fg3m: game[10],
				fg3a: game[11],
				fg3Pct: game[12],
				ftm: game[13],
				fta: game[14],
				ftPct: game[15],
				oreb: game[16],
				dreb: game[17],
				reb: game[18],
				ast: game[19],
				stl: game[20],
				blk: game[21],
				tov: game[22],
				pf: game[23],
				pts: game[24],
				plusMinus: game[25],
				videoAvailable: Boolean(game[26]),
			})),
		}
	} catch (error) {
		console.error('(Error) getPlayerGameLog:', error);
		throw new Error('Failed to fetch player game log');
	}
}
