import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col justify-center max-w-7xl mx-auto px-6 py-32">
			<div className="text-center">
				<h1 className="text-6xl md:text-7xl font-bold text-white mb-8">
					Prop<span className="text-cyan-400">Helper</span>
				</h1>
				<p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto leading-relaxed">
					Beat the Books with Data-Driven Player Prop Analysis
				</p>
				<p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
					Compare player performances against sportsbook lines with advanced filters and analytics.
					Find value, spot trends, and make smarter betting decisions.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Link
						className="bg-cyan-600 hover:bg-cyan-500 text-black font-semibold px-8 py-3 rounded-none tron-glow transition-all duration-300"
						href="/dashboard"
					>
						Get Started
					</Link>
				</div>
			</div>
			<div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="bg-gray-900/80 backdrop-blur-sm rounded-none tron-border p-6 text-center">
					<div className="text-4xl mb-4 text-cyan-400">📊</div>
					<h2 className="text-xl font-semibold text-white mb-2">Performance Analytics</h2>
					<p className="text-gray-400">Deep dive into player stats and historical performance against prop lines</p>
				</div>
				<div className="bg-gray-900/80 backdrop-blur-sm rounded-none tron-border p-6 text-center">
					<div className="text-4xl mb-4 text-cyan-400">🔍</div>
					<h2 className="text-xl font-semibold text-white mb-2">Advanced Filters</h2>
					<p className="text-gray-400">Filter by matchups, recent form, home/away splits, and more</p>
				</div>
				<div className="bg-gray-900/80 backdrop-blur-sm rounded-none tron-border p-6 text-center">
					<div className="text-4xl mb-4 text-cyan-400">💎</div>
					<h2 className="text-xl font-semibold text-white mb-2">Find Value</h2>
					<p className="text-gray-400">Identify mispriced props and betting opportunities with confidence</p>
				</div>
			</div>
		</div>
	);
}
