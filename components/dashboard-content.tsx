"use client";

import { GamelogTable } from "@/components/gamelog-table";
import { columns } from "@/components/gamelog-table/columns";
import { StatChart } from "@/components/stat-chart";
import { StickyFilters } from "@/components/sticky-filters";
import { GameLog, FilterState } from "@/types";
import { DEFAULT_FILTERS, DEFAULT_RANGE } from "@/lib/filter-constants";
import { useState, useMemo } from "react";

interface DashboardContentProps {
	gamelogs: GameLog[];
}

export function DashboardContent({ gamelogs }: DashboardContentProps) {
	const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
	const [range, setRange] = useState(DEFAULT_RANGE);

	const filteredAndRangedGamelogs = useMemo(() => {
		// First apply all filters
		const filteredGamelogs = gamelogs.filter((gamelog) => {
			if (filters.matchup && !gamelog.matchup.includes(filters.matchup)) {
				return false;
			}

			if (filters.wl && gamelog.wl !== filters.wl) {
				return false;
			}

			if (filters.season && gamelog.seasonId !== filters.season) {
				return false;
			}

			if (filters.month || filters.year) {
				const gameDate = new Date(gamelog.gameDate);

				if (filters.month && (gameDate.getMonth() + 1).toString() !== filters.month) {
					return false;
				}

				if (filters.year && gameDate.getFullYear().toString() !== filters.year) {
					return false;
				}
			}

			return true;
		});

		// Then apply range filtering (limit number of results)
		if (range === "all") {
			return filteredGamelogs;
		}

		const rangeLimit = parseInt(range);
		return filteredGamelogs.slice(-rangeLimit);
	}, [gamelogs, filters, range]);

	return (
		<>
			<StickyFilters
				filters={filters}
				onFiltersChange={setFilters}
				range={range}
				onRangeChange={setRange}
			/>
			<StatChart data={filteredAndRangedGamelogs} />
			<GamelogTable columns={columns} data={filteredAndRangedGamelogs} />
		</>
	);
}
