"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	LabelList,
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
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { GameLog } from "@/types"
import { format } from "date-fns"
import { Slider } from "../ui/slider"

export const description = "A bar chart"

const chartConfig = {
	green: {
		label: "Value",
		color: "var(--color-green-500)",
	},
	red: {
		label: "Value",
		color: "var(--color-red-500)",
	},
	// gamelog: {
	// 	label: "Value",
	// 	color: "var(--chart-1)",
	// },
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
	{
		value: "fg3m",
		label: "3PM",
	},
	{
		value: "pra",
		label: "PTS+REB+AST",
	},
	{
		value: "pr",
		label: "PTS+REB",
	},
	{
		value: "pa",
		label: "PTS+AST",
	},
	{
		value: "ra",
		label: "REB+AST",
	},
]

const roundToNearestHalf = (value: number): number => {
	return Math.round(value * 2) / 2;
};

export function StatChart({ data }: { data: GameLog[] }) {
	const enhancedData = useMemo(() => data.map(game => ({
		...game,
		pra: game.pts + game.reb + game.ast,
		pr: game.pts + game.reb,
		pa: game.pts + game.ast,
		ra: game.reb + game.ast,
	})), [data]);
	const [selectedStat, setSelectedStat] = useState("pts");
	const [sliderValue, setSliderValue] = useState(0);

	const averageStat = enhancedData.reduce((acc, game) => {
		const statValue = game[selectedStat as keyof GameLog] as number;
		return acc + statValue;
	}, 0) / enhancedData.length;

	const highStat = Math.max(...enhancedData.map(game => game[selectedStat as keyof GameLog] as number));
	const lowStat = Math.min(...enhancedData.map(game => game[selectedStat as keyof GameLog] as number));

	const handleSlider = (value: number[]) => {
		setSliderValue(value[0]);
	};

	const gamesBeyondSliderValue = enhancedData.filter(game => {
		const statValue = game[selectedStat as keyof GameLog] as number;
		return statValue > sliderValue;
	});

	const hitRate = Math.round((gamesBeyondSliderValue.length / enhancedData.length) * 100);

	useEffect(() => {
		setSliderValue(roundToNearestHalf(averageStat));
	}, [averageStat]);

	return (
		<section>
			<Card>
				<CardHeader>
					<CardTitle>Stat Chart</CardTitle>
					<CardDescription>Last {enhancedData.length} games</CardDescription>
				</CardHeader>
				<div className="flex items-center justify-between gap-3 px-3 overflow-x-auto">
					{statSelections.map((stat) => (
						<Button
							key={stat.value}
							variant="ghost"
							className={cn(
								"flex-1 border-b-4 border-muted-foreground rounded-none rounded-t-md text-muted-foreground hover:text-foreground hover:border-foreground",
								selectedStat === stat.value ? "border-primary text-primary hover:text-primary hover:border-primary" : "",
							)}
							onClick={() => setSelectedStat(stat.value)}
						>
							{stat.label}
						</Button>
					))}
				</div>
				<CardContent className="p-0 pr-3">
					<ChartContainer config={chartConfig} className="h-64 w-full">
						<BarChart
							// accessibilityLayer
							data={enhancedData}
							margin={{ top: 8, right: 0 }}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="gameDate"
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => format(value, "M/d")}
							/>
							<YAxis
								orientation="left"
								dataKey={selectedStat}
								tickLine={false}
								tickMargin={0}
								axisLine={false}
								width={32}
							/>
							<ChartTooltip
								content={
									<ChartTooltipContent
										labelFormatter={(value, item) => {
											const matchup = item[0].payload.matchup;
											const opponent = matchup.substring(matchup.indexOf(" "));
											return <>
												<span className="text-muted-foreground">{format(value, "M/d")} {opponent} ({item[0].payload.wl})</span>
												<br />
												<span className="text-muted-foreground">{item[0].payload.min} mins played</span>
											</>;
										}}
										formatter={(value) => <span className="font-medium text-sm">{value}</span>}
										hideIndicator
									/>
								}
							/>
							<Bar
								dataKey={selectedStat}
								radius={8}
								minPointSize={1}
							>
								{enhancedData.map((entry, index) => {
									const statValue = entry[selectedStat as keyof GameLog] as number;

									let fillColor = "";
									if (statValue > sliderValue) {
										fillColor = "var(--color-green-500)";
									} else if (statValue < sliderValue) {
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
								{enhancedData.length <= 20 && (
									<LabelList
										dataKey={selectedStat}
										position="insideTop"
										fill="var(--background)"
										fontWeight="bold"
										fontSize={12}
										opacity={0.7}
									/>
								)}
							</Bar>
							<ReferenceLine
								y={sliderValue}
								stroke="grey"
								strokeWidth={1}
								strokeDasharray="10 10"
								label={{
									value: sliderValue,
									position: "insideRight",
									fill: "var(--color-foreground)",
									fontSize: 14,
									fontWeight: "bold",
									stroke: "var(--color-secondary)",
									strokeWidth: 6,
									strokeLinejoin: "round",
									// strokeOpacity: 0.3,
									paintOrder: "stroke",
								}}
							/>
						</BarChart>
					</ChartContainer>
				</CardContent>
				<div className="px-3">
					<Slider
						value={[sliderValue]}
						onValueChange={handleSlider}
						max={highStat}
						min={0}
						step={0.5}

					/>
				</div>
				<CardFooter className="text-sm border-t border-secondary justify-between">
					<div className={cn(
						"flex gap-1.5 leading-none font-medium",
						hitRate >= 50 ? "text-green-500" : "text-red-500"
					)}>
						<span> {hitRate}% ({gamesBeyondSliderValue.length}/{enhancedData.length})</span>
						{hitRate >= 50
							? <TrendingUp className="h-4 w-4" />
							: <TrendingDown className="h-4 w-4" />
						}
					</div>
					<div className="text-muted-foreground leading-none">
						Average: {averageStat.toFixed(1)} | High: {highStat} | Low: {lowStat}
					</div>
				</CardFooter>
			</Card>
		</section>
	)
}

