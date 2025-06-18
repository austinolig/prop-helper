import { PlayerSeason, StatType, GameStat } from '../types/index';

// Helper function to apply filters to games
function applyGameFilters(
  games: GameStat[],
  filters?: { lastNGames?: number; opponent?: string }
): GameStat[] {
  let filteredGames = [...games];

  // Apply opponent filter first
  if (filters?.opponent && filters.opponent !== '') {
    filteredGames = filteredGames.filter(
      game => game.opponentTeam === filters.opponent
    );
  }

  // Apply last N games filter
  if (filters?.lastNGames !== undefined && filters.lastNGames > 0) {
    filteredGames = filteredGames.slice(-filters.lastNGames);
  }

  return filteredGames;
}

export function calculateGamesOverThreshold(
  playerSeason: PlayerSeason,
  statType: StatType,
  threshold: number,
  filters?: { lastNGames?: number; opponent?: string }
): { gamesOver: number; totalFilteredGames: number } {
  const filteredGames = applyGameFilters(playerSeason.games, filters);

  const gamesOver = filteredGames.filter(game => {
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

  return { gamesOver, totalFilteredGames: filteredGames.length };
}

export function getStatSummary(
  playerSeason: PlayerSeason,
  statType: StatType,
  filters?: { lastNGames?: number; opponent?: string }
) {
  const filteredGames = applyGameFilters(playerSeason.games, filters);

  if (filteredGames.length === 0) {
    return {
      total: 0,
      average: 0,
      max: 0,
      min: 0,
      gamesPlayed: 0
    };
  }

  const values = filteredGames.map(game => {
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
