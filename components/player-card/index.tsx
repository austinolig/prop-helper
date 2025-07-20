import { PlayersTable } from "@/types";

interface PlayerCardProps {
	player: PlayersTable;
}

export default function PlayerCard({ player }: PlayerCardProps) {
	return (
		<section className="mb-6">
			<div className="flex px-3 sm:px-0 items-center gap-3 flex-col sm:flex-row">
				<div className="size-24 rounded-full bg-secondary shrink-0 flex items-center justify-center font-bold text-2xl">LJ</div>
				<div className="flex flex-col w-full gap-3">
					<div className="flex text-center sm:text-left items-center sm:items-end gap-x-3 gap-y-1 flex-col sm:flex-row">
						<p className="text-2xl font-bold leading-none">{player?.full_name}</p>
						<p className="text-sm text-muted-foreground">Los Angeles Lakers</p>
					</div>
					<div className="flex flex-wrap gap-3 sm:gap-6 overflow-x-auto justify-center sm:justify-start text-center sm:text-left">
						<div className="min-w-max">
							<p className="text-lg font-medium">25 <span className="text-sm">PTS</span></p>
							<p className="text-sm text-muted-foreground">H: 37/L: 10</p>
						</div>
						<div className="min-w-max">
							<p className="text-lg font-medium">10 <span className="text-sm">REB</span></p>
							<p className="text-sm text-muted-foreground">H: 21/L: 3</p>
						</div>
						<div className="min-w-max">
							<p className="text-lg font-medium">10 <span className="text-sm">AST</span></p>
							<p className="text-sm text-muted-foreground">H: 18/L: 2</p>
						</div>
						<div className="min-w-max">
							<p className="text-lg font-medium">5 <span className="text-sm">BLK</span></p>
							<p className="text-sm text-muted-foreground">H: 11/L: 0</p>
						</div>
						<div className="min-w-max">
							<p className="text-lg font-medium">3 <span className="text-sm">STL</span></p>
							<p className="text-sm text-muted-foreground">H: 6/L: 0</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
