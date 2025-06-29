import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Prop Helper",
	description: "Hit rates and value calculator for player props",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
