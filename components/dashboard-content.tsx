"use client";

import { GamelogTable } from "@/components/gamelog-table";
import { columns } from "@/components/gamelog-table/columns";
import { StatChart } from "@/components/stat-chart";
import { Filters } from "@/components/filters";
import { GameLog } from "@/types";
import { useFilters } from "@/hooks";

interface DashboardContentProps {
	gamelogs: GameLog[];
}

export function DashboardContent({ gamelogs }: DashboardContentProps) {
	const {
		filters,
		setFilters,
		range,
		setRange,
		filteredAndRangedGamelogs,
	} = useFilters(gamelogs);

	return (
		<>
			<Filters
				filters={filters}
				setFilters={setFilters}
				range={range}
				setRange={setRange}
			/>
			<StatChart data={filteredAndRangedGamelogs.toReversed()} />
			<GamelogTable columns={columns} data={filteredAndRangedGamelogs} />
		</>
	);
}
