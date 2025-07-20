import {
	Tabs,
	TabsList,
	TabsTrigger
} from "@/components/ui/tabs"

export function RangeTabs() {
	return (
		<Tabs defaultValue="range" className="w-full">
			<TabsList className="justify-between">
				<TabsTrigger value="all" className="w-full">
					All
				</TabsTrigger>
				<TabsTrigger value="l5" className="w-full">
					L5
				</TabsTrigger>
				<TabsTrigger value="l10" className="w-full">
					L10
				</TabsTrigger>
				<TabsTrigger value="l20" className="w-full">
					L20
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
