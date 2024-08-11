import { z } from "zod";
import { TimeSeriesFunction } from "../types/stock.types";

export const TimeSeriesIntraDayMetaSchema = z.object({
    "1. Information": z.string(),
    "2. Symbol": z.string(),
    "3. Last Refreshed": z.string(),
    "4. Interval": z.string(),
    "5. Output Size": z.string(),
    "6. Time Zone": z.string().optional(),
});

export const TimeSeriesDailyMetaSchema = z.object({
    "1. Information": z.string(),
    "2. Symbol": z.string(),
    "3. Last Refreshed": z.string(),
    "4. Output Size": z.string(),
    "5. Time Zone": z.string(),
});

export const TimeSeriesMetaSchema = z.object({
    "1. Information": z.string(),
    "2. Symbol": z.string(),
    "3. Last Refreshed": z.string(),
    "4. Time Zone": z.string(),
});

export const TimeSeriesDataSchema = z.object({
    "1. open": z.string(),
    "2. high": z.string(),
    "3. low": z.string(),
    "4. close": z.string(),
    "5. volume": z.string(),
});

export const TimeSeriesSchema = z.record(TimeSeriesDataSchema);

export const TimeSeries5MinResponseSchema = z.object({
    "Meta Data": TimeSeriesIntraDayMetaSchema,
    "Time Series (5min)": TimeSeriesSchema,
});

export const TimeSeriesDailyResponseSchema = z.object({
    "Meta Data": TimeSeriesDailyMetaSchema,
    "Time Series (Daily)": TimeSeriesSchema,
});

export const TimeSeriesWeeklyResponseSchema = z.object({
    "Meta Data": TimeSeriesMetaSchema,
    "Weekly Time Series": TimeSeriesSchema,
});

export const TimeSeriesMonthlyResponseSchema = z.object({
    "Meta Data": TimeSeriesMetaSchema,
    "Monthly Time Series": TimeSeriesSchema,
});

export const StockSchemaMap = {
    [TimeSeriesFunction.TIME_SERIES_INTRADAY]: TimeSeries5MinResponseSchema,
    [TimeSeriesFunction.TIME_SERIES_DAILY]: TimeSeriesDailyResponseSchema,
    [TimeSeriesFunction.TIME_SERIES_WEEKLY]: TimeSeriesWeeklyResponseSchema,
    [TimeSeriesFunction.TIME_SERIES_MONTHLY]: TimeSeriesMonthlyResponseSchema,
};
