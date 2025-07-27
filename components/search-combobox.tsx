"use client";

import { CheckIcon, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { useCallback, useEffect, useState } from "react"
import { handleSearchAction } from "@/lib/actions";
import { PlayersTable } from "@/types";
import { useRouter, useParams } from "next/navigation";

export function SearchCombobox() {
	const router = useRouter();
	const params = useParams<{ league: string, playerId: string }>();
	const leagueParam = params.league ? params.league : "nba";
	const playerIdParam = params.playerId ? params.playerId : null;
	const [players, setPlayers] = useState<PlayersTable[]>([]);
	const [league, setLeague] = useState(leagueParam);
	const [term, setTerm] = useState("");

	const handleSearch = useCallback(async () => {
		if (term.length < 2) {
			setPlayers([]);
			return;
		}
		const results = await handleSearchAction(league, term);
		if (results) {
			setPlayers(results);
		}
	}, [league, term]);

	useEffect(() => {
		handleSearch();
	}, [league, term, handleSearch]);

	const handleSelect = (playerId: string) => {
		if (playerId === playerIdParam) {
			return;
		}
		router.push(`/${league}/${playerId}`);
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					className="w-auto justify-between"
				>
					<Search className="h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-[300px] p-0">
				<Command>
					<div className="flex border-b-1">
						<Button
							variant="ghost"
							className={cn(
								"flex-1 rounded-none text-muted-foreground hover:text-foreground hover:border-foreground",
								league === "nba" ? "border-primary text-primary hover:text-primary hover:border-primary" : "",
							)}
							onClick={() => setLeague("nba")}
						>
							NBA
						</Button>
						<Button
							variant="ghost"
							className={cn(
								"flex-1 rounded-none text-muted-foreground hover:text-foreground hover:border-foreground",
								league === "wnba" ? "border-primary text-primary hover:text-primary hover:border-primary" : "",
							)}
							onClick={() => setLeague("wnba")}
						>
							WNBA
						</Button>
					</div>
					<CommandInput
						value={term}
						onValueChange={setTerm}
						placeholder="Search player..."
					/>
					<CommandList>
						<CommandEmpty>No player found.</CommandEmpty>
						<CommandGroup>
							{players.map((player) => (
								<CommandItem
									key={player.id}
									value={player.full_name}
									onSelect={() => handleSelect(player.id.toString())}
								>
									<CheckIcon
										className={cn(
											"mr-2 h-4 w-4",
											playerIdParam === player.id.toString() ? "opacity-100" : "opacity-0"
										)}
									/>
									{player.full_name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
