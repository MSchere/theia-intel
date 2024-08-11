"use client";

import { ChartData } from "$src/lib/types/chart.types";
import { useTheme } from "next-themes";
import ApexChart from "react-apexcharts";
import { Card, CardContent, CardTitle } from "../ui/card";

export default function CandleStickChart(props: { data: ChartData[]; title: string; description?: string }) {
    const theme = useTheme();
    const series = [
        {
            data: props.data,
        },
    ];

    const options: ApexCharts.ApexOptions = {
        title: {
            align: "left",
        },
        chart: {
            background: "var(--background)",
        },
        theme: {
            mode: theme.theme === "dark" ? "dark" : "light",
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <Card className="items-center py-4 pl-2 pr-4">
            <CardTitle className="text-lg pl-4">{props.title}</CardTitle>
            <CardContent className="flex flex-col items-center">
                <ApexChart
                    options={options}
                    series={series}
                    className="w-full bg-background"
                    type="candlestick"
                    height={350}
                />
                {props.description ? <span className="text-sm">{props.description}</span> : null}
            </CardContent>
        </Card>
    );
}
