import { signal } from "@preact/signals-react";

export interface LoginStatus {
    status: "firstFactor" | "secondFactor" | "2faSetup";
    email?: string;
    password?: string;
    keyUri?: string;
}
export const loginStatusSignal = signal<LoginStatus>({ status: "firstFactor" });
