'use client';

import { useState } from 'react';
import { GameLog } from '../types';

interface SortableTableProps {
	gamelogs: GameLog[];
}

type SortKey = 'gameDate' | 'matchup' | 'wl' | 'pts' | 'reb' | 'ast' | 'fgPct' | 'fg3Pct';
type SortDirection = 'asc' | 'desc';

export default function SortableTable({ gamelogs }: SortableTableProps) {
	const [sortKey, setSortKey] = useState<SortKey>('gameDate');
	const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

	const handleSort = (key: SortKey) => {
		if (sortKey === key) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortKey(key);
			setSortDirection('desc');
		}
	};

	const sortedGames = [...gamelogs].sort((a, b) => {
		let aValue: string | number | Date = a[sortKey];
		let bValue: string | number | Date = b[sortKey];

		if (sortKey === 'gameDate') {
			aValue = new Date(aValue as string);
			bValue = new Date(bValue as string);
		} else if (sortKey === 'wl') {
			aValue = (aValue as 'W' | 'L') === 'W' ? 1 : 0;
			bValue = (bValue as 'W' | 'L') === 'W' ? 1 : 0;
		} else if (sortKey === 'fgPct' || sortKey === 'fg3Pct') {
			aValue = Number(aValue);
			bValue = Number(bValue);
		}

		if (aValue < bValue) {
			return sortDirection === 'asc' ? -1 : 1;
		}
		if (aValue > bValue) {
			return sortDirection === 'asc' ? 1 : -1;
		}
		return 0;
	});

	const getSortIcon = (key: SortKey) => {
		if (sortKey !== key) {
			return '';
		}
		return sortDirection === 'asc' ? '↑' : '↓';
	};

	return (
		<div>
			<h3 className="text-xl font-semibold mb-4 text-white">Gamelog ({gamelogs.length})</h3>
			<div className="overflow-x-auto">
				<table className="min-w-full table-auto">
					<thead>
						<tr className="border-b border-gray-700">
							<th
								className="text-left p-2 text-gray-400 cursor-pointer hover:text-cyan-400 select-none transition-colors"
								onClick={() => handleSort('gameDate')}
							>
								Date {getSortIcon('gameDate')}
							</th>
							<th
								className="text-left p-2 text-gray-400 cursor-pointer hover:text-cyan-400 select-none transition-colors"
								onClick={() => handleSort('matchup')}
							>
								Matchup {getSortIcon('matchup')}
							</th>
							<th
								className="text-left p-2 text-gray-400 cursor-pointer hover:text-cyan-400 select-none transition-colors"
								onClick={() => handleSort('wl')}
							>
								W/L {getSortIcon('wl')}
							</th>
							<th
								className="text-left p-2 text-gray-400 cursor-pointer hover:text-cyan-400 select-none transition-colors"
								onClick={() => handleSort('pts')}
							>
								PTS {getSortIcon('pts')}
							</th>
							<th
								className="text-left p-2 text-gray-400 cursor-pointer hover:text-cyan-400 select-none transition-colors"
								onClick={() => handleSort('reb')}
							>
								REB {getSortIcon('reb')}
							</th>
							<th
								className="text-left p-2 text-gray-400 cursor-pointer hover:text-cyan-400 select-none transition-colors"
								onClick={() => handleSort('ast')}
							>
								AST {getSortIcon('ast')}
							</th>
							<th
								className="text-left p-2 text-gray-400 cursor-pointer hover:text-cyan-400 select-none transition-colors"
								onClick={() => handleSort('fgPct')}
							>
								FG% {getSortIcon('fgPct')}
							</th>
							<th
								className="text-left p-2 text-gray-400 cursor-pointer hover:text-cyan-400 select-none transition-colors"
								onClick={() => handleSort('fg3Pct')}
							>
								3P% {getSortIcon('fg3Pct')}
							</th>
						</tr>
					</thead>
					<tbody>
<<<<<<< HEAD
						{sortedGames.map((game) => (
=======
						{sortedGames.map((game, index) => (
>>>>>>> 982c1304d6de838587897d7103d1153deb0b31ff
							<tr key={game.gameId}>
								<td className="p-2 text-gray-300">{game.gameDate}</td>
								<td className="p-2 text-gray-300">{game.matchup}</td>
								<td className="p-2">
									<span className={`font-medium ${game.wl === 'W' ? 'text-green-400' : 'text-red-400'}`}>
										{game.wl}
									</span>
								</td>
								<td className="p-2 font-medium text-white">{game.pts}</td>
								<td className="p-2 text-gray-300">{game.reb}</td>
								<td className="p-2 text-gray-300">{game.ast}</td>
								<td className="p-2 text-gray-300">{(game.fgPct * 100).toFixed(1)}%</td>
								<td className="p-2 text-gray-300">{game.fg3Pct ? (game.fg3Pct * 100).toFixed(1) : '0.0'}%</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
