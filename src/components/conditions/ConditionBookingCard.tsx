"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { GlobalBookingDialog } from "@/components/ui/GlobalBookingDialog";

export function ConditionBookingCard() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 sticky top-24">

            <div className="space-y-6">
                <div>
                    <Button
                        onClick={() => setIsBookingOpen(true)}
                        className="w-full bg-[#06113d] hover:bg-[#e3171e] text-white"
                    >
                        Book Consultation
                    </Button>
                    <p className="text-xs text-center text-slate-400 mt-3">
                        Available both In-Clinic and Online
                    </p>
                </div>
            </div>

            <GlobalBookingDialog
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </div>
    );
}
