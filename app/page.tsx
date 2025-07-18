import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartNoAxesCombined, Gem, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<main className="text-center space-y-16 mt-16 md:mt-28">
			<div className="space-y-6 px-3">
				<h1 className="text-5xl md:text-6xl font-bold text-shadow-lg">
					<span className="md:block">Beat the Books</span>{" "}
					With Prop Analysis
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
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				<Card>
					<CardHeader>
						<ChartNoAxesCombined className="shrink-0 text-muted-foreground" />
						<div className="text-left flex flex-col gap-1.5">
							<CardTitle>
								Performance Analytics
							</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="text-left text-muted-foreground">
						Analyze player performance against prop lines with detailed stats and trends
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<SlidersHorizontal className="shrink-0 text-muted-foreground" />
						<div className="text-left flex flex-col gap-1.5">
							<CardTitle>
								Advanced Filters
							</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="text-left text-muted-foreground">
						Filter by player, team, game, and more to find the best prop bets
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<Gem className="shrink-0 text-muted-foreground" />
						<div className="text-left flex flex-col gap-1.5">
							<CardTitle>
								Value Insights
							</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="text-left text-muted-foreground">
						Spot trends and identify value bets with comprehensive analytics
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
