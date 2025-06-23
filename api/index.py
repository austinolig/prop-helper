from typing import Union
from fastapi import FastAPI

app = FastAPI()

# route to confirm vercel funcion is working
@app.get("/api")
def read_root(): 
    return {"Hello": "World"}

@app.get("/api/stats/{player_id}")
def read_player(player_id: int, q: Union[str, None] = None):
    return {"playerId": player_id, "q": q}
