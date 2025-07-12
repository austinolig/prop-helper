"use client";

import { FilterCombobox } from "@/components/filter-combobox";
import { GamelogTable } from "@/components/gamelog-table";
import { columns, Payment } from "@/components/gamelog-table/columns";
import { StatChart } from "@/components/stat-chart";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { Pin, PinOff } from "lucide-react";
import { useState } from "react";

const data: Payment[] = [
	{
		id: "m5gr85i10",
		amount: 328,
		status: "failed",
		email: "ken115@example.com",
	},
	{
		id: "3u1reuv6",
		amount: 261,
		status: "success",
		email: "Abe61@example.com",
	},
	{
		id: "derv1ws17",
		amount: 917,
		status: "success",
		email: "Monserrat44@example.com",
	},
	{
		id: "5kma55ae",
		amount: 886,
		status: "processing",
		email: "Silas37@example.com",
	},
	{
		id: "bhqecj6p",
		amount: 733,
		status: "success",
		email: "carmella123@example.com",
	},
	{
		id: "m5gr84i11",
		amount: 330,
		status: "failed",
		email: "ken127@example.com",
	},
	{
		id: "3u1reuv7",
		amount: 256,
		status: "success",
		email: "Abe70@example.com",
	},
	{
		id: "derv1ws2",
		amount: 848,
		status: "success",
		email: "Monserrat69@example.com",
	},
	{
		id: "5kma55ae",
		amount: 884,
		status: "success",
		email: "Silas47@example.com",
	},
	{
		id: "bhqecj6p",
		amount: 726,
		status: "processing",
		email: "carmella345@example.com",
	},
	{
		id: "m5gr84i11",
		amount: 324,
		status: "failed",
		email: "ken99@example.com",
	},
	{
		id: "3u1reuv5",
		amount: 242,
		status: "success",
		email: "Abe45@example.com",
	},
	{
		id: "derv1ws1",
		amount: 837,
		status: "processing",
		email: "Monserrat44@example.com",
	},
	{
		id: "5kma54ae",
		amount: 874,
		status: "success",
		email: "Silas22@example.com",
	},
	{
		id: "bhqecj5p",
		amount: 721,
		status: "failed",
		email: "carmella@example.com",
	},
	{
		id: "m5gr84i9",
		amount: 316,
		status: "success",
		email: "ken99@example.com",
	},
	{
		id: "3u1reuv4",
		amount: 242,
		status: "success",
		email: "Abe45@example.com",
	},
	{
		id: "derv1ws0",
		amount: 837,
		status: "processing",
		email: "Monserrat44@example.com",
	},
	{
		id: "5kma53ae",
		amount: 874,
		status: "success",
		email: "Silas22@example.com",
	},
	{
		id: "bhqecj4p",
		amount: 721,
		status: "failed",
		email: "carmella@example.com",
	},
]

export default function Dashboard() {
	const [sticky, setSticky] = useState(false);

	return (
		<main>
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
			<section className="flex justify-between items-center gap-4 overflow-x-auto">
				<Card className="w-full">
					<CardHeader className="pb-6 border-b border-secondary flex items-center gap-4">
						<div className="w-[50px] h-[50px] rounded-full bg-secondary shrink-0"></div>
						<div className="flex flex-col gap-1.5">
							<CardTitle>Lebron James</CardTitle>
							<CardDescription>Los Angeles Lakers</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="grid grid-flow-col auto-cols-[1fr] gap-6 justify-between overflow-x-auto">
						<div className="min-w-max">
							<p className="font-medium">25 <span className="text-sm">POINTS</span></p>
							<p className="text-sm text-muted-foreground">H: 37/L: 10</p>
						</div>
						<div className="min-w-max">
							<p className="font-medium">10 <span className="text-sm">REBOUNDS</span></p>
							<p className="text-sm text-muted-foreground">H: 21/L: 3</p>
						</div>
						<div className="min-w-max">
							<p className="font-medium">10 <span className="text-sm">ASSISTS</span></p>
							<p className="text-sm text-muted-foreground">H: 18/L: 2</p>
						</div>
						<div className="min-w-max">
							<p className="font-medium">5 <span className="text-sm">BLOCKS</span></p>
							<p className="text-sm text-muted-foreground">H: 11/L: 0</p>
						</div>
						<div className="min-w-max">
							<p className="font-medium">3 <span className="text-sm">STEALS</span></p>
							<p className="text-sm text-muted-foreground">H: 6/L: 0</p>
						</div>
					</CardContent>
				</Card>
			</section>
			<section>
				<StatChart />
			</section>
			<section>
				<GamelogTable columns={columns} data={data} />
			</section>
		</main>
	);
}
