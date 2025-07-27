import { DashboardContent } from "@/components/dashboard-content";
import {
	fetchGamelogsByPlayerId,
	fetchPlayerById,
	// fetchPlayers
} from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PlayerCard from "@/components/player-card";

interface DashboardProps {
	params: Promise<{ league: string, playerId: string }>;
}

export default async function Dashboard({
	params
}: DashboardProps) {
	const { league, playerId } = await params;
	const parsedPlayerId = playerId ? parseInt(playerId) : 2544;
	const [
		gamelogs,
		player,
		// allPlayers
	] = await Promise.all([
		fetchGamelogsByPlayerId(parsedPlayerId, league),
		fetchPlayerById(parsedPlayerId, league),
		// fetchPlayers()
	]);


	if (!gamelogs || !player) {
		return (
			<main className="flex flex-col items-center justify-center mt-16 md:mt-28">
				<h1 className="text-2xl font-bold mb-4">Player Not Found</h1>
				<Button variant="default"><Link href="/">Go Back</Link></Button>
			</main>
		);
	}

	return (
		<main className="space-y-3">
			<PlayerCard player={player} />
			<DashboardContent gamelogs={gamelogs} />
		</main>
	);
}
