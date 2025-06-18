'use client';

import { useState } from 'react';
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
  } | null>(null);

  const handleCompare = (statType: StatType, threshold: number) => {
    const gamesOver = calculateGamesOverThreshold(mockPlayerSeason, statType, threshold);
    setComparisonResult({
      statType,
      threshold,
      gamesOver,
      totalGames: mockPlayerSeason.games.length
    });
  };

  const statSummary = comparisonResult ? getStatSummary(mockPlayerSeason, comparisonResult.statType) : null;

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
            <StatComparator onCompare={handleCompare} />
            
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
                      out of {comparisonResult.totalGames} total games
                    </div>
                  </div>
                  
                  {statSummary && (
                    <div className="text-xs text-foreground/70 space-y-1">
                      <div>Season Average: {statSummary.average}</div>
                      <div>Season High: {statSummary.max}</div>
                      <div>Season Low: {statSummary.min}</div>
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
