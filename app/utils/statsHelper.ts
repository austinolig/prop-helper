import { PlayerSeason, StatType } from '../types/index';

export function calculateGamesOverThreshold(
  playerSeason: PlayerSeason,
  statType: StatType,
  threshold: number
): number {
  return playerSeason.games.filter(game => {
    switch (statType) {
      case 'points':
        return game.points > threshold;
      case 'rebounds':
        return game.rebounds > threshold;
      case 'assists':
        return game.assists > threshold;
      default:
        return false;
    }
  }).length;
}

export function getStatSummary(playerSeason: PlayerSeason, statType: StatType) {
  const values = playerSeason.games.map(game => {
    switch (statType) {
      case 'points':
        return game.points;
      case 'rebounds':
        return game.rebounds;
      case 'assists':
        return game.assists;
      default:
        return 0;
    }
  });

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
