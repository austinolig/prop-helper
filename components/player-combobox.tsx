'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlayersTable } from '@/app/types';
import { ChevronsUpDown } from "lucide-react"
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

interface PlayerComboboxProps {
	players: PlayersTable[];
	currentPlayerId: string | undefined;
}

export default function PlayerCombobox({
	players,
	currentPlayerId = "2544"
}: PlayerComboboxProps) {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const handleChange = (playerId: number) => {
		router.push(`/dashboard?playerId=${playerId}`);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="font-bold items-center"
					size="lg"
				>
					<span>
						{players.find((player) => player.id === parseInt(currentPlayerId))?.full_name}
					</span>
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0" align="start">
				<Command>
					<CommandInput placeholder="Search players..." className="h-9" />
					<CommandList>
						<CommandEmpty>No players found.</CommandEmpty>
						<CommandGroup>
							{players.map((player) => (
								<CommandItem
									key={player.id}
									value={player.full_name}
									onSelect={() => handleChange(player.id)}
									className={currentPlayerId === player.id.toString()
										? "font-bold"
										: "opacity-60"
									}
								>
									{player.full_name}
									<span
										className={cn(
											"text-xs italic ml-auto",
											player.is_active ? "text-green-500" : "text-red-500",
										)}
									>
										{player.is_active ? "Active" : "Inactive"}
									</span>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

