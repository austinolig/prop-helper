import ClientAnalyzer from './components/ClientAnalyzer';
import { gamelogs } from './lib/placeholder-data';

export default async function Home() {
	console.log('gamelogs:', gamelogs);
	const vinceCarterGameLogs = gamelogs.filter(gamelog => gamelog.playerId === 1713);

	return (
		<div className="min-h-screen p-4 sm:p-8">
			<div className="max-w-7xl mx-auto">
				<header className="mb-8">
					<h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
						NBA Player Stat Analyzer
					</h1>
					<p className="text-foreground/70">
						Analyze player performance and compare statistics against custom thresholds
					</p>
				</header>
				<ClientAnalyzer playerGameLog={vinceCarterGameLogs} />
			</div>
		</div>
	);
}
