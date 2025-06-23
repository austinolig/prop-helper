import { mockPlayerData } from '../data/mockPlayerData';
import { PlayerData } from '../types/index';

export async function getMockPlayerData(): Promise<PlayerData> {
	// Simulate API fetch call with realistic delay
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// Simulate occasional network failures (5% chance)
			if (Math.random() < 0.05) {
				reject(new Error('Failed to fetch player data from API'));
				return;
			}

			// Simulate successful API response
			resolve(mockPlayerData);
		}, 100 + Math.random() * 500); // Random delay between 0.1-0.5 seconds
	});
}

interface PlayerGameLogResponse {
	playerId: number;
	q: string | null;
}

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
		return data;
	} catch (error) {
		console.error('(Error) getPlayerGameLog:', error);
		throw new Error('Failed to fetch player game log');
	}
}
