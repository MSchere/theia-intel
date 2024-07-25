"use client";
import { Tabs, TabsList, TabsTrigger } from "$components/ui/tabs";
import { Card, CardTitle } from "$src/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MapPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const regions = ["ukraine", "usa", "israelpalestine", "caucasus"];
    const region = searchParams.get("region");
    const [mapRegion, setMapRegion] = useState(regions.includes(`${region}`) ? `${region}` : "ukraine");
    function updateRegion(region: string) {
        setMapRegion(region);
        router.replace(`/map?region=${region}`);
    }
    return (
        <Card className="flex relative h-full w-full items-center justify-center">
            <Tabs className="h-full w-full" defaultValue={mapRegion} onValueChange={(val) => updateRegion(val)}>
                <div className="absolute top-0 left-0 w-full h-[95px] z-10 bg-background rounded-t-lg">
                    <div className="px-8 py-6">
                        <CardTitle>Live Global Conflict Map</CardTitle>
                    </div>
                    <TabsList className="grid w-full grid-cols-4 rounded-b-none">
                        <TabsTrigger value="ukraine">Ukraine</TabsTrigger>
                        <TabsTrigger value="usa">USA</TabsTrigger>
                        <TabsTrigger value="israelpalestine">Israel</TabsTrigger>
                        <TabsTrigger value="caucasus">Caucasus</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value={mapRegion} className="h-full w-full rounded-lg">
                    <iframe className="h-full w-full rounded-lg" src={`https://${mapRegion}.liveuamap.com`}></iframe>
                </TabsContent>
                <div className="absolute flex items-center justify-center bg-background bottom-0 right-0 h-[52px] w-[395px] rounded-t-lg rounded-br-lg">
                    <p className="text-sm">
                        Powered by{" "}
                        <a href="https://liveuamap.com/about" target="_blank">
                            Liveuamap
                        </a>
                    </p>
                </div>
            </Tabs>
        </Card>
    );
}
