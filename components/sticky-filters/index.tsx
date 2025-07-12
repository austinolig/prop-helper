import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { FilterCombobox } from "@/components/filter-combobox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pin, PinOff } from "lucide-react";
import { useState } from "react";

export function StickyFilters() {
	const [sticky, setSticky] = useState(false);
	return (
		<section className={sticky ? "sticky top-4 z-10" : ""}>
			<Card className="w-full relative">
				<CardHeader className="pb-6 border-b border-secondary">
					<CardTitle>Filters</CardTitle>
					<CardDescription>0 filters selected</CardDescription>
					<Button
						onClick={() => setSticky(!sticky)}
						variant="ghost"
						size="icon"
						className={cn(
							"absolute top-4 right-4 text-muted-foreground hover:text-foreground",
							sticky ? "text-primary hover:text-primary" : ""
						)}
					>
						<span className="sr-only">Toggle Sticky Filters</span>
						{sticky ? <Pin /> : <PinOff />}
					</Button>
				</CardHeader>
				<CardContent className="flex gap-4 justify-between overflow-x-auto">
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
