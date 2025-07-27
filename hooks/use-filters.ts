import { useState, useMemo } from 'react';
import { GameLog, FilterState } from '@/types';
import { DEFAULT_FILTERS, DEFAULT_RANGE } from '@/lib/filter-constants';

/**
 * Custom hook for managing game log filters and range selection
 * @param gamelogs - Array of game logs to filter
 * @returns Object containing filter state, setters, and filtered data
 */
export function useFilters(gamelogs: GameLog[]) {
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

			if (filters.opponent && !gamelog.matchup.includes(filters.opponent)) {
				return false;
			}

			return true;
		});

		// Then apply range filtering (limit number of results)
		if (range === "all") {
			return filteredGamelogs;
		}

		const rangeLimit = parseInt(range);
		return filteredGamelogs.slice(0, rangeLimit);
	}, [gamelogs, filters, range]);

	return {
		filters,
		setFilters,
		range,
		setRange,
		filteredAndRangedGamelogs,
	};
}