"use client"

import { TrendingUp } from "lucide-react"
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
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
import { GameLog } from "@/app/types"
import { format } from "date-fns"

export const description = "A bar chart"

const chartConfig = {
	desktop: {
		label: "Value",
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

const roundToNearestHalf = (value: number): number => {
	return Math.round(value * 2) / 2;
};

export function StatChart({ data }: { data: GameLog[] }) {
	const [selectedStat, setSelectedStat] = useState("pts");

	const averageStat = roundToNearestHalf(data.reduce((acc, game) => {
		const statValue = game[selectedStat as keyof GameLog] as number;
		return acc + statValue;
	}, 0) / data.length);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Stat Chart</CardTitle>
				<CardDescription>Last 6 games</CardDescription>
			</CardHeader>
			<div className="flex items-center justify-between gap-3 pb-3 px-3 border-b border-secondary overflow-x-auto">
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
					<BarChart accessibilityLayer data={data}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="gameDate"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => format(value, "M/d")}
						/>
						<YAxis
							yAxisId="left"
							orientation="left"
							dataKey={selectedStat}
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<YAxis
							yAxisId="right"
							orientation="right"
							dataKey={selectedStat}
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
							dataKey={selectedStat}
							fill="var(--color-desktop)"
							radius={8}
						>
							{data.map((entry, index) => {
								const statValue = entry[selectedStat as keyof GameLog] as number;

								let fillColor = "";
								if (statValue > averageStat) {
									fillColor = "var(--color-green-500)";
								} else if (statValue < averageStat) {
									fillColor = "var(--color-red-500)";
								} else {
									fillColor = "var(--color-muted-foreground)";
								}

								return (
									<Cell
										key={`cell-${index}`}
										fill={fillColor}
									/>
								)
							})}
						</Bar>
						<ReferenceLine
							yAxisId="left"
							y={averageStat}
							stroke="grey"
							strokeWidth={1}
							strokeDasharray="10 10"
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="text-sm border-t border-secondary">
				<div className="flex gap-1.5 leading-none font-medium">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="text-muted-foreground leading-none">
					Showing total visitors for the last 6 months
				</div>
			</CardFooter>
		</Card>
	)
}

