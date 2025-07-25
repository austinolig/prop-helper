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
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation";
import { handleSearchAction } from "@/lib/actions";
import { PlayersTable } from "@/types";

export function SearchCombobox() {
	const { replace } = useRouter();
	const pathname = usePathname();

	const [open, setOpen] = useState(false)
	const [value, setValue] = useState("")
	const [players, setPlayers] = useState<PlayersTable[]>([]);

	const handleSearch = async (term: string) => {
		// const params = new URLSearchParams(searchParams);
		// if (term) {
		// 	params.set("fullName", term);
		// } else {
		// 	params.delete("fullName");
		// }
		// replace(`${pathname}?${params.toString()}`);

		const results = await handleSearchAction(term);
		if (results) {
			setPlayers(results);
		} else {
			setPlayers([]);
		}
	}

	useEffect(() => {
		replace(`${pathname}?playerId=${value}`);
	}, [value, pathname, replace]);


	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-auto sm:w-[200px] justify-between"
				>
					<span className="hidden sm:inline">
						{value
							? players.find((player) => player.id.toString() === value)?.full_name
							: "Select player..."}
					</span>
					<ChevronsUpDown className="sm:ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-[200px] p-0">
				<Command>
					<CommandInput
						onValueChange={handleSearch}
						placeholder="Search player..." />
					<CommandList>
						<CommandEmpty>No player found.</CommandEmpty>
						<CommandGroup>
							{players.map((player) => (
								<CommandItem
									key={player.id}
									value={player.full_name}
									onSelect={(currentValue) => {
										setValue(currentValue === player.id.toString() ? "" : player.id.toString())
										setOpen(false)
									}}
								>
									<CheckIcon
										className={cn(
											"mr-2 h-4 w-4",
											value === player.full_name ? "opacity-100" : "opacity-0"
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
