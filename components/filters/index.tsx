import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { FilterDropdown } from "./filter-dropdown";
import { Button } from "@/components/ui/button";
import { Filter, RotateCcw, X } from "lucide-react";
import { FilterState } from "@/types";
import { FILTER_OPTIONS, DEFAULT_FILTERS } from "@/lib/filter-constants";
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
	filters: FilterState;
	setFilters: (filters: FilterState) => void;
	range: string;
	setRange: (range: string) => void;
}

export function Filters({
	filters,
	setFilters,
	range,
	setRange,
}: FiltersProps) {
	const handleFilterChange = (filterType: string, value: string) => {
		const newFilters = {
			...filters,
			[filterType]: value
		};
		setFilters(newFilters);
	};

	const handleResetFilters = () => {
		setFilters(DEFAULT_FILTERS);
	};

	const handleRemoveFilter = (filterType: string) => {
		const newFilters = {
			...filters,
			[filterType]: ""
		};
		setFilters(newFilters);
	};

	const getFilterLabel = (filterType: string, value: string): string => {
		const options = FILTER_OPTIONS[filterType as keyof typeof FILTER_OPTIONS];
		const option = options?.find(opt => opt.value === value);
		return option?.label || value;
	};

	const activeFilters = Object.entries(filters)
		.filter(([, value]) => value !== "")
		.map(([key, value]) => ({ key, label: getFilterLabel(key, value) }));

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
								<Badge
									key={index}
									className="flex items-center gap-1 cursor-pointer hover:brightness-120"
									onClick={() => handleRemoveFilter(filter.key)}
								>
									{filter.label}
									<X />
								</Badge>
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
								<FilterDropdown
									options={FILTER_OPTIONS.opponent}
									placeholder="Opponent"
									value={filters.opponent}
									onValueChange={(value) => handleFilterChange("opponent", value)}
								/>
							</div>
							<DrawerFooter>
								<Button onClick={handleResetFilters} variant="outline" className="flex items-center gap-2">
									<RotateCcw className="w-4 h-4" />
									Reset Filters
								</Button>
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
