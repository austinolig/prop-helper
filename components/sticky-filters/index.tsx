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
								<span>Filters</span>
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
								<Button>Save</Button>
								<DrawerClose asChild>
									<Button variant="outline">Cancel</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</CardContent>
			</Card>
		</section>
	)
}
