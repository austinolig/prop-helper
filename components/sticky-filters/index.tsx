"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { FilterCombobox } from "./filter-combobox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pin, PinOff } from "lucide-react";
import { useState } from "react";
import { FilterState } from "@/types";
import { FILTER_OPTIONS, DEFAULT_FILTERS, DEFAULT_RANGE } from "@/lib/filter-constants";
import {
	Tabs,
	TabsList,
	TabsTrigger
} from "@/components/ui/tabs"

interface StickyFiltersProps {
	filters?: FilterState;
	onFiltersChange?: (filters: FilterState) => void;
	range?: string;
	onRangeChange?: (range: string) => void;
}

export function StickyFilters({ 
	filters: externalFilters, 
	onFiltersChange,
	range: externalRange,
	onRangeChange
}: StickyFiltersProps) {
	const [sticky, setSticky] = useState(false);
	const [internalFilters, setInternalFilters] = useState<FilterState>(DEFAULT_FILTERS);
	const [internalRange, setInternalRange] = useState(DEFAULT_RANGE);

	const filters = externalFilters || internalFilters;
	const setFilters = onFiltersChange || setInternalFilters;
	const range = externalRange || internalRange;
	const setRange = onRangeChange || setInternalRange;

	const handleFilterChange = (filterType: string, value: string) => {
		const newFilters = {
			...filters,
			[filterType]: value
		};
		setFilters(newFilters);
	};

	const activeFiltersCount = Object.values(filters).filter(value => value !== "").length;

	return (
		<section className={sticky ? "sticky top-3 z-10" : ""}>
			<Card className="w-full relative">
				<CardHeader className="">
					<CardTitle>Filters</CardTitle>
					<CardDescription>{activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} selected</CardDescription>
					<Button
						onClick={() => setSticky(!sticky)}
						variant="ghost"
						size="icon"
						className={cn(
							"absolute top-1 right-1 rounded-lg text-muted-foreground hover:text-foreground",
							sticky ? "text-primary hover:text-primary" : ""
						)}
					>
						<span className="sr-only">Toggle Sticky Filters</span>
						{sticky ? <Pin /> : <PinOff />}
					</Button>
				</CardHeader>
				<CardContent className="space-y-4">
					<Tabs value={range} onValueChange={setRange} className="w-full">
						<TabsList className="grid w-full grid-cols-4">
							<TabsTrigger value="all">All</TabsTrigger>
							<TabsTrigger value="l5">L5</TabsTrigger>
							<TabsTrigger value="l10">L10</TabsTrigger>
							<TabsTrigger value="l20">L20</TabsTrigger>
						</TabsList>
					</Tabs>
					<div className="flex gap-3 justify-between overflow-x-auto">
						<FilterCombobox
							options={FILTER_OPTIONS.matchup}
							placeholder="Home/Away"
							value={filters.matchup}
							onValueChange={(value) => handleFilterChange("matchup", value)}
							filterType="matchup"
						/>
						<FilterCombobox
							options={FILTER_OPTIONS.wl}
							placeholder="Win/Loss"
							value={filters.wl}
							onValueChange={(value) => handleFilterChange("wl", value)}
							filterType="result"
						/>
						<FilterCombobox
							options={FILTER_OPTIONS.season}
							placeholder="Season"
							value={filters.season}
							onValueChange={(value) => handleFilterChange("season", value)}
							filterType="season"
						/>
						<FilterCombobox
							options={FILTER_OPTIONS.month}
							placeholder="Month"
							value={filters.month}
							onValueChange={(value) => handleFilterChange("month", value)}
							filterType="month"
						/>
						<FilterCombobox
							options={FILTER_OPTIONS.year}
							placeholder="Year"
							value={filters.year}
							onValueChange={(value) => handleFilterChange("year", value)}
							filterType="year"
						/>
					</div>
				</CardContent>
			</Card>
		</section>
	)
}
