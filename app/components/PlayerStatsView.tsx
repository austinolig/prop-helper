import { PlayerData } from '../types/index';

interface PlayerStatsViewProps {
	playerData: PlayerData;
}

export default function PlayerStatsView({ playerData }: PlayerStatsViewProps) {
	return (
		<div className="w-full max-w-6xl">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-foreground mb-2">
					{playerData.playerName} - {playerData.season} Season
				</h2>
				<p className="text-sm text-foreground/70">
					{playerData.team} • {playerData.games.length} Games
				</p>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full border-collapse bg-white dark:bg-gray-900 rounded-lg shadow-sm">
					<thead>
						<tr className="bg-gray-50 dark:bg-gray-800">
							<th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-foreground">
								Date
							</th>
							<th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-foreground">
								Opponent
							</th>
							<th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-center text-sm font-semibold text-foreground">
								Points
							</th>
							<th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-center text-sm font-semibold text-foreground">
								Rebounds
							</th>
							<th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-center text-sm font-semibold text-foreground">
								Assists
							</th>
						</tr>
					</thead>
					<tbody>
						{playerData.games.map((game, index) => (
							<tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{new Date(game.date).toLocaleDateString()}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.location === 'home' ? 'vs ' : '@ '}{game.opponentTeam}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-center text-sm font-medium text-foreground">
									{game.points}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-center text-sm font-medium text-foreground">
									{game.rebounds}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-center text-sm font-medium text-foreground">
									{game.assists}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
