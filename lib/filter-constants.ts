import { FilterOption } from "@/types";

export const FILTER_OPTIONS = {
	matchup: [
		{ value: "vs", label: "Home" },
		{ value: "@", label: "Away" }
	] as FilterOption[],
	wl: [
		{ value: "W", label: "Win" },
		{ value: "L", label: "Loss" }
	] as FilterOption[],
};

export const DEFAULT_FILTERS = {
	matchup: "",
	wl: "",
};

export const DEFAULT_RANGE = "all";
