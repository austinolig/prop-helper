import { FilterOption } from "@/types";

export const FILTER_OPTIONS = {
	matchup: [
		{ value: "vs", label: "vs (Home)" },
		{ value: "@", label: "@ (Away)" }
	] as FilterOption[],

	wl: [
		{ value: "W", label: "Win" },
		{ value: "L", label: "Loss" }
	] as FilterOption[],

	season: [
		{ value: "2023-24", label: "2023-24" },
		{ value: "2022-23", label: "2022-23" },
		{ value: "2021-22", label: "2021-22" }
	] as FilterOption[],

	month: [
		{ value: "10", label: "October" },
		{ value: "11", label: "November" },
		{ value: "12", label: "December" },
		{ value: "1", label: "January" },
		{ value: "2", label: "February" },
		{ value: "3", label: "March" },
		{ value: "4", label: "April" },
		{ value: "5", label: "May" },
		{ value: "6", label: "June" }
	] as FilterOption[],

	year: [
		{ value: "2024", label: "2024" },
		{ value: "2023", label: "2023" },
		{ value: "2022", label: "2022" }
	] as FilterOption[]
};

export const DEFAULT_FILTERS = {
	matchup: "",
	wl: "",
	season: "",
	month: "",
	year: ""
};

export const DEFAULT_RANGE = "all";