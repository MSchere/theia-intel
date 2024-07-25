import { Card } from "$src/components/ui/card";

export default function MapPage() {
    return (
        <Card className="flex relative h-full w-full items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-[95px] z-10 bg-background py-8 px-8 border-b rounded-t-lg">
                <h1 className="text-xl font-bold">Live War Map</h1>
            </div>
            <iframe className="h-full w-full rounded-lg" src="https://liveuamap.com"></iframe>
        </Card>
    );
}
