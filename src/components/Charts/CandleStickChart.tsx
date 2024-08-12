import { Suspense } from "react";
import Loading from "../Utils/Loading";
import AsyncCandleStickChart from "./AsyncCandleStickChart";

export default async function CandleStickChart(props: { ticker: string; title: string; description?: string }) {
    return (
        <Suspense fallback={<LoadingChart />}>
            <AsyncCandleStickChart {...props} />
        </Suspense>
    );
}

function LoadingChart() {
    return (
        <div className="h-[490px]">
            <Loading />
        </div>
    );
}
