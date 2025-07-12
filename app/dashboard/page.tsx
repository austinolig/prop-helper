import { GamelogTable } from "@/components/gamelog-table";
import { columns } from "@/components/gamelog-table/columns";
import { StatChart } from "@/components/stat-chart";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { StickyFilters } from "@/components/sticky-filters";
import {
	fetchGamelogsByPlayerId,
	fetchPlayerById,
	// fetchPlayers
} from "../lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DashboardProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Dashboard({
	searchParams
}: DashboardProps) {
	const playerIdParam = (await searchParams).playerId;
	const playerId = Array.isArray(playerIdParam) ? playerIdParam[0] : playerIdParam;
	const parsedPlayerId = playerId ? parseInt(playerId) : 2544;
	const [
		gamelogs,
		player,
		// allPlayers
	] = await Promise.all([
		fetchGamelogsByPlayerId(parsedPlayerId),
		fetchPlayerById(parsedPlayerId),
		// fetchPlayers()
	]);


	if (!gamelogs || !player) {
		return (
			<main className="flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold mb-4">Player Not Found</h1>
				<Button variant="default"><Link href="/dashboard">Go Back</Link></Button>
			</main>
		);
	}

	return (
		<main>
			<StickyFilters />
			<section className="flex justify-between items-center gap-4 overflow-x-auto">
				<Card className="w-full">
					<CardHeader className="pb-6 border-b border-secondary flex items-center gap-4">
						<div className="w-[50px] h-[50px] rounded-full bg-secondary shrink-0"></div>
						<div className="flex flex-col gap-1.5">
							<CardTitle>{player?.full_name}</CardTitle>
							<CardDescription>Los Angeles Lakers</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="grid grid-flow-col auto-cols-[1fr] gap-6 justify-between overflow-x-auto">
						<div className="min-w-max">
							<p className="font-medium">25 <span className="text-sm">POINTS</span></p>
							<p className="text-sm text-muted-foreground">H: 37/L: 10</p>
						</div>
						<div className="min-w-max">
							<p className="font-medium">10 <span className="text-sm">REBOUNDS</span></p>
							<p className="text-sm text-muted-foreground">H: 21/L: 3</p>
						</div>
						<div className="min-w-max">
							<p className="font-medium">10 <span className="text-sm">ASSISTS</span></p>
							<p className="text-sm text-muted-foreground">H: 18/L: 2</p>
						</div>
						<div className="min-w-max">
							<p className="font-medium">5 <span className="text-sm">BLOCKS</span></p>
							<p className="text-sm text-muted-foreground">H: 11/L: 0</p>
						</div>
						<div className="min-w-max">
							<p className="font-medium">3 <span className="text-sm">STEALS</span></p>
							<p className="text-sm text-muted-foreground">H: 6/L: 0</p>
						</div>
					</CardContent>
				</Card>
			</section>
			<section>
				<StatChart data={gamelogs} />
			</section>
			<section>
				<GamelogTable columns={columns} data={gamelogs} />
			</section>
		</main>
	);
}
