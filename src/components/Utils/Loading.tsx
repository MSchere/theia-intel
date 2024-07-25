type Props = {
    theme?: "light" | "dark";
    rounded?: boolean;
};

export default function Loading({ theme, rounded }: Props) {
    return (
        <div className="flex h-full flex-auto">
            <div className={`shimmer${theme === "dark" ? "-dark" : ""} ${rounded ? "rounded-full" : "rounded-md"}`} />
        </div>
    );
}
