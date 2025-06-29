'use client';

import { useState, useEffect } from 'react';
import { GameLog } from '../types';
import SortableTable from './SortableTable';

interface GameStatChartProps {
	gamelogs: GameLog[];
}

type StatType = 'pts' | 'reb' | 'ast' | 'stl' | 'blk' | 'fgm' | 'fg3m' | 'ftm' | 'tov' | 'pf';

const statLabels: Record<StatType, string> = {
	pts: 'Points',
	reb: 'Rebounds',
	ast: 'Assists',
	stl: 'Steals',
	blk: 'Blocks',
	fgm: 'Field Goals Made',
	fg3m: '3-Pointers Made',
	ftm: 'Free Throws Made',
	tov: 'Turnovers',
	pf: 'Personal Fouls'
};

const roundToNearestHalf = (value: number): number => {
	return Math.round(value * 2) / 2;
};

const calculateInitialThreshold = (gamelogs: GameLog[], stat: StatType): number => {
	if (gamelogs.length === 0) return 0;
	const sum = gamelogs.reduce((acc, game) => acc + game[stat], 0);
	const average = sum / gamelogs.length;
	return roundToNearestHalf(average);
};

export default function GameStatChart({ gamelogs }: GameStatChartProps) {
	const [selectedStat, setSelectedStat] = useState<StatType>('pts');
	const [threshold, setThreshold] = useState<number>(0);
	const [gameRange, setGameRange] = useState<number | 'all'>('all');
	const [homeAwayFilter, setHomeAwayFilter] = useState<'all' | 'home' | 'away'>('all');

	useEffect(() => {
		const initialThreshold = calculateInitialThreshold(gamelogs, selectedStat);
		setThreshold(initialThreshold);
	}, [gamelogs, selectedStat]);

	const homeAwayFilteredLogs = homeAwayFilter === 'all'
		? gamelogs
		: gamelogs.filter(game => {
			if (homeAwayFilter === 'home') {
				return game.matchup.includes(' vs. ');
			} else {
				return game.matchup.includes(' @ ');
			}
		});

	const finalFilteredLogs = gameRange === 'all'
		? homeAwayFilteredLogs
		: homeAwayFilteredLogs.slice(0, gameRange);

	const statValues = finalFilteredLogs.map(game => game[selectedStat]);
	const maxValue = Math.max(...statValues);
	const minValue = Math.min(...statValues);
	const avgValue = statValues.length > 0 ? statValues.reduce((sum, val) => sum + val, 0) / statValues.length : 0;
	const chartHeight = 200;
	const chartWidth = 800;
	const barWidth = chartWidth / finalFilteredLogs.length * 0.8;
	const barSpacing = chartWidth / finalFilteredLogs.length;

	const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === '') {
			setThreshold(0);
			return;
		}

		const numValue = parseFloat(value);
		if (!isNaN(numValue)) {
			const roundedValue = roundToNearestHalf(numValue);
			setThreshold(roundedValue);
		}
	};

	const getBarColor = (value: number): string => {
		if (value < threshold) return "rgb(239 68 68)";
		if (value > threshold) return "rgb(34 197 94)";
		return "rgb(107 114 128)";
	};

	return (
		<>
			{/* Filters Section */}
			<div className="bg-gray-900 tron-border rounded-t-lg shadow-2xl p-6">
				<div className="flex justify-between items-center flex-wrap gap-4">
					<h3 className="text-xl font-semibold text-white">Filters</h3>
					<div className="flex gap-4 items-center flex-wrap">
						<div className="flex items-center gap-2">
							<label htmlFor="range" className="text-sm text-gray-400">Games:</label>
							<select
								id="range"
								value={gameRange}
								onChange={(e) => setGameRange(e.target.value === 'all' ? 'all' : Number(e.target.value))}
								className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
							>
								<option value={5}>Last 5</option>
								<option value={10}>Last 10</option>
								<option value={20}>Last 20</option>
								<option value="all">All</option>
							</select>
						</div>
						<div className="flex items-center gap-2">
							<label htmlFor="homeaway" className="text-sm text-gray-400">Location:</label>
							<select
								id="homeaway"
								value={homeAwayFilter}
								onChange={(e) => setHomeAwayFilter(e.target.value as 'all' | 'home' | 'away')}
								className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
							>
								<option value="all">All</option>
								<option value="home">Home</option>
								<option value="away">Away</option>
							</select>
						</div>
						<div className="flex items-center gap-2">
							<label htmlFor="threshold" className="text-sm text-gray-400">Threshold:</label>
							<input
								id="threshold"
								type="number"
								value={threshold}
								onChange={handleThresholdChange}
								className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 w-20"
								min="0"
								step="0.5"
								placeholder="0"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Chart Section */}
			<div className="bg-gray-900 border-l border-r border-cyan-400 shadow-2xl p-6">
				<div className="flex justify-between items-center mb-4 flex-wrap gap-4">
					<h3 className="text-xl font-semibold text-white">Game Statistics Chart</h3>
					<div className="flex items-center gap-2">
						<label htmlFor="stat-select" className="text-sm text-gray-400">Stat:</label>
						<select
							id="stat-select"
							value={selectedStat}
							onChange={(e) => setSelectedStat(e.target.value as StatType)}
							className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
						>
							{Object.entries(statLabels).map(([value, label]) => (
								<option key={value} value={value}>{label}</option>
							))}
						</select>
					</div>
				</div>

				<div className="w-full">
					<svg width="100%" height={chartHeight + 40} viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`} className="w-full">
						{/* Y-axis labels */}
						{[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
							const y = chartHeight - (ratio * chartHeight);
							const value = Math.round(maxValue * ratio);
							return (
								<g key={index}>
									<line
										x1={0}
										y1={y}
										x2={chartWidth}
										y2={y}
										stroke="rgb(55 65 81)"
										strokeWidth={0.5}
									/>
									<text
										x={-5}
										y={y + 3}
										fill="rgb(156 163 175)"
										fontSize="10"
										textAnchor="end"
									>
										{value}
									</text>
								</g>
							);
						})}

						{/* Threshold line */}
						{threshold > 0 && (
							<line
								x1={0}
								y1={chartHeight - (threshold / maxValue) * chartHeight}
								x2={chartWidth}
								y2={chartHeight - (threshold / maxValue) * chartHeight}
								stroke="rgb(239 68 68)"
								strokeWidth={2}
								strokeDasharray="5,5"
							/>
						)}

						{/* Bars */}
						{finalFilteredLogs.map((game, index) => {
							const value = game[selectedStat];
							const barHeight = (value / maxValue) * chartHeight;
							const x = index * barSpacing + (barSpacing - barWidth) / 2;
							const y = chartHeight - barHeight;

							return (
								<g key={game.gameId}>
									<rect
										x={x}
										y={y}
										width={barWidth}
										height={barHeight}
										fill={getBarColor(value)}
										className="hover:opacity-80 transition-opacity"
									/>
									<text
										x={x + barWidth / 2}
										y={y - 3}
										fill="rgb(229 231 235)"
										fontSize="10"
										textAnchor="middle"
										className="pointer-events-none"
									>
										{value}
									</text>
									<text
										x={x + barWidth / 2}
										y={chartHeight + 15}
										fill="rgb(156 163 175)"
										fontSize="8"
										textAnchor="middle"
										className="pointer-events-none"
									>
										{index % 7 === 0 ? new Date(game.gameDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
									</text>
								</g>
							);
						})}
					</svg>
				</div>

				<div className="mt-4 text-sm text-gray-400">
					Showing {statLabels[selectedStat]} for last {finalFilteredLogs.length} games
					{homeAwayFilter !== 'all' && ` (${homeAwayFilter} only)`}
					{' • '}
					<span className="text-white">Avg: {avgValue.toFixed(1)}</span>
					{' • '}
					<span className="text-green-400">High: {maxValue}</span>
					{' • '}
					<span className="text-red-400">Low: {minValue}</span>
					{threshold > 0 && (
						<>
							{' • '}
							<span className="text-green-400">
								{finalFilteredLogs.filter(game => game[selectedStat] > threshold).length} above
							</span>
							{', '}
							<span className="text-gray-300">
								{finalFilteredLogs.filter(game => game[selectedStat] === threshold).length} equal
							</span>
							{', '}
							<span className="text-red-400">
								{finalFilteredLogs.filter(game => game[selectedStat] < threshold).length} below threshold
							</span>
						</>
					)}
				</div>
			</div>

			{/* Gamelogs Section */}
			<div className="bg-gray-900 tron-border rounded-b-lg shadow-2xl p-6">
				<h3 className="text-xl font-semibold mb-4 text-white">Game Logs</h3>
				<SortableTable gamelogs={finalFilteredLogs} />
			</div>
		</>
	);
}
