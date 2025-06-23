from fastapi import FastAPI
from nba_api.stats.endpoints import playergamelog

app = FastAPI()

@app.get("/api/stats/{player_id}")
def read_player(player_id: str, q: str | None = None):
    print(f"player_id: {player_id}, q: {q}")
    player_game_log = playergamelog.PlayerGameLog(player_id=player_id)
    return player_game_log
