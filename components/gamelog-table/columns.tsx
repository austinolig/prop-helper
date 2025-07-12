"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button"
import { GameLog } from "@/app/types"

export const columns: ColumnDef<GameLog>[] = [
	{
		accessorKey: "gameDate",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Date
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const date = new Date(row.getValue("gameDate"))
			return date.toLocaleDateString()
		},
	},
	{
		accessorKey: "matchup",
		header: "Matchup",
	},
	{
		accessorKey: "wl",
		header: "W/L",
		cell: ({ row }) => {
			const wl = row.getValue("wl") as string
			return (
				<span className={wl === "W" ? "text-green-600" : "text-red-600"}>
					{wl}
				</span>
			)
		},
	},
	{
		accessorKey: "min",
		header: () => <div className="text-right">MIN</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("min")}</div>
		},
	},
	{
		accessorKey: "pts",
		header: () => <div className="text-right">PTS</div>,
		cell: ({ row }) => {
			return <div className="text-right font-medium">{row.getValue("pts")}</div>
		},
	},
	{
		accessorKey: "reb",
		header: () => <div className="text-right">REB</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("reb")}</div>
		},
	},
	{
		accessorKey: "ast",
		header: () => <div className="text-right">AST</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("ast")}</div>
		},
	},
	{
		accessorKey: "stl",
		header: () => <div className="text-right">STL</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("stl")}</div>
		},
	},
	{
		accessorKey: "blk",
		header: () => <div className="text-right">BLK</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("blk")}</div>
		},
	},
	{
		accessorKey: "tov",
		header: () => <div className="text-right">TOV</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("tov")}</div>
		},
	},
	{
		accessorKey: "fgm",
		header: () => <div className="text-right">FGM</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("fgm")}</div>
		},
	},
	{
		accessorKey: "fga",
		header: () => <div className="text-right">FGA</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("fga")}</div>
		},
	},
	{
		accessorKey: "fgPct",
		header: () => <div className="text-right">FG%</div>,
		cell: ({ row }) => {
			const pct = row.getValue("fgPct") as number
			return <div className="text-right">{(pct * 100).toFixed(1)}%</div>
		},
	},
	{
		accessorKey: "fg3m",
		header: () => <div className="text-right">3PM</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("fg3m")}</div>
		},
	},
	{
		accessorKey: "fg3a",
		header: () => <div className="text-right">3PA</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("fg3a")}</div>
		},
	},
	{
		accessorKey: "fg3Pct",
		header: () => <div className="text-right">3P%</div>,
		cell: ({ row }) => {
			const pct = row.getValue("fg3Pct") as number
			return <div className="text-right">{pct ? (pct * 100).toFixed(1) + "%" : "0.0%"}</div>
		},
	},
	{
		accessorKey: "ftm",
		header: () => <div className="text-right">FTM</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("ftm")}</div>
		},
	},
	{
		accessorKey: "fta",
		header: () => <div className="text-right">FTA</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("fta")}</div>
		},
	},
	{
		accessorKey: "ftPct",
		header: () => <div className="text-right">FT%</div>,
		cell: ({ row }) => {
			const pct = row.getValue("ftPct") as number
			return <div className="text-right">{pct ? (pct * 100).toFixed(1) + "%" : "0.0%"}</div>
		},
	},
	{
		accessorKey: "oreb",
		header: () => <div className="text-right">OREB</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("oreb")}</div>
		},
	},
	{
		accessorKey: "dreb",
		header: () => <div className="text-right">DREB</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("dreb")}</div>
		},
	},
	{
		accessorKey: "pf",
		header: () => <div className="text-right">PF</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("pf")}</div>
		},
	},
	{
		accessorKey: "plusMinus",
		header: () => <div className="text-right">+/-</div>,
		cell: ({ row }) => {
			const plusMinus = row.getValue("plusMinus") as number
			return (
				<div className={`text-right`}>
					{plusMinus >= 0 ? "+" : ""}{plusMinus}
				</div>
			)
		},
	},
]
