"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { GlobalBookingDialog } from "@/components/ui/GlobalBookingDialog";

interface BookingTriggerProps {
    className?: string;
    children: React.ReactNode;
}

export function BookingTrigger({ className, children }: BookingTriggerProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className={className}
            >
                {children}
            </Button>
            <GlobalBookingDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
