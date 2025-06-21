from nba_api.stats.endpoints import playercareerstats
from http.server import BaseHTTPRequestHandler
 
class handler(BaseHTTPRequestHandler):
 
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()

        # Nikola Jokić
        career = playercareerstats.PlayerCareerStats(player_id='203999') 
        self.wfile.write(career.get_json().encode('utf-8'))

        return 
