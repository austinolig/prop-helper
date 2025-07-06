import {
	fetchPlayerById,
	fetchGamelogsByPlayerId,
	fetchPlayers
} from '../lib/data';
import { GameLog } from '../types';
import GameStatChart from '../components/GameStatChart';
import PlayerCombobox from '@/components/PlayerCombobox';

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
	const fgPctValues = gamelogs.filter(g => g.fga > 0).map(g => (g.fgm / g.fga) * 100);
	const fg3PctValues = gamelogs.filter(g => g.fg3a > 0).map(g => (g.fg3m / g.fg3a) * 100);

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
		highFgPct: fgPctValues.length > 0 ? Math.max(...fgPctValues).toFixed(1) : '0.0',
		lowFgPct: fgPctValues.length > 0 ? Math.min(...fgPctValues).toFixed(1) : '0.0',
		highFg3Pct: fg3PctValues.length > 0 ? Math.max(...fg3PctValues).toFixed(1) : '0.0',
		lowFg3Pct: fg3PctValues.length > 0 ? Math.min(...fg3PctValues).toFixed(1) : '0.0',
		gamesPlayed: totals.games
	};
}

export default async function Dashboard({
	searchParams
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const playerIdParam = (await searchParams).playerId;
	const playerId = Array.isArray(playerIdParam) ? playerIdParam[0] : playerIdParam;

	try {
		const parsedPlayerId = playerId ? parseInt(playerId) : 2544;
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
			<main className='space-y-8'>
				<div className="flex flex-wrap gap-8 bg-white/5 p-4 rounded-lg">
					<div className='flex gap-4'>
						<div className="w-24 h-24 bg-gray-700 rounded-full"></div>
						<div className='ml-4'>
							<PlayerCombobox
								players={allPlayers}
								currentPlayerId={playerId}
							/>
							<div className='mt-2'>
								<p className='text-sm'>
									<span className='text-gray-500'>Team:</span>{" "}
									XX
								</p>
								<p className='text-sm'>
									<span className='text-gray-500'>Position:</span>{" "}
									XX
								</p>
								<p className='text-sm'>
									<span className='text-gray-500'>Draft Year:</span>{" "}
									XX
								</p>
							</div>
						</div>
					</div>
					{stats && (
						<div className="flex-1 min-w-[250px]">
							<h3 className="mb-3">Season Stats ({stats.gamesPlayed} games)</h3>
							<div className="flex justify-around w-full gap-4 flex-wrap text-center text-xs text-gray-500">
								<div>
									<div>PPG</div>
									<div className="text-xl font-medium text-cyan-500">{stats.avgPts}</div>
									<div>H:{stats.highPts} / L:{stats.lowPts}</div>
								</div>
								<div>
									<div>RPG</div>
									<div className="text-xl font-medium text-green-500">{stats.avgReb}</div>
									<div>H:{stats.highReb} / L:{stats.lowReb}</div>
								</div>
								<div>
									<div>APG</div>
									<div className="text-xl font-medium text-orange-500">{stats.avgAst}</div>
									<div>H:{stats.highAst} / L:{stats.lowAst}</div>
								</div>
								<div>
									<div>SPG</div>
									<div className="text-xl font-medium text-purple-500">{stats.avgStl}</div>
									<div>H:{stats.highStl} / L:{stats.lowStl}</div>
								</div>
								<div>
									<div>BPG</div>
									<div className="text-xl font-medium text-pink-500">{stats.avgBlk}</div>
									<div>H:{stats.highBlk} / L:{stats.lowBlk}</div>
								</div>
								<div>
									<div>FG%</div>
									<div className="text-xl font-medium text-yellow-500">{stats.fgPct}%</div>
									<div>H:{stats.highFgPct}% / L:{stats.lowFgPct}%</div>
								</div>
								<div>
									<div>3P%</div>
									<div className="text-xl font-medium text-blue-500">{stats.fg3Pct}%</div>
									<div>H:{stats.highFg3Pct}% / L:{stats.lowFg3Pct}%</div>
								</div>
							</div>
						</div>
					)}
				</div>
				<GameStatChart gamelogs={gamelogs} />
			</main>
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
