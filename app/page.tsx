import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col justify-center max-w-7xl mx-auto px-6 py-32">
			<div className="text-center">
				<h1 className="text-6xl md:text-7xl font-bold text-white mb-8">
					Prop<span className="text-blue-400">Helper</span>
				</h1>
				<p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-4xl mx-auto leading-relaxed">
					Beat the Books with Data-Driven Player Prop Analysis
				</p>
				<p className="text-lg text-blue-200 mb-12 max-w-3xl mx-auto">
					Compare player performances against sportsbook lines with advanced filters and analytics.
					Find value, spot trends, and make smarter betting decisions.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Link
						className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
						href="/dashboard"
					>
						Get Started
					</Link>
				</div>
			</div>
			<div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
					<div className="text-4xl mb-4">📊</div>
					<h2 className="text-xl font-semibold text-white mb-2">Performance Analytics</h2>
					<p className="text-blue-200">Deep dive into player stats and historical performance against prop lines</p>
				</div>
				<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
					<div className="text-4xl mb-4">🔍</div>
					<h2 className="text-xl font-semibold text-white mb-2">Advanced Filters</h2>
					<p className="text-blue-200">Filter by matchups, recent form, home/away splits, and more</p>
				</div>
				<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
					<div className="text-4xl mb-4">💎</div>
					<h2 className="text-xl font-semibold text-white mb-2">Find Value</h2>
					<p className="text-blue-200">Identify mispriced props and betting opportunities with confidence</p>
				</div>
			</div>
		</div>
	);
}
