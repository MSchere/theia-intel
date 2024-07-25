"use client";

import { BarChart, File, Globe, Map, Newspaper, PieChart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "../ui/card";
import MainSidebarButton from "./Buttons/MainSidebarButton";
export default function MainSidebar() {
    // const { status, data } = useSession({ required: true });
    const currentRoute = usePathname().split("/")[1] ?? "";
    return (
        <main className="z-10 hidden h-svh items-center justify-between px-4 py-4 pr-0 lg:flex">
            <Card className="gap hidden h-full w-full flex-col flex-wrap gap-8 px-4 py-4 lg:flex lg:w-56">
                <div className="flex items-center justify-center">
                    <Link href="/">
                        {/* <Image src={""} alt="Theia intel" className="h-[80px] w-full" /> */}
                        <h1 className="text-2xl">Theia Intel</h1>
                    </Link>
                </div>
                <div className="flex flex-col items-start justify-start gap-4">
                    <h6 className="o-underline block pt-1 text-xs font-bold text-foreground lg:min-w-full">
                        Defense Intel
                    </h6>
                    <div className="flex w-full flex-col gap-4">
                        <MainSidebarButton route="/dashboard" title="Dashboard" active={currentRoute === "dashboard"}>
                            <PieChart className="h-6 w-6" />
                        </MainSidebarButton>
                        <MainSidebarButton route="/map" title="Live Map" active={currentRoute === "map"}>
                            <Map className="h-6 w-6" />
                        </MainSidebarButton>
                        <MainSidebarButton route="/news" title="News" active={currentRoute === "news"}>
                            <Newspaper className="h-6 w-6" />
                        </MainSidebarButton>
                        <MainSidebarButton route="/reports" title="Reports" active={currentRoute === "reports"}>
                            <File className="h-6 w-6" />
                        </MainSidebarButton>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-4">
                    <h6 className="o-underline block pt-1 text-xs font-bold text-foreground lg:min-w-full">
                        Defense Markets
                    </h6>
                    <div className="flex w-full flex-col gap-4">
                        <MainSidebarButton route="/markets" title="Markets" active={currentRoute === "markets"}>
                            <Globe className="h-6 w-6" />
                        </MainSidebarButton>
                        <MainSidebarButton route="/stocks" title="Stocks" active={currentRoute === "stocks"}>
                            <BarChart className="h-6 w-6" />
                        </MainSidebarButton>
                    </div>
                </div>
            </Card>
        </main>
    );
}
