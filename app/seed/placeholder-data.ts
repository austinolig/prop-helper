import { GameLog, GameLogData } from "../types";
import { nikolaJokicData } from "./jokic-data";
import { lebronJamesData } from "./lebron-data";
import { stephenCurryData } from "./curry-data";
import { vinceCarterData } from "./carter-data";
import { shaiGilgeousAlexanderData } from "./sga-data";
import { giannisAntetokounmpoData } from "./giannis-data";
import { lukaDoncicData } from "./luka-data";

interface GameLogObject {
	[key: string]: string | number;
}

export function buildGameLog(data: GameLogData[]) {
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
		const gameLog: GameLogObject = {};

		headers.forEach((header, index) => {
			gameLog[header] = game[index];
		});

		return gameLog as unknown as GameLog;
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
	{
		"id": 1628983,
		"full_name": "Shai Gilgeous-Alexander",
		"first_name": "Shai",
		"last_name": "Gilgeous-Alexander",
		"is_active": true
	},
	{
		"id": 203507,
		"full_name": "Giannis Antetokounmpo",
		"first_name": "Giannis",
		"last_name": "Antetokounmpo",
		"is_active": true
	},
	{
		"id": 1629029,
		"full_name": "Luka Dončić",
		"first_name": "Luka",
		"last_name": "Dončić",
		"is_active": true
	},
];

const gamelogs = [
	...buildGameLog(lebronJamesData),
	...buildGameLog(nikolaJokicData),
	...buildGameLog(stephenCurryData),
	...buildGameLog(vinceCarterData),
	...buildGameLog(shaiGilgeousAlexanderData),
	...buildGameLog(giannisAntetokounmpoData),
	...buildGameLog(lukaDoncicData)
];

export { players, gamelogs };
