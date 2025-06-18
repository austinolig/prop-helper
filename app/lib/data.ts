import { mockPlayerSeason } from '../data/mockPlayerData';
import { PlayerSeason } from '../types/index';

export async function getMockPlayerData(): Promise<PlayerSeason> {
  // Simulate API fetch call with realistic delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate occasional network failures (5% chance)
      if (Math.random() < 0.05) {
        reject(new Error('Failed to fetch player data from API'));
        return;
      }
      
      // Simulate successful API response
      resolve(mockPlayerSeason);
    }, 1000 + Math.random() * 500); // Random delay between 1-1.5 seconds
  });
}
