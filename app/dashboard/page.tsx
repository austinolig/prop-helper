import {
	fetchPlayerById,
	fetchGamelogsByPlayerId,
	fetchPlayers
} from '../lib/data';
import GameStatChart from '../components/GameStatChart';
import PlayerSummary from '@/components/player-summary';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PlayerGameLog from '@/components/player-gamelog';

interface DashboardProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Dashboard({
	searchParams
}: DashboardProps) {
	const playerIdParam = (await searchParams).playerId;
	const playerId = Array.isArray(playerIdParam) ? playerIdParam[0] : playerIdParam;
	const parsedPlayerId = playerId ? parseInt(playerId) : 2544;
	const [player, gamelogs, allPlayers] = await Promise.all([
		fetchPlayerById(parsedPlayerId),
		fetchGamelogsByPlayerId(parsedPlayerId),
		fetchPlayers()
	]);

	if (!player) {
		return (
			<main>
				<p className="text-red-500">Player not found.</p>
				<Button asChild>
					<Link href="/dashboard">Go Back</Link>
				</Button>
			</main>
		);
	}

	return (
		<main>
			<PlayerSummary
				gamelogs={gamelogs}
				allPlayers={allPlayers}
				playerId={playerId}
			/>
			<PlayerGameLog
				gamelogs={gamelogs}
			/>
			<GameStatChart
				gamelogs={gamelogs}
			/>
		</main>
	);
}
