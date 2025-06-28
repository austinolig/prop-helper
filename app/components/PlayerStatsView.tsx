import { PlayerGameLog } from '../types/index';

export default function PlayerStatsView({
	playerGameLog
}: {
	playerGameLog: PlayerGameLog[]
}) {
	return (
		<div className="w-full max-w-6xl">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-foreground mb-2">
					{/* {playerData.playerName} - {playerData.season} Season */}
				</h2>
				<p className="text-sm text-foreground/70">
					{/* {playerData.team} • {playerData.games.length} Games */}
				</p>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full border-collapse bg-white dark:bg-gray-900 rounded-lg shadow-sm">
					{/* <thead> */}
					{/* 	<tr className="bg-gray-50 dark:bg-gray-800"> */}
					{/* 		{playerGameLog.headers.map((header, index) => ( */}
					{/* 			<th key={index} className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-foreground"> */}
					{/* 				{header} */}
					{/* 			</th> */}
					{/* 		))} */}
					{/* 	</tr> */}
					{/* </thead> */}
					<tbody>
						{playerGameLog.map((game) => (
							<tr key={game.gameId} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.seasonId}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.playerId}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.gameId}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.gameDate}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.matchup}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.wl}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.min}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.fgm}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.fga}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.fgPct}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.fg3m}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.fg3a}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.fg3Pct}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.ftm}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.fta}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.ftPct}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.oreb}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.dreb}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.reb}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.ast}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.stl}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.blk}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.tov}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.pf}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.pts}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.plusMinus}
								</td>
								<td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-foreground">
									{game.videoAvailable ? 'Yes' : 'No'}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div >
	);
}
