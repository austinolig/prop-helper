"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { FilterCombobox } from "./filter-combobox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pin, PinOff } from "lucide-react";
import { useState } from "react";

export function StickyFilters() {
	const [sticky, setSticky] = useState(false);
	return (
		<section className={sticky ? "sticky top-3 z-10" : ""}>
			<Card className="w-full relative">
				<CardHeader className="">
					<CardTitle>Filters</CardTitle>
					<CardDescription>0 filters selected</CardDescription>
					<Button
						onClick={() => setSticky(!sticky)}
						variant="ghost"
						size="icon"
						className={cn(
							"absolute top-1 right-1 rounded-lg text-muted-foreground hover:text-foreground",
							sticky ? "text-primary hover:text-primary" : ""
						)}
					>
						<span className="sr-only">Toggle Sticky Filters</span>
						{sticky ? <Pin /> : <PinOff />}
					</Button>
				</CardHeader>
				<CardContent className="relative flex gap-3 justify-between overflow-x-auto">
					<FilterCombobox />
					<FilterCombobox />
					<FilterCombobox />
					<FilterCombobox />
					<FilterCombobox />
				</CardContent>
			</Card>
		</section>
	)
}
