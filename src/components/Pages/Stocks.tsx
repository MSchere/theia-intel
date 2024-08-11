import CandleStickChart from "$src/components/Charts/CandleStickChart";
import { Card, CardContent, CardHeader, CardTitle } from "$src/components/ui/card";
import ErrorMessage from "$src/components/Utils/ErrorMessage";
import { TimeSeriesFunction } from "$src/lib/types/stock.types";
import { getStockDataAction } from "$src/server/stocks/getStock";

export default async function Stocks() {
    const timeSeriesFunction = TimeSeriesFunction.TIME_SERIES_MONTHLY;
    const res1 = await getStockDataAction("LMT", timeSeriesFunction);
    if (!res1.success) {
        return <ErrorMessage>{res1.errorMessage}</ErrorMessage>;
    }
    const lmtData = res1.data;
    const res2 = await getStockDataAction("NOC", timeSeriesFunction);
    if (!res2.success) {
        return <ErrorMessage>{res2.errorMessage}</ErrorMessage>;
    }
    const nocData = res2.data;
    const res3 = await getStockDataAction("RTX", timeSeriesFunction);
    if (!res3.success) {
        return <ErrorMessage>{res3.errorMessage}</ErrorMessage>;
    }
    const rtxData = res3.data;
    const res4 = await getStockDataAction("GD", timeSeriesFunction);
    if (!res4.success) {
        return <ErrorMessage>{res4.errorMessage}</ErrorMessage>;
    }
    const gdData = res4.data;

    const res5 = await getStockDataAction("BA", timeSeriesFunction);
    if (!res5.success) {
        return <ErrorMessage>{res5.errorMessage}</ErrorMessage>;
    }
    const baData = res5.data;

    const res6 = await getStockDataAction("BA.L", timeSeriesFunction);
    if (!res6.success) {
        return <ErrorMessage>{res6.errorMessage}</ErrorMessage>;
    }
    const baLData = res6.data;

    const res7 = await getStockDataAction("RHM.DE", timeSeriesFunction);
    if (!res7.success) {
        return <ErrorMessage>{res7.errorMessage}</ErrorMessage>;
    }
    const rhmData = res7.data;

    const res8 = await getStockDataAction("AM.PA", timeSeriesFunction);
    if (!res8.success) {
        return <ErrorMessage>{res8.errorMessage}</ErrorMessage>;
    }
    const amPaData = res8.data;

    const res9 = await getStockDataAction("SAABF", timeSeriesFunction);
    if (!res9.success) {
        return <ErrorMessage>{res9.errorMessage}</ErrorMessage>;
    }
    const saabData = res9.data;
    return (
        <Card className="h-full w-full">
            <CardHeader>
                <CardTitle>Global Defense Contractors</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <CandleStickChart
                    data={lmtData}
                    title="Lockheed Martin Corporation (LMT)"
                    description="Lockheed Martin Corporation, a security and aerospace company, engages in the research, design, development, manufacture, integration, and sustainment of technology systems, products, and services worldwide. "
                />
                <CandleStickChart
                    data={nocData}
                    title="Northrop Grumman Corporation (NOC)"
                    description="Northrop Grumman Corporation operates as an aerospace and defense technology company in the United States, Asia/Pacific, Europe, and internationally."
                />
                <CandleStickChart
                    data={rtxData}
                    title="RTX Corporation (RTX)"
                    description="RTX Corporation, an aerospace and defense company, provides systems and services for the commercial, military, and government customers in the United States and internationally. It operates through three segments: Collins Aerospace, Pratt & Whitney, and Raytheon"
                />
                <CandleStickChart
                    data={gdData}
                    title="General Dynamics Corporation (GD)"
                    description="General Dynamics Corporation operates as an aerospace and defense company worldwide. It operates through four segments: Aerospace, Marine Systems, Combat Systems, and Technologies."
                />
                <CandleStickChart
                    data={baData}
                    title="Boeing Company (BA)"
                    description="The Boeing Company, together with its subsidiaries, designs, develops, manufactures, sells, services, and supports commercial jetliners, military aircraft, satellites, missile defense, human space flight and launch systems, and services worldwide."
                />
                <CandleStickChart
                    data={baLData}
                    title="BAE Systems plc (BA.L)"
                    description="BAE Systems plc provides defense, aerospace, and security solutions worldwide. The company operates through five segments: Electronic Systems, Platforms & Services, Air, Maritime, and Cyber & Intelligence. "
                />
                <CandleStickChart
                    data={rhmData}
                    title="Rheinmetall AG (RHM.DE)"
                    description="Rheinmetall AG provides mobility and security technologies worldwide. The company operates in five segments: Vehicle Systems, Weapon and Ammunition, Electronic Solutions, Sensors and Actuators, and Materials and Trade. "
                />
                <CandleStickChart
                    data={amPaData}
                    title="Dassault Aviation SA (AM.PA)"
                    description="Dassault Aviation société anonyme designs and manufactures military aircraft, business jets, and space systems in France, the Americas, and internationally."
                />
                <CandleStickChart
                    data={saabData}
                    title="Saab AB (SAABF)"
                    description="Saab AB (publ) provides products, services, and solutions for military defense, aviation, and civil security markets worldwide. The company operates through Aeronautics, Dynamics, Surveillance, Kockums, and Combitech segments."
                />
            </CardContent>
        </Card>
    );
}
