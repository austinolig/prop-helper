"use client";

import { CheckIcon, ChevronsUpDown } from "lucide-react"
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
import { useState } from "react"
import { handleSearchAction } from "@/lib/actions";
import { PlayersTable } from "@/types";
import { useRouter, useParams } from "next/navigation";

export function SearchCombobox() {
	const router = useRouter();
	const params = useParams<{ playerId?: string[] }>();
	const [league, setLeague] = useState("NBA");
	const [players, setPlayers] = useState<PlayersTable[]>([]);

	const handleSearch = async (term: string) => {
		const results = await handleSearchAction(term);
		if (results) {
			setPlayers(results);
		} else {
			setPlayers([]);
		}
	}

	const handleSelect = (playerId: string) => {
		router.push(`/dashboard/${playerId}`);
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					// aria-expanded={open}
					className="w-auto sm:w-[300px] justify-between"
				>
					<span className="hidden sm:inline">
						{params.playerId
							? players.find((player) => player.id.toString() === params.playerId[0])?.full_name
							: "Select player..."}
					</span>
					<ChevronsUpDown className="sm:ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-[300px] p-0">
				<Command>
					<div className="flex border-b-1">
						<Button variant="ghost"
							className={cn(
								"flex-1 rounded-none text-muted-foreground hover:text-foreground hover:border-foreground",
								league === "NBA" ? "border-primary text-primary hover:text-primary hover:border-primary" : "",
							)}
							onClick={() => setLeague("NBA")}
						>
							NBA
						</Button>
						<Button variant="ghost"
							className={cn(
								"flex-1 rounded-none text-muted-foreground hover:text-foreground hover:border-foreground",
								league === "WNBA" ? "border-primary text-primary hover:text-primary hover:border-primary" : "",
							)}
							onClick={() => setLeague("WNBA")}
						>
							WNBA
						</Button>
					</div>
					<CommandInput
						onValueChange={handleSearch}
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
											params.playerId[0] === player.id.toString() ? "opacity-100" : "opacity-0"
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
