import type { Metadata } from "next";
import "./globals.css";

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
			<body className={`antialiased`}>
				<main className="min-h-screen bg-black tron-grid">
					{children}
				</main>
			</body>
		</html>
	);
}
