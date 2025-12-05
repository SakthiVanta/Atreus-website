"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                {children}
                <Toaster
                    position="top-right"
                    expand={true}
                    richColors
                    closeButton
                    duration={4000}
                    toastOptions={{
                        style: {
                            padding: '16px',
                            gap: '12px',
                        },
                        className: 'font-sans',
                    }}
                />
            </ThemeProvider>
        </QueryClientProvider>
    );
}
