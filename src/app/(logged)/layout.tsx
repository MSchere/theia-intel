import Footer from "$components/Layout/Footer";
import Header from "$components/Layout/Header";
import Sidebar from "$components/Sidebar/Sidebar";
import { type ReactNode } from "react";

export default function LoggedInLayout({ children }: { children: ReactNode }) {
    return (
        <main className="flex h-svh w-screen">
            <Sidebar />
            <div className="flex h-full w-full flex-col gap-4 overflow-auto px-4 py-4">
                <Header />
                <div className="flex-grow">{children}</div>
                <Footer />
            </div>
        </main>
    );
}
