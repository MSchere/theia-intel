"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";

type ChartType =
    | "line"
    | "area"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap"
    | undefined;

export default function Chart(props: {
    options: ApexCharts.ApexOptions;
    series: ApexAxisChartSeries;
    type: ChartType;
}) {
    const { theme } = useTheme();
    const [chartOptions, setChartOptions] = useState(props.options);

    useEffect(() => {
        setChartOptions({
            ...props.options,
            theme: {
                mode: theme === "dark" ? "dark" : "light",
            },
        });
    }, [theme]);

    return (
        <ApexChart
            options={chartOptions}
            series={props.series}
            className="w-full bg-background"
            type={props.type}
            height={350}
        />
    );
}
