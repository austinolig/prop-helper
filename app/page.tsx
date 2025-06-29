import { fetchGamelogsByPlayerId } from './lib/data';

export default async function Home() {
	const gamelog = await fetchGamelogsByPlayerId(1713);
	console.log(gamelog);
	return (
		<main>
			<h1>Prop Helper</h1>
		</main>
	);
}
