import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), { ssr: false });

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen p-24">
			<LeafletMap />
		</main>
	)
}
