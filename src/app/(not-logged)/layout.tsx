import { Card } from "$src/components/ui/card";
import { Separator } from "$src/components/ui/separator";
import Link from "next/link";
import { type ReactNode } from "react";

export const metadata = {
    title: "Login",
};

export default function LoggedOutLayout({ children }: { children: ReactNode }) {
    return (
        <main className="flex h-svh w-screen items-center justify-center">
            <Card className="flex w-[500px] flex-col items-center justify-center gap-4 px-16 py-8">
                <Link className="flex items-center justify-center h-60" href="/login">
                    {/* <Image src={logo} alt="Theia Intel" width={240} height={240} /> */}
                    <h1 className="text-4xl font-bold text-primary">THEIA INTEL</h1>
                </Link>
                <Separator className="w-full" />
                {children}
            </Card>
        </main>
    );
}
