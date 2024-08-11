import CandleStickChart from "$src/components/Charts/CandleStickChart";
import { Card, CardContent, CardHeader, CardTitle } from "$src/components/ui/card";
import ErrorMessage from "$src/components/Utils/ErrorMessage";
import { TimeSeriesFunction } from "$src/lib/types/stock.types";
import { getStockDataAction } from "$src/server/stocks/getStock";

export default async function Markets() {
    const timeSeriesFunction = TimeSeriesFunction.TIME_SERIES_MONTHLY;
    const res1 = await getStockDataAction("ITA", timeSeriesFunction);
    if (!res1.success) {
        return <ErrorMessage>{res1.errorMessage}</ErrorMessage>;
    }
    const itaData = res1.data;
    const res2 = await getStockDataAction("XAR", timeSeriesFunction);
    if (!res2.success) {
        return <ErrorMessage>{res2.errorMessage}</ErrorMessage>;
    }
    const xarData = res2.data;
    const res3 = await getStockDataAction("PPA", timeSeriesFunction);
    if (!res3.success) {
        return <ErrorMessage>{res3.errorMessage}</ErrorMessage>;
    }
    const ppaData = res3.data;
    const res4 = await getStockDataAction("FITE", timeSeriesFunction);
    if (!res4.success) {
        return <ErrorMessage>{res4.errorMessage}</ErrorMessage>;
    }
    const fiteData = res4.data;

    const res5 = await getStockDataAction("DFEN", timeSeriesFunction);
    if (!res5.success) {
        return <ErrorMessage>{res5.errorMessage}</ErrorMessage>;
    }
    const dfenData = res5.data;

    return (
        <Card className="h-full w-full">
            <CardHeader>
                <CardTitle>Global Defense Markets</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <CandleStickChart
                    data={itaData}
                    title="iShares US Aerospace & Defense (ITA)"
                    description="The iShares U.S. Aerospace & Defense ETF seeks to track the investment results of an index composed of U.S. equities in the aerospace and defense sector."
                />

                <CandleStickChart
                    data={ppaData}
                    title="Invesco Aerospace & Defense (PPA)"
                    description="The Index is designed to identify a group of companies involved in the development, manufacturing, operations and support of US defense, homeland security and aerospace operations."
                />
                <CandleStickChart
                    data={xarData}
                    title="SPDR S&P Aerospace & Defense (XAR)"
                    description="Seeks to provide exposure to the Aerospace & Defense segment of the S&P TMI, which comprises the following sub-industries: Aerospace & Defense"
                />
                <CandleStickChart
                    data={dfenData}
                    title="VanEck Defense (DFEN)"
                    description="VanEck‘s Defense ETF provides investors with access to leading defense technology companies, large-scale cybersecurity firms and defense-relevant service providers."
                />
            </CardContent>
        </Card>
    );
}
