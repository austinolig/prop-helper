"use server";
import { fetchWnbaPlayers } from "@/lib/data";

export async function handleSearchAction(term: string) {
	const result = await fetchWnbaPlayers(term);
	return result;
}
