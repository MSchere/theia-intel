"use client";

import { CopyIcon } from "lucide-react";
import { useState } from "react";

export default function CopyButton({ value }: { value: string }) {
    const [copied, setCopied] = useState(false);
    async function onClick(e: React.MouseEvent) {
        e.preventDefault();
        await navigator.clipboard.writeText(value);
        setCopied(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setCopied(false);
    }
    return (
        <>
            {!copied ? (
                <button onClick={onClick} className="h-[20px]">
                    <CopyIcon size="md" />
                </button>
            ) : (
                <button className="h-[20px]">
                    <CopyIcon size="md" color="green" />
                </button>
            )}
        </>
    );
}
