"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FilterOption } from "@/types"

interface FilterDropdownProps {
	options: FilterOption[]
	placeholder?: string
	onValueChange?: (value: string) => void
	value?: string
	filterType?: string
}

export function FilterDropdown({
	options,
	placeholder = "Select filter...",
	onValueChange,
	value: controlledValue,
}: FilterDropdownProps) {
	const [internalValue, setInternalValue] = React.useState("")

	const value = controlledValue !== undefined ? controlledValue : internalValue
	const setValue = controlledValue !== undefined ? onValueChange : setInternalValue

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="w-full justify-between"
				>
					{value
						? options.find((option) => option.value === value)?.label
						: placeholder}
					<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-full">
				<DropdownMenuItem
					onClick={() => setValue?.("")}
				>
					<CheckIcon
						className={cn(
							"mr-2 h-4 w-4",
							value === "" ? "opacity-100" : "opacity-0"
						)}
					/>
					None
				</DropdownMenuItem>
				{options.map((option) => (
					<DropdownMenuItem
						key={option.value}
						onClick={() => {
							setValue?.(option.value)
						}}
					>
						<CheckIcon
							className={cn(
								"mr-2 h-4 w-4",
								value === option.value ? "opacity-100" : "opacity-0"
							)}
						/>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
