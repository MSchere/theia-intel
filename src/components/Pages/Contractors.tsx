import CandleStickChart from "$src/components/Charts/CandleStickChart";
import { Card, CardContent, CardHeader, CardTitle } from "$src/components/ui/card";

export default function Contractors() {
    return (
        <Card className="h-full w-full">
            <CardHeader>
                <CardTitle>Global Defense Contractors</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <CandleStickChart
                    ticker="LMT"
                    title="Lockheed Martin Corporation (LMT)"
                    description="Lockheed Martin Corporation, a security and aerospace company, engages in the research, design, development, manufacture, integration, and sustainment of technology systems, products, and services worldwide. "
                />
                <CandleStickChart
                    ticker="NOC"
                    title="Northrop Grumman Corporation (NOC)"
                    description="Northrop Grumman Corporation operates as an aerospace and defense technology company in the United States, Asia/Pacific, Europe, and internationally."
                />
                <CandleStickChart
                    ticker="RTX"
                    title="RTX Corporation (RTX)"
                    description="RTX Corporation, an aerospace and defense company, provides systems and services for the commercial, military, and government customers in the United States and internationally. It operates through three segments: Collins Aerospace, Pratt & Whitney, and Raytheon"
                />
                <CandleStickChart
                    ticker="GD"
                    title="General Dynamics Corporation (GD)"
                    description="General Dynamics Corporation operates as an aerospace and defense company worldwide. It operates through four segments: Aerospace, Marine Systems, Combat Systems, and Technologies."
                />
                <CandleStickChart
                    ticker="BA"
                    title="Boeing Company (BA)"
                    description="The Boeing Company, together with its subsidiaries, designs, develops, manufactures, sells, services, and supports commercial jetliners, military aircraft, satellites, missile defense, human space flight and launch systems, and services worldwide."
                />
                <CandleStickChart
                    ticker="BA.L"
                    title="BAE Systems plc (BA.L)"
                    description="BAE Systems plc provides defense, aerospace, and security solutions worldwide. The company operates through five segments: Electronic Systems, Platforms & Services, Air, Maritime, and Cyber & Intelligence. "
                />
                <CandleStickChart
                    ticker="RHM.DE"
                    title="Rheinmetall AG (RHM.DE)"
                    description="Rheinmetall AG provides mobility and security technologies worldwide. The company operates in five segments: Vehicle Systems, Weapon and Ammunition, Electronic Solutions, Sensors and Actuators, and Materials and Trade. "
                />
                <CandleStickChart
                    ticker="AM.PA"
                    title="Dassault Aviation SA (AM.PA)"
                    description="Dassault Aviation société anonyme designs and manufactures military aircraft, business jets, and space systems in France, the Americas, and internationally."
                />
                <CandleStickChart
                    ticker="SAABF"
                    title="Saab AB (SAABF)"
                    description="Saab AB (publ) provides products, services, and solutions for military defense, aviation, and civil security markets worldwide. The company operates through Aeronautics, Dynamics, Surveillance, Kockums, and Combitech segments."
                />
            </CardContent>
        </Card>
    );
}
