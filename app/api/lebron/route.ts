import { lebronData } from "@/app/lib/lebron-data"

export async function GET() {
	return new Response(JSON.stringify(lebronData), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
