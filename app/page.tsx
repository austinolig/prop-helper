'use client';

import { useState, useMemo } from 'react';
import PlayerStatsView from './components/PlayerStatsView';
import StatComparator from './components/StatComparator';
import { mockPlayerSeason } from './data/mockPlayerData';
import { StatType } from './types/index';
import { calculateGamesOverThreshold, getStatSummary } from './utils/statsHelper';

export default function Home() {
  const [comparisonResult, setComparisonResult] = useState<{
    statType: StatType;
    threshold: number;
    gamesOver: number;
    totalGames: number;
    lastNGames?: number;
    opponent?: string;
  } | null>(null);

  // Get unique opponents from the player's games
  const availableOpponents = useMemo(() => {
    const opponents = new Set(mockPlayerSeason.games.map(game => game.opponentTeam));
    return Array.from(opponents).sort();
  }, []);

  const handleCompare = (
    statType: StatType, 
    threshold: number, 
    lastNGames?: number, 
    opponent?: string
  ) => {
    const filters = { lastNGames, opponent };
    const result = calculateGamesOverThreshold(mockPlayerSeason, statType, threshold, filters);
    
    setComparisonResult({
      statType,
      threshold,
      gamesOver: result.gamesOver,
      totalGames: result.totalFilteredGames,
      lastNGames,
      opponent
    });
  };

  const statSummary = comparisonResult 
    ? getStatSummary(
        mockPlayerSeason, 
        comparisonResult.statType, 
        { 
          lastNGames: comparisonResult.lastNGames, 
          opponent: comparisonResult.opponent 
        }
      ) 
    : null;

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            NBA Player Stat Analyzer
          </h1>
          <p className="text-foreground/70">
            Analyze player performance and compare statistics against custom thresholds
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <StatComparator 
              onCompare={handleCompare} 
              availableOpponents={availableOpponents}
            />
            
            {comparisonResult && (
              <div className="mt-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Comparison Result
                </h3>
                <div className="space-y-3">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {comparisonResult.gamesOver}
                    </div>
                    <div className="text-sm text-foreground/70">
                      games with {comparisonResult.statType} &gt; {comparisonResult.threshold}
                    </div>
                    <div className="text-xs text-foreground/50 mt-1">
                      out of {comparisonResult.totalGames} filtered games
                    </div>
                  </div>
                  
                  {(comparisonResult.lastNGames || comparisonResult.opponent) && (
                    <div className="text-xs text-foreground/60 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                      <div className="font-medium mb-1">Active Filters:</div>
                      {comparisonResult.lastNGames && (
                        <div>• Last {comparisonResult.lastNGames} games</div>
                      )}
                      {comparisonResult.opponent && (
                        <div>• Opponent: {comparisonResult.opponent}</div>
                      )}
                    </div>
                  )}
                  
                  {statSummary && (
                    <div className="text-xs text-foreground/70 space-y-1">
                      <div>Filtered Average: {statSummary.average}</div>
                      <div>Filtered High: {statSummary.max}</div>
                      <div>Filtered Low: {statSummary.min}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <PlayerStatsView playerSeason={mockPlayerSeason} />
          </div>
        </div>
      </div>
    </div>
  );
}
