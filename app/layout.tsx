import { Kanit } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { SearchCombobox } from "@/search-combobox";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";

const kanit = Kanit({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
	title: { template: "%s | PropHelper", default: "PropHelper" },
	description: "Hit rates and value calculator for player props",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`sm:mx-3 my-6 antialiased ${kanit.className}`}>
				<header className="max-w-[1200px] mx-auto px-3 sm:px-0 mb-6 flex items-center justify-between">
					<Link href="/" className="relative">
						<p className="text-4xl absolute -z-1 top-0 left-0 font-bold text-shadow-lg text-transparent">
							PropHelper
						</p>
						<h1 className="text-4xl font-bold">
							Prop<span className="text-transparent bg-primary bg-linear-to-b/oklch from-foreground/5 to-primary bg-clip-text inline-block">Helper</span>
						</h1>
					</Link>
					<SearchCombobox />
				</header>
				<Suspense fallback={<main className="flex justify-center mt-16 md:mt-28"><LoaderCircle className="animate-spin" /></main>}>
					{children}
				</Suspense>
			</body>
		</html>
	);
}
