"use client"

import { TrendingUp } from "lucide-react"
import {
	Bar,
	BarChart,
	CartesianGrid,
	ReferenceLine,
	XAxis,
	YAxis
} from "recharts"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "./ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

export const description = "A bar chart"

const chartData = [
	{ month: "January", desktop: 186 },
	{ month: "February", desktop: 305 },
	{ month: "March", desktop: 237 },
	{ month: "April", desktop: 73 },
	{ month: "May", desktop: 209 },
	{ month: "June", desktop: 214 },
]

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig

const statSelections = [
	{
		value: "pts",
		label: "PTS",
	},
	{
		value: "reb",
		label: "REB",
	},
	{
		value: "ast",
		label: "AST",
	},
	{
		value: "blk",
		label: "BLK",
	},
	{
		value: "stl",
		label: "STL",
	},
]

export function StatChart() {
	const [selectedStat, setSelectedStat] = useState("pts");
	return (
		<Card>
			<CardHeader>
				<CardTitle>Stat Chart</CardTitle>
				<CardDescription>Last 6 games</CardDescription>
			</CardHeader>
			<div className="flex items-center justify-between gap-4 p-6 border-y border-secondary overflow-x-auto">
				{statSelections.map((stat) => (
					<Button
						key={stat.value}
						variant="ghost"
						className={cn(
							// selectedStat === stat.value ? "bg-accent text-primary" : "",
							// "hover:text-primary flex-1",
							"flex-1 border-b-4 border-muted-foreground rounded-none rounded-t-md text-muted-foreground hover:text-foreground hover:border-foreground",
							selectedStat === stat.value ? "border-primary text-primary hover:text-primary hover:border-primary" : "",
						)}
						onClick={() => setSelectedStat(stat.value)}
					>
						{stat.label}
					</Button>
				))}
			</div>
			<CardContent className="p-0">
				<ChartContainer config={chartConfig} className="h-64 w-full">
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<YAxis
							yAxisId="left"
							orientation="left"
							dataKey="desktop"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<YAxis
							yAxisId="right"
							orientation="right"
							dataKey="desktop"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar
							yAxisId="left"
							dataKey="desktop"
							fill="var(--color-desktop)"
							radius={8}
						/>
						<ReferenceLine
							yAxisId="left"
							y={150}
							stroke="grey"
							strokeWidth={1}
							strokeDasharray="10 10"
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm border-t border-secondary">
				<div className="flex gap-2 leading-none font-medium">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="text-muted-foreground leading-none">
					Showing total visitors for the last 6 months
				</div>
			</CardFooter>
		</Card>
	)
}

