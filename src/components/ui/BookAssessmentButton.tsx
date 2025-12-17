"use client";

import { useState } from "react";
import { GlobalBookingDialog } from "@/components/ui/GlobalBookingDialog";

export function BookAssessmentButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-[#e3171e] border border-transparent rounded-full hover:bg-[#c4121b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e3171e] shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
                Book Your Assessment
            </button>

            <GlobalBookingDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
