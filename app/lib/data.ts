import postgres from 'postgres';
import { GameLog, PlayersTable } from '../types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchPlayers(): Promise<PlayersTable[]> {
	try {
		console.log('Fetching players...');
		const data = await sql<PlayersTable[]>`SELECT * FROM players ORDER BY full_name ASC`;
		console.log('Players fetch completed.');
		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch players.');
	}
}

export async function fetchPlayerById(playerId: number): Promise<PlayersTable | null> {
	try {
		console.log(`Fetching player ${playerId}...`);
		const data = await sql<PlayersTable[]>`SELECT * FROM players WHERE id = ${playerId}`;
		console.log('Player fetch completed.');
		return data.length > 0 ? data[0] : null;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch player.');
	}
}

export async function fetchGamelogsByPlayerId(playerId: number): Promise<GameLog[]> {
	try {
		console.log(`Fetching gamelogs for player ${playerId}...`);
		const data = await sql<GameLog[]>`
			SELECT 
				season_id as "seasonId",
				player_id as "playerId", 
				game_id as "gameId",
				game_date as "gameDate",
				matchup,
				wl,
				min,
				fgm,
				fga,
				fg_pct as "fgPct",
				fg3m,
				fg3a,
				fg3_pct as "fg3Pct",
				ftm,
				fta,
				ft_pct as "ftPct",
				oreb,
				dreb,
				reb,
				ast,
				stl,
				blk,
				tov,
				pf,
				pts,
				plus_minus as "plusMinus",
				video_available as "videoAvailable"
			FROM gamelogs 
			WHERE player_id = ${playerId}
			ORDER BY game_date DESC
		`;
		console.log('Gamelogs fetch completed.');
		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch gamelogs.');
	}
}

export async function fetchAllGamelogs(): Promise<GameLog[]> {
	try {
		console.log('Fetching all gamelogs...');
		const data = await sql<GameLog[]>`
			SELECT 
				season_id as "seasonId",
				player_id as "playerId", 
				game_id as "gameId",
				game_date as "gameDate",
				matchup,
				wl,
				min,
				fgm,
				fga,
				fg_pct as "fgPct",
				fg3m,
				fg3a,
				fg3_pct as "fg3Pct",
				ftm,
				fta,
				ft_pct as "ftPct",
				oreb,
				dreb,
				reb,
				ast,
				stl,
				blk,
				tov,
				pf,
				pts,
				plus_minus as "plusMinus",
				video_available as "videoAvailable"
			FROM gamelogs 
			ORDER BY game_date DESC
		`;
		console.log('All gamelogs fetch completed.');
		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch all gamelogs.');
	}
}
