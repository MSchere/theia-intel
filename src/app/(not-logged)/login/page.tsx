"use client";

import FirstFactorForm from "$components/Login/FirstFactorForm";
import SecondFactorForm from "$components/Login/SecondFactorForm";
import SecondFactorSetup from "$components/Login/SecondFactorSetup";
import ErrorMessage from "$components/Utils/ErrorMessage";
import useAuthRedirect from "$hooks/useAuthRedirect";
import { loginStatusSignal } from "$src/app/signals";
import { useSignals } from "@preact/signals-react/runtime";

export default function Login() {
    useAuthRedirect();
    useSignals();

    // Component will render the correct form based on the global login status
    const loginStatus = loginStatusSignal.value.status;

    return loginStatus === "firstFactor" ? (
        <FirstFactorForm />
    ) : loginStatus === "secondFactor" ? (
        <SecondFactorForm />
    ) : loginStatus === "2faSetup" ? (
        <SecondFactorSetup />
    ) : (
        <ErrorMessage>Invalid login status</ErrorMessage>
    );
}
