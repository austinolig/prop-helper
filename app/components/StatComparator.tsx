'use client';

import { useState } from 'react';
import { StatType } from '../types/index';

interface StatComparatorProps {
	onCompare: (
		statType: StatType,
		threshold: number,
		lastNGames?: number,
		opponent?: string
	) => void;
	availableOpponents: string[];
}

// TODO
// Rewrite

export default function StatComparator({ onCompare, availableOpponents }: StatComparatorProps) {
	const [selectedStat, setSelectedStat] = useState<StatType>('points');
	const [threshold, setThreshold] = useState<number>(25);
	const [lastNGames, setLastNGames] = useState<string>('');
	const [selectedOpponent, setSelectedOpponent] = useState<string>('');

	const handleCompare = () => {
		const parsedLastNGames = lastNGames ? parseInt(lastNGames) : undefined;
		const opponentFilter = selectedOpponent || undefined;

		onCompare(selectedStat, threshold, parsedLastNGames, opponentFilter);
	};

	const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value) && value >= 0) {
			setThreshold(value);
		}
	};

	const handleLastNGamesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === '' || (!isNaN(parseInt(value)) && parseInt(value) >= 0)) {
			setLastNGames(value);
		}
	};

	return (
		<div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
			<h3 className="text-lg font-semibold text-foreground mb-4">
				Stat Comparison Tool
			</h3>

			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-foreground mb-2">
						Select Statistic:
					</label>
					<div className="space-y-2">
						<label className="flex items-center">
							<input
								type="radio"
								name="statType"
								value="points"
								checked={selectedStat === 'points'}
								onChange={(e) => setSelectedStat(e.target.value as StatType)}
								className="mr-2"
							/>
							<span className="text-sm text-foreground">Points</span>
						</label>
						<label className="flex items-center">
							<input
								type="radio"
								name="statType"
								value="rebounds"
								checked={selectedStat === 'rebounds'}
								onChange={(e) => setSelectedStat(e.target.value as StatType)}
								className="mr-2"
							/>
							<span className="text-sm text-foreground">Rebounds</span>
						</label>
						<label className="flex items-center">
							<input
								type="radio"
								name="statType"
								value="assists"
								checked={selectedStat === 'assists'}
								onChange={(e) => setSelectedStat(e.target.value as StatType)}
								className="mr-2"
							/>
							<span className="text-sm text-foreground">Assists</span>
						</label>
					</div>
				</div>

				<div>
					<label htmlFor="threshold" className="block text-sm font-medium text-foreground mb-2">
						Threshold Value:
					</label>
					<input
						id="threshold"
						type="number"
						min="0"
						value={threshold}
						onChange={handleThresholdChange}
						className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-foreground bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div>
					<label htmlFor="lastNGames" className="block text-sm font-medium text-foreground mb-2">
						Last N Games (optional):
					</label>
					<input
						id="lastNGames"
						type="number"
						min="0"
						value={lastNGames}
						onChange={handleLastNGamesChange}
						placeholder="All games"
						className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-foreground bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div>
					<label htmlFor="opponent" className="block text-sm font-medium text-foreground mb-2">
						Opponent Filter:
					</label>
					<select
						id="opponent"
						value={selectedOpponent}
						onChange={(e) => setSelectedOpponent(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-foreground bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">All Opponents</option>
						{availableOpponents.map((opponent) => (
							<option key={opponent} value={opponent}>
								{opponent}
							</option>
						))}
					</select>
				</div>

				<button
					onClick={handleCompare}
					className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Calculate
				</button>
			</div>
		</div>
	);
}
