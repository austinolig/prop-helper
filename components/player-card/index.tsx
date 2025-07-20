import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { PlayersTable } from "@/types";

interface PlayerCardProps {
	player: PlayersTable;
}

export default function PlayerCard({ player }: PlayerCardProps) {
	return (
		<section>
			<Card className="w-full py-3">
				<CardHeader className="border-b sm:px-3 border-secondary flex items-center gap-3">
					<div className="size-8 rounded-full bg-secondary shrink-0"></div>
					<div className="flex items-center gap-3">
						<CardTitle>{player?.full_name}</CardTitle>
						<CardDescription>Los Angeles Lakers</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="grid grid-flow-col auto-cols-[1fr] gap-3 justify-between overflow-x-auto">
					<div className="min-w-max">
						<p className="font-medium">25 <span className="text-sm">PTS</span></p>
						<p className="text-sm text-muted-foreground">H: 37/L: 10</p>
					</div>
					<div className="min-w-max">
						<p className="font-medium">10 <span className="text-sm">REB</span></p>
						<p className="text-sm text-muted-foreground">H: 21/L: 3</p>
					</div>
					<div className="min-w-max">
						<p className="font-medium">10 <span className="text-sm">AST</span></p>
						<p className="text-sm text-muted-foreground">H: 18/L: 2</p>
					</div>
					<div className="min-w-max">
						<p className="font-medium">5 <span className="text-sm">BLK</span></p>
						<p className="text-sm text-muted-foreground">H: 11/L: 0</p>
					</div>
					<div className="min-w-max">
						<p className="font-medium">3 <span className="text-sm">STL</span></p>
						<p className="text-sm text-muted-foreground">H: 6/L: 0</p>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
