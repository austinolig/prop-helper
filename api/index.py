from fastapi import FastAPI
from nba_api.stats.endpoints import playergamelog

app = FastAPI()

# @app.get("/api/test")
# def read_test():
#     return {"test": "response"}

@app.get("/api/stats/{player_id}")
def read_player(player_id: str, q: str | None = None):
    player_game_log = playergamelog.PlayerGameLog(player_id=player_id)
    return player_game_log

@app.get("/api/stats/")
def read_lebron():
    player_game_log = playergamelog.PlayerGameLog(player_id="2544")  # Default player ID for LeBron James
    return player_game_log
