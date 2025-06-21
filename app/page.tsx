import ClientAnalyzer from './components/ClientAnalyzer';
import {
	// fetchNBAPlayerData,
	getMockPlayerData
} from './lib/data';

export default async function Home() {
	const playerData = await getMockPlayerData();

	// const playerCareer = await fetchNBAPlayerData();
	// console.log('Player Career:', playerCareer);

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
				<ClientAnalyzer playerData={playerData} />
			</div>
		</div>
	);
}
