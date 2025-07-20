"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { FilterDropdown } from "./filter-dropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Filter, Pin, PinOff } from "lucide-react";
import { useState } from "react";
import { FilterState } from "@/types";
import { FILTER_OPTIONS, DEFAULT_FILTERS, DEFAULT_RANGE } from "@/lib/filter-constants";
import {
	Tabs,
	TabsList,
	TabsTrigger
} from "@/components/ui/tabs"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { Badge } from "../ui/badge";

interface FiltersProps {
	filters?: FilterState;
	onFiltersChange?: (filters: FilterState) => void;
	range?: string;
	onRangeChange?: (range: string) => void;
}

export function Filters({
	filters: externalFilters,
	onFiltersChange,
	range: externalRange,
	onRangeChange
}: FiltersProps) {
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

	const getFilterLabel = (filterType: string, value: string): string => {
		const options = FILTER_OPTIONS[filterType as keyof typeof FILTER_OPTIONS];
		const option = options?.find(opt => opt.value === value);
		return option?.label || value;
	};

	const activeFilters = Object.entries(filters)
		.filter(([_, value]) => value !== "")
		.map(([key, value]) => getFilterLabel(key, value));

	return (
		<section>
			<Card className="w-full relative">
				<CardHeader>
					<CardTitle>Filters</CardTitle>
					<CardDescription>
						{activeFilters.length} filter{activeFilters.length !== 1 ? "s" : ""} selected
					</CardDescription>
					{activeFilters.length > 0 && (
						<div className="flex gap-1.5 border-l pl-3">
							{activeFilters.map((filter, index) => (
								<Badge key={index}>{filter}</Badge>
							))}
						</div>
					)}
				</CardHeader>
				<CardContent className="flex gap-3">
					<Tabs value={range} onValueChange={setRange} className="flex-1">
						<TabsList className="w-full">
							<TabsTrigger value="all">All</TabsTrigger>
							<TabsTrigger value="5">L5</TabsTrigger>
							<TabsTrigger value="10">L10</TabsTrigger>
							<TabsTrigger value="20">L20</TabsTrigger>
						</TabsList>
					</Tabs>
					<Drawer>
						<DrawerTrigger asChild>
							<Button variant="outline">
								<Filter />
								<span className="hidden sm:inline">Filters</span>
								{activeFilters.length > 0 && (
									<span className="text-xs bg-primary text-primary-foreground rounded-full size-4">
										{activeFilters.length}
									</span>
								)}
							</Button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Filters</DrawerTitle>
							</DrawerHeader>
							<div className="flex gap-3 flex-wrap px-3">
								<FilterDropdown
									options={FILTER_OPTIONS.matchup}
									placeholder="Home/Away"
									value={filters.matchup}
									onValueChange={(value) => handleFilterChange("matchup", value)}
								/>
								<FilterDropdown
									options={FILTER_OPTIONS.wl}
									placeholder="Win/Loss"
									value={filters.wl}
									onValueChange={(value) => handleFilterChange("wl", value)}
								/>
							</div>
							<DrawerFooter>
								<DrawerClose asChild>
									<Button>Close</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</CardContent>
			</Card>
		</section>
	)
}
