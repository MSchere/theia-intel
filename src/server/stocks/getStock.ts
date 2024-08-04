"use server";

import { env } from "$src/env";
import { StockSchemaMap } from "$src/lib/schemas/api.schemas";
import {
  ActionErrors,
  ActionResponse,
  ActionResult,
} from "$src/lib/types/action.types";
import {
  StockDataMap,
  StockFunction,
  StockInterval,
} from "$src/lib/types/stock.types";

export async function getStockAction<T extends StockFunction>(
  symbol: string,
  stockFunction: T,
  interval?: StockInterval,
): Promise<ActionResponse<StockDataMap[T]>> {
  try {
    const url = new URL(`https://www.alphavantage.co`);
    url.searchParams.append("function", stockFunction);
    url.searchParams.append("symbol", symbol);
    interval ? url.searchParams.append("interval", interval) : null;
    url.searchParams.append("apikey", env.ALPHA_VANTAGE_API_KEY);
    const res = await fetch(url);
    const schema = StockSchemaMap[stockFunction];
    const stockData = schema.parse(await res.json());
    return {
      success: true,
      data: stockData as StockDataMap[T],
    };
  } catch (err) {
    console.error("[Error getStockAction] =>", JSON.stringify(err));
    return {
      success: false,
      errorCode: ActionErrors.INTERNAL_SERVER_ERROR,
      errorMessage: "There was an error while fetching the stock data",
    };
  }
}
