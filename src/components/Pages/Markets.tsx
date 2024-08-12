import CandleStickChart from "$src/components/Charts/CandleStickChart";
import { Card, CardContent, CardHeader, CardTitle } from "$src/components/ui/card";

export default function Markets() {
    return (
        <Card className="h-full w-full">
            <CardHeader>
                <CardTitle>Global Defense Markets</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <CandleStickChart
                    ticker="ITA"
                    title="iShares US Aerospace & Defense (ITA)"
                    description="The iShares U.S. Aerospace & Defense ETF seeks to track the investment results of an index composed of U.S. equities in the aerospace and defense sector."
                />
                <CandleStickChart
                    ticker="PPA"
                    title="Invesco Aerospace & Defense (PPA)"
                    description="The Index is designed to identify a group of companies involved in the development, manufacturing, operations and support of US defense, homeland security and aerospace operations."
                />
                <CandleStickChart
                    ticker="XAR"
                    title="SPDR S&P Aerospace & Defense (XAR)"
                    description="Seeks to provide exposure to the Aerospace & Defense segment of the S&P TMI, which comprises the following sub-industries: Aerospace & Defense"
                />
                <CandleStickChart
                    ticker="DFEN"
                    title="VanEck Defense (DFEN)"
                    description="VanEck‘s Defense ETF provides investors with access to leading defense technology companies, large-scale cybersecurity firms and defense-relevant service providers."
                />
            </CardContent>
        </Card>
    );
}
