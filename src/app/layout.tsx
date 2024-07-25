import { Toaster } from "$components/ui/toaster";
import AuthProvider from "$src/components/AuthProvider";
import "$src/styles/globals.css";
import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
    title: "Theia Intel",
    description: "Defense Intelligence Platform",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <Toaster />
                <AuthProvider>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
