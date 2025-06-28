import { PlayerGameLog, PlayerGameLogData } from "../types";
import { nikolaJokicData } from "./jokic-data";
import { lebronJamesData } from "./lebron-data";
import { stephenCurryData } from "./curry-data";
import { vinceCarterData } from "./carter-data";

interface GameLog {
	[key: string]: string | number;
}

function buildGameLog(data: PlayerGameLogData[]) {
	const headers = [
		"seasonId",
		"playerId",
		"gameId",
		"gameDate",
		"matchup",
		"wl",
		"min",
		"fgm",
		"fga",
		"fgPct",
		"fg3m",
		"fg3a",
		"fg3Pct",
		"ftm",
		"fta",
		"ftPct",
		"oreb",
		"dreb",
		"reb",
		"ast",
		"stl",
		"blk",
		"tov",
		"pf",
		"pts",
		"plusMinus",
		"videoAvailable"
	]

	return data.map(game => {
		const gameLog: GameLog = {};

		headers.forEach((header, index) => {
			gameLog[header] = game[index];
		});

		return gameLog as unknown as PlayerGameLog;
	});
}

const players = [
	{
		"id": 2544,
		"full_name": "LeBron James",
		"first_name": "LeBron",
		"last_name": "James",
		"is_active": true
	},
	{
		"id": 203999,
		"full_name": "Nikola Jokić",
		"first_name": "Nikola",
		"last_name": "Jokić",
		"is_active": true
	},
	{
		"id": 201939,
		"full_name": "Stephen Curry",
		"first_name": "Stephen",
		"last_name": "Curry",
		"is_active": true
	},
	{
		"id": 1713,
		"full_name": "Vince Carter",
		"first_name": "Vince",
		"last_name": "Carter",
		"is_active": false
	},
	// {
	// 	"id": 947,
	// 	"full_name": "Allen Iverson",
	// 	"first_name": "Allen",
	// 	"last_name": "Iverson",
	// 	"is_active": false
	// },
	// {
	// 	"id": 1628983,
	// 	"full_name": "Shai Gilgeous-Alexander",
	// 	"first_name": "Shai",
	// 	"last_name": "Gilgeous-Alexander",
	// 	"is_active": true
	// },
	// {
	// 	"id": 467,
	// 	"full_name": "Jason Kidd",
	// 	"first_name": "Jason",
	// 	"last_name": "Kidd",
	// 	"is_active": false
	// },
	// {
	// 	"id": 203507,
	// 	"full_name": "Giannis Antetokounmpo",
	// 	"first_name": "Giannis",
	// 	"last_name": "Antetokounmpo",
	// 	"is_active": true
	// },
	// {
	// 	"id": 202695,
	// 	"full_name": "Kawhi Leonard",
	// 	"first_name": "Kawhi",
	// 	"last_name": "Leonard",
	// 	"is_active": true
	// },
	// {
	// 	"id": 1629029,
	// 	"full_name": "Luka Dončić",
	// 	"first_name": "Luka",
	// 	"last_name": "Dončić",
	// 	"is_active": true
	// },
];

const gamelogs = [
	...buildGameLog(lebronJamesData),
	...buildGameLog(nikolaJokicData),
	...buildGameLog(stephenCurryData),
	...buildGameLog(vinceCarterData),
	// buildGameLog(allenIversonData),
	// buildGameLog(shaiGilgeousAlexanderData),
	// buildGameLog(jasonKiddData),
	// buildGameLog(giannisAntetokounmpoData),
	// buildGameLog(kawhiLeonardData),
	// buildGameLog(lukaDoncicData)
];

export { players, gamelogs };
