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

export type StockMeta = {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Interval": string;
  "5. Output Size": string;
  "6. Time Zone": string;
};

export type StockTimeSeries = {
  [key: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
};

export interface StockTimeSeriesResponse {
  "Meta Data": StockMeta;
}

export enum StockInterval {
  ONE_MIN = "1min",
  FIVE_MIN = "5min",
  FIFTEEN_MIN = "15min",
  THIRTY_MIN = "30min",
  SIXTY_MIN = "60min",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

export enum StockFunction {
  TIME_SERIES_INTRADAY = "TIME_SERIES_INTRADAY",
  TIME_SERIES_DAILY = "TIME_SERIES_DAILY",
  TIME_SERIES_WEEKLY = "TIME_SERIES_WEEKLY",
  TIME_SERIES_MONTHLY = "TIME_SERIES_MONTHLY",
}

export interface StockTimeSeries5MinResponse extends StockTimeSeriesResponse {
  "Time Series (5min)": StockTimeSeries;
}

export interface StockTimeSeriesDailyResponse extends StockTimeSeriesResponse {
  "Time Series (Daily)": StockTimeSeries;
}

export interface StockTimeSeriesWeeklyResponse extends StockTimeSeriesResponse {
  "Weekly Time Series": StockTimeSeries;
}

export interface StockTimeSeriesMonthlyResponse
  extends StockTimeSeriesResponse {
  "Monthly Time Series": StockTimeSeries;
}

export type StockDataMap = {
  [StockFunction.TIME_SERIES_INTRADAY]: StockTimeSeries5MinResponse;
  [StockFunction.TIME_SERIES_DAILY]: StockTimeSeriesDailyResponse;
  [StockFunction.TIME_SERIES_WEEKLY]: StockTimeSeriesWeeklyResponse;
  [StockFunction.TIME_SERIES_MONTHLY]: StockTimeSeriesMonthlyResponse;
};
