"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogoutButton() {
    return (
        <Button variant="outline" size="icon" onClick={() => signOut()}>
            <LogOut className="text-destructive" />
        </Button>
    );
}
