"use client";

import { useTheme } from "next-themes";

export default function Loading(props: { rounded?: boolean }) {
    const { theme } = useTheme();
    return (
        <div className="flex h-full flex-auto">
            <div
                className={`shimmer${theme === "light" ? "" : "-dark"} ${props.rounded ? "rounded-full" : "rounded-md"}`}
            />
        </div>
    );
}
