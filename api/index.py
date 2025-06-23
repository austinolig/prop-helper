from fastapi import FastAPI

app = FastAPI()

@app.get("/api")
def test_response(): 
    return {"test": "response"}

@app.get("/api/stats/{player_id}")
def read_player(player_id: int, q: str | None = None):
    return {"playerId": player_id, "q": q}
