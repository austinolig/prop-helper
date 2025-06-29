import { fetchPlayerById, fetchGamelogsByPlayerId } from '../lib/data';
import { GameLog } from '../types';
import GameStatChart from '../components/GameStatChart';
import SortableTable from '../components/SortableTable';

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

export default async function Dashboard() {
	const playerId = 2544;

	try {
		const [player, gamelogs] = await Promise.all([
			fetchPlayerById(playerId),
			fetchGamelogsByPlayerId(playerId)
		]);

		if (!player) {
		return (
			<div className="p-8 min-h-screen bg-black text-white">
				<h1 className="text-2xl font-bold mb-4 text-cyan-400">Dashboard</h1>
				<p className="text-red-400">Player {playerId} not found</p>
			</div>
		);		}

		const stats = calculateStats(gamelogs);
		const allGames = gamelogs;

		return (
			<div className="p-8 max-w-6xl mx-auto min-h-screen bg-black text-white">
				<h1 className="text-3xl font-bold mb-8 text-cyan-400">Player Dashboard</h1>

				<div className="bg-gray-900 tron-border rounded-none shadow-2xl p-6 mb-8">
					<h2 className="text-2xl font-semibold mb-4 text-white">{player.full_name}</h2>
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div><span className="font-medium text-gray-400">Player ID:</span> <span className="text-white">{player.id}</span></div>
						<div><span className="font-medium text-gray-400">Status:</span> <span className={player.is_active ? 'text-green-400' : 'text-red-400'}>{player.is_active ? 'Active' : 'Inactive'}</span></div>
					</div>
				</div>

			{stats && (
				<div className="bg-gray-900 tron-border rounded-none shadow-2xl p-6 mb-8">
					<h3 className="text-xl font-semibold mb-4 text-white">Season Averages ({stats.gamesPlayed} games)</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="text-center">
							<div className="text-2xl font-bold text-cyan-400">{stats.avgPts}</div>
							<div className="text-sm text-gray-400">PPG</div>
							<div className="text-xs text-gray-500 mt-1">H: {stats.highPts} / L: {stats.lowPts}</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-green-400">{stats.avgReb}</div>
							<div className="text-sm text-gray-400">RPG</div>
							<div className="text-xs text-gray-500 mt-1">H: {stats.highReb} / L: {stats.lowReb}</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-orange-400">{stats.avgAst}</div>
							<div className="text-sm text-gray-400">APG</div>
							<div className="text-xs text-gray-500 mt-1">H: {stats.highAst} / L: {stats.lowAst}</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-yellow-400">{stats.fgPct}%</div>
							<div className="text-sm text-gray-400">FG%</div>
						</div>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
						<div className="text-center">
							<div className="text-xl font-bold text-purple-400">{stats.avgStl}</div>
							<div className="text-sm text-gray-400">SPG</div>
							<div className="text-xs text-gray-500 mt-1">H: {stats.highStl} / L: {stats.lowStl}</div>
						</div>
						<div className="text-center">
							<div className="text-xl font-bold text-pink-400">{stats.avgBlk}</div>
							<div className="text-sm text-gray-400">BPG</div>
							<div className="text-xs text-gray-500 mt-1">H: {stats.highBlk} / L: {stats.lowBlk}</div>
						</div>
						<div className="text-center">
							<div className="text-xl font-bold text-blue-400">{stats.fg3Pct}%</div>
							<div className="text-sm text-gray-400">3P%</div>
						</div>
					</div>
				</div>
			)}
			
			<GameStatChart gamelogs={gamelogs} />
			
			<SortableTable gamelogs={allGames} />
		</div>
		);
	} catch (error) {
	return (
		<div className="p-8 min-h-screen bg-black text-white">
			<h1 className="text-2xl font-bold mb-4 text-cyan-400">Dashboard</h1>
			<p className="text-red-400">Error loading player data: {error instanceof Error ? error.message : 'Unknown error'}</p>
		</div>
	);	}
}