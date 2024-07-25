import LogoutButton from "../Header/LogoutButton";
import ThemeButton from "../Header/ThemeButton";
import UserButton from "../Header/UserButton";
import { Card } from "../ui/card";

export default function Header() {
    return (
        <header className="w-full">
            <Card className="flex h-[var(--size-header)] items-center justify-end gap-4 px-4">
                <ThemeButton />
                <UserButton />
                <LogoutButton />
            </Card>
        </header>
    );
}
