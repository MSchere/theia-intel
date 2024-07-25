import { env } from "$src/env";
import { Card } from "../ui/card";

export default function Footer() {
    return (
        <footer className="h-[var(--size-footer)]">
            <Card className="flex h-full w-full flex-col justify-between gap-2 px-8 sm:flex-row">
                <div className="flex w-full items-center justify-center text-center font-semibold md:justify-start">
                    <a href="https://theia.tech/" className="text-sm text-foreground" target="_blank">
                        © Theia Intel {env.NEXT_PUBLIC_VERSION_NUMBER} - {new Date().getFullYear()}
                    </a>
                </div>
                <ul className="flex w-full list-none items-center justify-center gap-6 md:justify-end">
                    <li>
                        <a href="https://theia.tech" className="text-sm text-foreground" target="_blank">
                            Landing Page
                        </a>
                    </li>
                    <li>
                        <a href="https://theia.tech/#about" target="_blank" className="text-sm text-foreground">
                            About Us
                        </a>
                    </li>
                </ul>
            </Card>
        </footer>
    );
}
