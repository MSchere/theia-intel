import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChartData } from "../types/chart.types";
import {
    TimeSeries5MinResponse,
    TimeSeriesDailyResponse,
    TimeSeriesData,
    TimeSeriesMonthlyResponse,
    TimeSeriesWeeklyResponse,
} from "../types/stock.types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function parseStockData<
    T extends TimeSeries5MinResponse | TimeSeriesDailyResponse | TimeSeriesWeeklyResponse | TimeSeriesMonthlyResponse,
>(stockData: T): ChartData[] {
    const timeSeriesKey = Object.keys(stockData)[1]!;
    const timeSeries = stockData[timeSeriesKey as keyof T]!;
    const formattedData = Object.entries(timeSeries).map(([date, data]) => {
        const timeSeriesData = data as TimeSeriesData;
        return {
            x: new Date(date),
            y: [
                parseFloat(timeSeriesData["1. open"]),
                parseFloat(timeSeriesData["2. high"]),
                parseFloat(timeSeriesData["3. low"]),
                parseFloat(timeSeriesData["4. close"]),
            ],
        } as ChartData;
    });
    return formattedData;
}
