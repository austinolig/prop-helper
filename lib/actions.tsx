"use server";
import { fetchPlayersFromAPI } from "@/lib/data";

export async function handleSearchAction(league: string, term: string) {
	const result = await fetchPlayersFromAPI(league, term);
	return result;
}
