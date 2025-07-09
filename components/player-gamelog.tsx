import { GameLog } from "@/app/types";

export default function PlayerGameLog({ gamelogs }: { gamelogs: GameLog[] }) {
	console.log("PlayerGameLog", gamelogs);
	return (
		<div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
