import postgres from "postgres";
import { players, gamelogs } from "./placeholder-data";
import { GameLog, PlayersTable } from "@/types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedPlayers() {
	await sql`
		CREATE TABLE IF NOT EXISTS players (
			id INTEGER PRIMARY KEY,
			full_name VARCHAR(255) NOT NULL,
			first_name VARCHAR(255) NOT NULL,
			last_name VARCHAR(255) NOT NULL,
			is_active BOOLEAN NOT NULL
		);
	`;

	console.log(`Starting to insert ${players.length} players...`);

	const insertedPlayers = await Promise.all(
		players.map((player) => sql<PlayersTable[]>`
			INSERT INTO players (
				id,
				full_name,
				first_name,
				last_name,
				is_active
			)
			VALUES (
				${player.id},
				${player.full_name},
				${player.first_name},
				${player.last_name},
				${player.is_active}
			)
			ON CONFLICT (id) DO NOTHING;
		  `,
		),
	);

	console.log('Players insertion completed.');
	return insertedPlayers;
}

async function seedGamelogs() {
	await sql`
		CREATE TABLE IF NOT EXISTS gamelogs (
			game_id VARCHAR(20) NOT NULL PRIMARY KEY,
			season_id VARCHAR(10) NOT NULL,
			player_id INTEGER NOT NULL,
			game_date VARCHAR(20) NOT NULL,
			matchup VARCHAR(20) NOT NULL,
			wl VARCHAR(1) NOT NULL,
			min INTEGER,
			fgm INTEGER,
			fga INTEGER,
			fg_pct DECIMAL(5,3),
			fg3m INTEGER,
			fg3a INTEGER,
			fg3_pct DECIMAL(5,3),
			ftm INTEGER,
			fta INTEGER,
			ft_pct DECIMAL(5,3),
			oreb INTEGER,
			dreb INTEGER,
			reb INTEGER,
			ast INTEGER,
			stl INTEGER,
			blk INTEGER,
			tov INTEGER,
			pf INTEGER,
			pts INTEGER,
			plus_minus INTEGER,
			video_available INTEGER,
			FOREIGN KEY (player_id) REFERENCES players(id),
			UNIQUE (game_id)
		);
	`;

	console.log(`Starting to insert ${gamelogs.length} gamelogs...`);

	const insertedGamelogs = await Promise.all(
		gamelogs.map(
			(gamelog, index) => {
				if (index % 100 === 0) {
					console.log(`Processing gamelog ${index}/${gamelogs.length}`);
				}
				return sql<GameLog[]>`
					INSERT INTO gamelogs (
						game_id,
						season_id,
						player_id,
						game_date,
						matchup,
						wl,
						min,
						fgm,
						fga,
						fg_pct,
						fg3m,
						fg3a,
						fg3_pct,
						ftm,
						fta,
						ft_pct,
						oreb,
						dreb,
						reb,
						ast,
						stl,
						blk,
						tov,
						pf,
						pts,
						plus_minus,
						video_available
					)
					VALUES (
						${gamelog.gameId},
						${gamelog.seasonId},
						${gamelog.playerId},
						${gamelog.gameDate},
						${gamelog.matchup},
						${gamelog.wl},
						${gamelog.min},
						${gamelog.fgm},
						${gamelog.fga},
						${gamelog.fgPct},
						${gamelog.fg3m},
						${gamelog.fg3a},
						${gamelog.fg3Pct},
						${gamelog.ftm},
						${gamelog.fta},
						${gamelog.ftPct},
						${gamelog.oreb},
						${gamelog.dreb},
						${gamelog.reb},
						${gamelog.ast},
						${gamelog.stl},
						${gamelog.blk},
						${gamelog.tov},
						${gamelog.pf},
						${gamelog.pts},
						${gamelog.plusMinus},
						${gamelog.videoAvailable}
					)
					ON CONFLICT (game_id) DO NOTHING;
				`;
			}
		),
	);

	console.log('Gamelogs insertion completed.');
	return insertedGamelogs;
}

export async function GET() {
	try {
		await sql.begin(() => [
			seedPlayers(),
			seedGamelogs()
		]);

		return Response.json({ message: 'Database seeded successfully' });
	} catch (error) {
		console.error('Seeding error:', error);
		return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
	}
}

