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
	opponent: [
		{ value: "ATL", label: "ATL" },
		{ value: "BKN", label: "BKN" },
		{ value: "BOS", label: "BOS" },
		{ value: "CHA", label: "CHA" },
		{ value: "CHI", label: "CHI" },
		{ value: "CLE", label: "CLE" },
		{ value: "DAL", label: "DAL" },
		{ value: "DEN", label: "DEN" },
		{ value: "DET", label: "DET" },
		{ value: "GSW", label: "GSW" },
		{ value: "HOU", label: "HOU" },
		{ value: "IND", label: "IND" },
		{ value: "LAC", label: "LAC" },
		{ value: "LAL", label: "LAL" },
		{ value: "MEM", label: "MEM" },
		{ value: "MIA", label: "MIA" },
		{ value: "MIL", label: "MIL" },
		{ value: "MIN", label: "MIN" },
		{ value: "NOP", label: "NOP" },
		{ value: "NYK", label: "NYK" },
		{ value: "OKC", label: "OKC" },
		{ value: "ORL", label: "ORL" },
		{ value: "PHI", label: "PHI" },
		{ value: "PHX", label: "PHX" },
		{ value: "POR", label: "POR" },
		{ value: "SAC", label: "SAC" },
		{ value: "SAS", label: "SAS" },
		{ value: "TOR", label: "TOR" },
		{ value: "UTA", label: "UTA" },
		{ value: "WAS", label: "WAS" }
	] as FilterOption[],
};

export const DEFAULT_FILTERS = {
	matchup: "",
	wl: "",
	opponent: "",
};

export const DEFAULT_RANGE = "5";
