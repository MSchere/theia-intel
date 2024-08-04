import { z } from "zod";
import {
  StockFunction,
  StockMeta,
  StockTimeSeries,
  StockTimeSeries5MinResponse,
  StockTimeSeriesDailyResponse,
  StockTimeSeriesMonthlyResponse,
  StockTimeSeriesWeeklyResponse,
} from "../types/stock.types";

export const StockMetaSchema: z.ZodSchema<StockMeta> = z.object({
  "1. Information": z.string(),
  "2. Symbol": z.string(),
  "3. Last Refreshed": z.string(),
  "4. Interval": z.string(),
  "5. Output Size": z.string(),
  "6. Time Zone": z.string(),
});

export const StockTimeSeriesSchema: z.ZodSchema<StockTimeSeries> = z.record(
  z.object({
    "1. open": z.string(),
    "2. high": z.string(),
    "3. low": z.string(),
    "4. close": z.string(),
    "5. volume": z.string(),
  }),
);

export const StockTimeSeries5MinResponseSchema: z.ZodSchema<StockTimeSeries5MinResponse> =
  z.object({
    "Meta Data": StockMetaSchema,
    "Time Series (5min)": StockTimeSeriesSchema,
  });

export const StockTimeSeriesDailyResponseSchema: z.ZodSchema<StockTimeSeriesDailyResponse> =
  z.object({
    "Meta Data": StockMetaSchema,
    "Time Series (Daily)": StockTimeSeriesSchema,
  });

export const StockTimeSeriesWeeklyResponseSchema: z.ZodSchema<StockTimeSeriesWeeklyResponse> =
  z.object({
    "Meta Data": StockMetaSchema,
    "Weekly Time Series": StockTimeSeriesSchema,
  });

export const StockTimeSeriesMonthlyResponseSchema: z.ZodSchema<StockTimeSeriesMonthlyResponse> =
  z.object({
    "Meta Data": StockMetaSchema,
    "Monthly Time Series": StockTimeSeriesSchema,
  });

export const StockSchemaMap = {
  [StockFunction.TIME_SERIES_INTRADAY]: StockTimeSeries5MinResponseSchema,
  [StockFunction.TIME_SERIES_DAILY]: StockTimeSeriesDailyResponseSchema,
  [StockFunction.TIME_SERIES_WEEKLY]: StockTimeSeriesWeeklyResponseSchema,
  [StockFunction.TIME_SERIES_MONTHLY]: StockTimeSeriesMonthlyResponseSchema,
};
