import { User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function UserButton() {
    return (
        <Link href="/profile">
            <Button variant="outline" size="icon">
                <User />
            </Button>
        </Link>
    );
}
