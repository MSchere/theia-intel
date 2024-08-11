"use server";

import { env } from "$src/env";
import { StockSchemaMap } from "$src/lib/schemas/api.schemas";
import { ActionErrors, ActionResponse } from "$src/lib/types/action.types";
import { ChartData } from "$src/lib/types/chart.types";
import { Interval, TimeSeriesDataMap, TimeSeriesFunction } from "$src/lib/types/stock.types";
import { parseStockData } from "$src/lib/utils/utils";

export async function getStockDataAction(
    symbol: string,
    stockFunction: TimeSeriesFunction,
    interval?: Interval,
): Promise<ActionResponse<ChartData[]>> {
    try {
        const url = new URL(`https://www.alphavantage.co/query`);
        url.searchParams.append("function", stockFunction);
        url.searchParams.append("symbol", symbol);
        interval ? url.searchParams.append("interval", interval) : null;
        url.searchParams.append("apikey", env.ALPHA_VANTAGE_API_KEY);
        const res = await fetch(url, {
            headers: {
                "User-Agent": "request",
                acccept: "application/json",
            },
        });
        const schema = StockSchemaMap[stockFunction];
        const stockData = schema.parse(await res.json());
        const processedStockdata = parseStockData<TimeSeriesDataMap[typeof stockFunction]>(stockData);
        return {
            success: true,
            data: processedStockdata,
        };
    } catch (err) {
        console.error("[Error] getStockAction =>", JSON.stringify(err));
        return {
            success: false,
            errorCode: ActionErrors.INTERNAL_SERVER_ERROR,
            errorMessage: `There was an error fetching the stock data for ${symbol}`,
        };
    }
}
