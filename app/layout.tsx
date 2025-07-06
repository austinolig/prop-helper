import { Kanit } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
			<body className={`max-w-[1200px] mx-auto p-4 antialiased ${kanit.className}`}>
				<Link href="/">
					<h1 className="text-4xl font-bold text-white mb-4">
						Prop<span className="text-primary">Helper</span>
					</h1>
				</Link>
				{children}
			</body>
		</html>
	);
}
