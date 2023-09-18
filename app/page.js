import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), { ssr: false });

export default function Home() {
	return (
		<main className="w-full h-full">
			<LeafletMap />
		</main>
	)
}
