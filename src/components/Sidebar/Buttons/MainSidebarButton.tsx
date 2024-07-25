"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Props = {
    route: string;
    title: string;
    active: boolean;
    children: ReactNode;
    onClick?: () => void;
};
export default function MainSidebarButton({ title, route, active, children: icon, onClick }: Props) {
    return (
        <Link href={route}>
            <button className={`sidebar-btn ${active ? "brightness-200 text-primary" : ""}`} onClick={onClick}>
                {icon}
                {title}
            </button>
        </Link>
    );
}
