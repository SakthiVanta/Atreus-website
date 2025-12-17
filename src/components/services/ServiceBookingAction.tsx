"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { GlobalBookingDialog } from "@/components/ui/GlobalBookingDialog";

export function ServiceBookingAction() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsBookingOpen(true)}
                size="lg"
                className="bg-[#e3171e] hover:bg-[#b01217] text-white"
            >
                Book Consultation
            </Button>

            <GlobalBookingDialog
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </>
    );
}
