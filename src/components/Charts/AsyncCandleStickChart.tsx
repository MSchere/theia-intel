import { TimeSeriesFunction } from "$src/lib/types/stock.types";
import { getStockDataAction } from "$src/server/stocks/getStock";
import { Card, CardContent, CardTitle } from "../ui/card";
import ErrorMessage from "../Utils/ErrorMessage";
import Chart from "./Chart";

export default async function AsyncCandleStickChart(props: { ticker: string; title: string; description?: string }) {
    const res = await getStockDataAction(props.ticker, TimeSeriesFunction.TIME_SERIES_DAILY);
    if (!res.success) {
        return <ErrorMessage>{res.errorMessage}</ErrorMessage>;
    }
    const series = [
        {
            data: res.data,
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
            mode: "dark",
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
                <Chart series={series} options={options} type="candlestick" />
                {props.description ? <span className="text-sm">{props.description}</span> : null}
            </CardContent>
        </Card>
    );
}
