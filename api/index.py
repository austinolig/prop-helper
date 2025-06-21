from flask import Flask
from nba_api.stats.endpoints import playercareerstats

app = Flask(__name__)

@app.route('/api/player')
def home():
    # Nikola Jokić
    career = playercareerstats.PlayerCareerStats(player_id='203999') 
    # # pandas data frames (optional: pip install pandas)
    # career.get_data_frames()[0]
    # # json
    #
    # # dictionary
    # career.get_dict()

    return career.get_json()

@app.route('/api/about')
def about():
    return 'About'
