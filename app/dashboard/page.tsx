"use client";

"use client";

import { FilterCombobox } from "@/components/filter-combobox";
import { GamelogTable } from "@/components/gamelog-table";
import { columns } from "@/components/gamelog-table/columns";
import { StatChart } from "@/components/stat-chart";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { Pin, PinOff } from "lucide-react";
import { useState } from "react";
import { GameLog } from "@/app/types";

const data: GameLog[] = [
	{
		seasonId: "2023-24",
		playerId: 2544,
		gameId: "0022301234",
		gameDate: "2024-01-15",
		matchup: "LAL vs GSW",
		wl: "W",
		min: 38,
		fgm: 12,
		fga: 20,
		fgPct: 0.600,
		fg3m: 3,
		fg3a: 7,
		fg3Pct: 0.429,
		ftm: 8,
		fta: 10,
		ftPct: 0.800,
		oreb: 2,
		dreb: 8,
		reb: 10,
		ast: 12,
		stl: 2,
		blk: 1,
		tov: 4,
		pf: 3,
		pts: 35,
		plusMinus: 15,
		videoAvailable: 1,
	},
	{
		seasonId: "2023-24",
		playerId: 2544,
		gameId: "0022301235",
		gameDate: "2024-01-17",
		matchup: "LAL @ BOS",
		wl: "L",
		min: 42,
		fgm: 8,
		fga: 18,
		fgPct: 0.444,
		fg3m: 2,
		fg3a: 6,
		fg3Pct: 0.333,
		ftm: 6,
		fta: 8,
		ftPct: 0.750,
		oreb: 1,
		dreb: 7,
		reb: 8,
		ast: 8,
		stl: 1,
		blk: 2,
		tov: 5,
		pf: 2,
		pts: 24,
		plusMinus: -8,
		videoAvailable: 1,
	},
	{
		seasonId: "2023-24",
		playerId: 2544,
		gameId: "0022301236",
		gameDate: "2024-01-19",
		matchup: "LAL vs MIA",
		wl: "W",
		min: 36,
		fgm: 10,
		fga: 16,
		fgPct: 0.625,
		fg3m: 4,
		fg3a: 8,
		fg3Pct: 0.500,
		ftm: 4,
		fta: 5,
		ftPct: 0.800,
		oreb: 0,
		dreb: 9,
		reb: 9,
		ast: 6,
		stl: 3,
		blk: 0,
		tov: 2,
		pf: 1,
		pts: 28,
		plusMinus: 12,
		videoAvailable: 1,
	},
]

export default function Dashboard() {
	const [sticky, setSticky] = useState(false);

	return (
		<main>
			<section className={sticky ? "sticky top-4 z-10" : ""}>
				<Card className="w-full relative">
					<CardHeader className="pb-6 border-b border-secondary">
						<CardTitle>Filters</CardTitle>
						<CardDescription>0 filters selected</CardDescription>
						<Button
							onClick={() => setSticky(!sticky)}
							variant="ghost"
							size="icon"
							className={cn(
								"absolute top-4 right-4 text-muted-foreground hover:text-foreground",
								sticky ? "text-primary hover:text-primary" : ""
							)}
						>
							<span className="sr-only">Toggle Sticky Filters</span>
							{sticky ? <Pin /> : <PinOff />}
						</Button>
					</CardHeader>
					<CardContent className="flex gap-4 justify-between overflow-x-auto">
						<FilterCombobox />
						<FilterCombobox />
						<FilterCombobox />
						<FilterCombobox />
						<FilterCombobox />
					</CardContent>
				</Card>
			</section>
			<section className="flex justify-between items-center gap-4 overflow-x-auto">
				<Card className="w-full">
					<CardHeader className="pb-6 border-b border-secondary flex items-center gap-4">
						<div className="w-[50px] h-[50px] rounded-full bg-secondary shrink-0"></div>
						<div className="flex flex-col gap-1.5">
							<CardTitle>Lebron James</CardTitle>
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
				<StatChart />
			</section>
			<section>
				<GamelogTable columns={columns} data={data} />
			</section>
		</main>
	);
}
