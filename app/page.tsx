import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<main className="text-center space-y-16 mt-16 md:mt-28">
			<div className="space-y-8">
				<h1 className="text-6xl md:text-7xl font-bold">
					Beat the Books with{" "}
					<span className="underline">Data-Driven</span>{" "}
					Player Prop Analysis
				</h1>
				<p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
					Compare player performances against sportsbook lines with advanced filters and analytics.
					Find value, spot trends, and make smarter betting decisions.
				</p>
				<Button asChild size="lg">
					<Link href="/dashboard">
						Get Started
					</Link>
				</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="bg-gray-900/80 backdrop-blur-sm rounded-lg tron-border p-6 text-center">
					<div className="text-4xl mb-4">📊</div>
					<h2 className="text-xl font-semibold text-white mb-2">Performance Analytics</h2>
					<p className="text-gray-400">Deep dive into player stats and historical performance against prop lines</p>
				</div>
				<div className="bg-gray-900/80 backdrop-blur-sm rounded-lg tron-border p-6 text-center">
					<div className="text-4xl mb-4">🔍</div>
					<h2 className="text-xl font-semibold text-white mb-2">Advanced Filters</h2>
					<p className="text-gray-400">Filter by matchups, recent form, home/away splits, and more</p>
				</div>
				<div className="bg-gray-900/80 backdrop-blur-sm rounded-lg tron-border p-6 text-center">
					<div className="text-4xl mb-4">💎</div>
					<h2 className="text-xl font-semibold text-white mb-2">Find Value</h2>
					<p className="text-gray-400">Identify mispriced props and betting opportunities with confidence</p>
				</div>
			</div>
		</main>
	);
}
