"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button"
import { GameLog } from "@/types"
import { format } from "date-fns"

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
					<ArrowUpDown className="h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const date = new Date(row.getValue("gameDate"))
			return <div className="text-center">{format(date, "M/d")}</div>;
		},
	},
	{
		accessorKey: "matchup",
		header: () => <div className="text-center">Matchup</div>,
		cell: ({ row }) => {
			const matchup = row.getValue("matchup") as string
			return (
				<div className="text-center">
					{matchup}
				</div>
			)
		},
	},
	{
		accessorKey: "wl",
		header: () => <div className="text-center">W/L</div>,
		cell: ({ row }) => {
			const wl = row.getValue("wl") as string
			return (
				<div className={`text-center ${wl === "W" ? "text-green-500" : "text-red-500"}`}>
					{wl}
				</div>
			)
		},
	},
	{
		accessorKey: "min",
		header: () => <div className="text-center">MIN</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("min")}</div>
		},
	},
	{
		accessorKey: "pts",
		header: () => <div className="text-center">PTS</div>,
		cell: ({ row }) => {
			return <div className="text-center font-medium">{row.getValue("pts")}</div>
		},
	},
	{
		accessorKey: "reb",
		header: () => <div className="text-center">REB</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("reb")}</div>
		},
	},
	{
		accessorKey: "ast",
		header: () => <div className="text-center">AST</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("ast")}</div>
		},
	},
	{
		accessorKey: "stl",
		header: () => <div className="text-center">STL</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("stl")}</div>
		},
	},
	{
		accessorKey: "blk",
		header: () => <div className="text-center">BLK</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("blk")}</div>
		},
	},
	{
		accessorKey: "tov",
		header: () => <div className="text-center">TOV</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("tov")}</div>
		},
	},
	{
		accessorKey: "fgm",
		header: () => <div className="text-center">FGM</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("fgm")}</div>
		},
	},
	{
		accessorKey: "fga",
		header: () => <div className="text-center">FGA</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("fga")}</div>
		},
	},
	{
		accessorKey: "fgPct",
		header: () => <div className="text-center">FG%</div>,
		cell: ({ row }) => {
			const pct = row.getValue("fgPct") as number
			return <div className="text-center">{(pct * 100).toFixed(1)}%</div>
		},
	},
	{
		accessorKey: "fg3m",
		header: () => <div className="text-center">3PM</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("fg3m")}</div>
		},
	},
	{
		accessorKey: "fg3a",
		header: () => <div className="text-center">3PA</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("fg3a")}</div>
		},
	},
	{
		accessorKey: "fg3Pct",
		header: () => <div className="text-center">3P%</div>,
		cell: ({ row }) => {
			const pct = row.getValue("fg3Pct") as number
			return <div className="text-center">{pct ? (pct * 100).toFixed(1) + "%" : "0.0%"}</div>
		},
	},
	{
		accessorKey: "ftm",
		header: () => <div className="text-center">FTM</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("ftm")}</div>
		},
	},
	{
		accessorKey: "fta",
		header: () => <div className="text-center">FTA</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("fta")}</div>
		},
	},
	{
		accessorKey: "ftPct",
		header: () => <div className="text-center">FT%</div>,
		cell: ({ row }) => {
			const pct = row.getValue("ftPct") as number
			return <div className="text-center">{pct ? (pct * 100).toFixed(1) + "%" : "0.0%"}</div>
		},
	},
	{
		accessorKey: "oreb",
		header: () => <div className="text-center">OREB</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("oreb")}</div>
		},
	},
	{
		accessorKey: "dreb",
		header: () => <div className="text-center">DREB</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("dreb")}</div>
		},
	},
	{
		accessorKey: "pf",
		header: () => <div className="text-center">PF</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("pf")}</div>
		},
	},
	{
		accessorKey: "plusMinus",
		header: () => <div className="text-center">+/-</div>,
		cell: ({ row }) => {
			const plusMinus = row.getValue("plusMinus") as number
			return (
				<div className={`text-center`}>
					{plusMinus >= 0 ? "+" : ""}{plusMinus}
				</div>
			)
		},
	},
]
