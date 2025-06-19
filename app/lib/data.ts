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
