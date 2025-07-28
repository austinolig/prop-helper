import { GameLog, PlayersTable } from "@/types";

interface StatResult {
	property: string;
	avg: number;
	max: number;
	min: number;
}

interface PlayerCardProps {
	player: PlayersTable;
	gamelogs: GameLog[];
}

export default function PlayerCard({ player, gamelogs }: PlayerCardProps) {
	const calculateStatForProperty = (property: keyof GameLog): StatResult => {
		if (!gamelogs?.length) {
			return { property: "-", avg: 0, max: 0, min: 0 };
		}

		const values = gamelogs
			.map(g => g[property])
			.filter((val): val is number => typeof val === 'number' && !isNaN(val));

		if (values.length === 0) {
			return { property: "-", avg: 0, max: 0, min: 0 };
		}

		const sum = values.reduce((acc, val) => acc + val, 0);
		return {
			property,
			avg: sum / values.length,
			max: Math.max(...values),
			min: Math.min(...values)
		};
	};

	const stats = [
		calculateStatForProperty('pts'),
		calculateStatForProperty('reb'),
		calculateStatForProperty('ast'),
		calculateStatForProperty('blk'),
		calculateStatForProperty('stl')
	];

	return (
		<section className="mb-6">
			<div className="flex px-3 sm:px-0 items-center gap-3 flex-col sm:flex-row">
				<div className="w-1/3 sm:w-28 aspect-square rounded-full bg-secondary shrink-0 flex items-center justify-center font-bold text-2xl">LJ</div>
				<div className="flex flex-col w-full gap-3">
					<div className="flex text-center sm:text-left items-center sm:items-end gap-x-3 gap-y-1 flex-col sm:flex-row">
						<p className="text-2xl font-bold leading-none">{player?.full_name}</p>
						<p className="text-sm text-muted-foreground">Los Angeles Lakers</p>
					</div>
					<div className="flex flex-wrap gap-3 sm:gap-6 overflow-x-auto justify-center sm:justify-start text-center sm:text-left">
						{stats.map((stat, index) => (
							<StatDisplay key={index} stat={stat} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

const StatDisplay = ({ stat }: { stat: StatResult }) => (
	<div className="min-w-max">
		<p className="text-lg font-medium">
			{stat.avg.toFixed(1)} <span className="text-sm">{stat.property.toUpperCase()}</span>
		</p>
		<p className="text-sm text-muted-foreground">
			H: {stat.max}/L: {stat.min}
		</p>
	</div>
);
