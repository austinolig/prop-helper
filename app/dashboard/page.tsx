import { fetchPlayerById, fetchGamelogsByPlayerId, fetchPlayers } from '../lib/data';
import { GameLog } from '../types';
import GameStatChart from '../components/GameStatChart';
import PlayerSearchDropdown from '../components/PlayerSearchDropdown';
import Link from 'next/link';

function calculateStats(gamelogs: GameLog[]) {
	if (gamelogs.length === 0) return null;

	const totals = gamelogs.reduce((acc, game) => ({
		pts: acc.pts + game.pts,
		reb: acc.reb + game.reb,
		ast: acc.ast + game.ast,
		stl: acc.stl + game.stl,
		blk: acc.blk + game.blk,
		fgm: acc.fgm + game.fgm,
		fga: acc.fga + game.fga,
		fg3m: acc.fg3m + game.fg3m,
		fg3a: acc.fg3a + game.fg3a,
		games: acc.games + 1
	}), { pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, fgm: 0, fga: 0, fg3m: 0, fg3a: 0, games: 0 });

	const ptsValues = gamelogs.map(g => g.pts);
	const rebValues = gamelogs.map(g => g.reb);
	const astValues = gamelogs.map(g => g.ast);
	const stlValues = gamelogs.map(g => g.stl);
	const blkValues = gamelogs.map(g => g.blk);

	return {
		avgPts: (totals.pts / totals.games).toFixed(1),
		avgReb: (totals.reb / totals.games).toFixed(1),
		avgAst: (totals.ast / totals.games).toFixed(1),
		avgStl: (totals.stl / totals.games).toFixed(1),
		avgBlk: (totals.blk / totals.games).toFixed(1),
		fgPct: ((totals.fgm / totals.fga) * 100).toFixed(1),
		fg3Pct: ((totals.fg3m / totals.fg3a) * 100).toFixed(1),
		highPts: Math.max(...ptsValues),
		lowPts: Math.min(...ptsValues),
		highReb: Math.max(...rebValues),
		lowReb: Math.min(...rebValues),
		highAst: Math.max(...astValues),
		lowAst: Math.min(...astValues),
		highStl: Math.max(...stlValues),
		lowStl: Math.min(...stlValues),
		highBlk: Math.max(...blkValues),
		lowBlk: Math.min(...blkValues),
		gamesPlayed: totals.games
	};
}

export default async function Dashboard({
	searchParams
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const { playerId } = await searchParams;
	const parsedPlayerId = playerId ? parseInt(playerId as string, 10) : 2544;

	try {
		const [player, gamelogs, allPlayers] = await Promise.all([
			fetchPlayerById(parsedPlayerId),
			fetchGamelogsByPlayerId(parsedPlayerId),
			fetchPlayers()
		]);

		if (!player) {
			return (
				<div className="p-8 min-h-screen bg-black text-white">
					<h1 className="text-2xl font-bold mb-4 text-cyan-400">Dashboard</h1>
					<p className="text-red-400">Player {playerId} not found</p>
				</div>
			);
		}

		const stats = calculateStats(gamelogs);

		return (
			<div className="p-8 max-w-6xl mx-auto min-h-screen bg-black text-white">
				{/* Header */}
				<div className="relative flex justify-between items-center mb-8">
					<Link href="/">
						<h1 className="text-3xl py-2 font-bold text-white">
							Prop<span className="text-cyan-400">Helper</span>
						</h1>
					</Link>
					<PlayerSearchDropdown players={allPlayers} currentPlayerId={parsedPlayerId} />
				</div>
				
				{/* Player Info Section */}
				<div className="bg-gray-900 tron-border rounded-lg shadow-2xl p-6 mb-8">
					<div className="flex items-start gap-6">
						{/* Player Image and Info */}
						<div className="flex items-start gap-4">
							<div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center">
								<span className="text-gray-400 text-xs">Player Image</span>
							</div>
							<div className="flex flex-col">
								<h2 className="text-2xl font-semibold text-white">{player.full_name}</h2>
								<div className="text-sm text-gray-400 mt-1">Player ID: <span className="text-white">{player.id}</span></div>
								<div className="text-sm text-gray-400">Status: <span className={player.is_active ? 'text-green-400' : 'text-red-400'}>{player.is_active ? 'Active' : 'Inactive'}</span></div>
							</div>
						</div>
						
						{/* Season Stats - Single Row */}
						{stats && (
							<div className="flex-1 ml-6">
								<h3 className="text-lg font-semibold mb-3 text-white">Season Averages ({stats.gamesPlayed} games)</h3>
								<div className="flex gap-6 items-center">
									<div className="text-center">
										<div className="text-xl font-bold text-cyan-400">{stats.avgPts}</div>
										<div className="text-xs text-gray-400">PPG</div>
									</div>
									<div className="text-center">
										<div className="text-xl font-bold text-green-400">{stats.avgReb}</div>
										<div className="text-xs text-gray-400">RPG</div>
									</div>
									<div className="text-center">
										<div className="text-xl font-bold text-orange-400">{stats.avgAst}</div>
										<div className="text-xs text-gray-400">APG</div>
									</div>
									<div className="text-center">
										<div className="text-xl font-bold text-purple-400">{stats.avgStl}</div>
										<div className="text-xs text-gray-400">SPG</div>
									</div>
									<div className="text-center">
										<div className="text-xl font-bold text-pink-400">{stats.avgBlk}</div>
										<div className="text-xs text-gray-400">BPG</div>
									</div>
									<div className="text-center">
										<div className="text-xl font-bold text-yellow-400">{stats.fgPct}%</div>
										<div className="text-xs text-gray-400">FG%</div>
									</div>
									<div className="text-center">
										<div className="text-xl font-bold text-blue-400">{stats.fg3Pct}%</div>
										<div className="text-xs text-gray-400">3P%</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				
				<GameStatChart gamelogs={gamelogs} />
			</div>
		);
	} catch (error) {
		return (
			<div className="p-8 min-h-screen bg-black text-white">
				<h1 className="text-2xl font-bold mb-4 text-cyan-400">Dashboard</h1>
				<p className="text-red-400">Error loading player data: {error instanceof Error ? error.message : 'Unknown error'}</p>
			</div>
		);
	}
}
