import { z } from "zod";
import {
    TimeSeries5MinResponseSchema,
    TimeSeriesDailyMetaSchema,
    TimeSeriesDailyResponseSchema,
    TimeSeriesDataSchema,
    TimeSeriesMonthlyResponseSchema,
    TimeSeriesSchema,
    TimeSeriesWeeklyResponseSchema,
} from "../schemas/api.schemas";
// Example Alpha Vantage API response:
// {
//     "Meta Data": {
//         "1. Information": "Intraday (5min) open, high, low, close prices and volume",
//         "2. Symbol": "IBM",
//         "3. Last Refreshed": "2024-08-02 19:55:00",
//         "4. Interval": "5min",
//         "5. Output Size": "Compact",
//         "6. Time Zone": "US/Eastern"
//     },
//     "Time Series (5min)": {
//         "2024-08-02 19:55:00": {
//             "1. open": "188.3500",
//             "2. high": "188.3600",
//             "3. low": "188.3500",
//             "4. close": "188.3500",
//             "5. volume": "60"
//         },
//         "2024-08-02 19:40:00": {
//             "1. open": "188.5000",
//             "2. high": "188.5000",
//             "3. low": "188.3500",
//             "4. close": "188.3500",
//             "5. volume": "13"
//         },
// ...

export type TimeSeriesMeta = z.infer<typeof TimeSeriesDailyMetaSchema>;

export type TimeSeriesData = z.infer<typeof TimeSeriesDataSchema>;

export type TimeSeries = z.infer<typeof TimeSeriesSchema>;

export enum Interval {
    ONE_MIN = "1min",
    FIVE_MIN = "5min",
    FIFTEEN_MIN = "15min",
    THIRTY_MIN = "30min",
    SIXTY_MIN = "60min",
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly",
}

export enum TimeSeriesFunction {
    TIME_SERIES_INTRADAY = "TIME_SERIES_INTRADAY",
    TIME_SERIES_DAILY = "TIME_SERIES_DAILY",
    TIME_SERIES_WEEKLY = "TIME_SERIES_WEEKLY",
    TIME_SERIES_MONTHLY = "TIME_SERIES_MONTHLY",
}

export type TimeSeries5MinResponse = z.infer<typeof TimeSeries5MinResponseSchema>;

export type TimeSeriesDailyResponse = z.infer<typeof TimeSeriesDailyResponseSchema>;

export type TimeSeriesWeeklyResponse = z.infer<typeof TimeSeriesWeeklyResponseSchema>;

export type TimeSeriesMonthlyResponse = z.infer<typeof TimeSeriesMonthlyResponseSchema>;

export type TimeSeriesDataMap = {
    [TimeSeriesFunction.TIME_SERIES_INTRADAY]: TimeSeries5MinResponse;
    [TimeSeriesFunction.TIME_SERIES_DAILY]: TimeSeriesDailyResponse;
    [TimeSeriesFunction.TIME_SERIES_WEEKLY]: TimeSeriesWeeklyResponse;
    [TimeSeriesFunction.TIME_SERIES_MONTHLY]: TimeSeriesMonthlyResponse;
};
