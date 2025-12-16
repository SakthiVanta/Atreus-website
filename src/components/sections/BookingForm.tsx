"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../ui/Button";
import { toast } from "sonner";

type FormData = {
    fullName: string;
    email: string;
    phone: string;
    preferredDate?: string;
    notes?: string;
};

export function BookingForm({ formConfig }: { formConfig: any }) {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phone: "",
        preferredDate: "",
        notes: "",
    });

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const res = await fetch("/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Booking failed");
            }

            return result;
        },
        onMutate: () => {
            toast.loading("Sending your booking request...", { id: "booking-toast" });
        },
        onSuccess: (data) => {
            toast.success(data.message || formConfig.submit.successMessage || "Booking request received!", { id: "booking-toast" });
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                preferredDate: "",
                notes: "",
            });
        },
        onError: (error) => {
            toast.error(error.message || "Something went wrong. Please try again.", { id: "booking-toast" });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };



    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">{formConfig.title}</h2>
                <p className="text-slate-600">{formConfig.description}</p>
            </div>

            <div className="grid gap-4">
                {formConfig.fields.map((field: any) => (
                    <div key={field.name} className="flex flex-col gap-1">
                        <label
                            htmlFor={field.name}
                            className="text-sm font-medium text-slate-700"
                        >
                            {field.label} {field.required && "*"}
                        </label>
                        {field.type === "textarea" ? (
                            <textarea
                                id={field.name}
                                name={field.name}
                                required={field.required}
                                placeholder={field.placeholder}
                                value={(formData as any)[field.name]}
                                onChange={handleChange}
                                suppressHydrationWarning
                                className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 min-h-[100px]"
                            />
                        ) : field.type === "select" ? (
                            <div className="relative">
                                <select
                                    id={field.name}
                                    name={field.name}
                                    required={field.required}
                                    value={(formData as any)[field.name]}
                                    onChange={handleChange as any}
                                    suppressHydrationWarning
                                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 appearance-none bg-white"
                                >
                                    <option value="" disabled>
                                        Select an option
                                    </option>
                                    {field.options?.map((option: string) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                required={field.required}
                                placeholder={field.placeholder}
                                value={(formData as any)[field.name]}
                                onChange={handleChange}
                                suppressHydrationWarning
                                className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                            />
                        )}
                    </div>
                ))}
            </div>

            <Button
                type="submit"
                variant="primary"
                disabled={mutation.isPending}
                className="w-full md:w-auto"
            >
                {mutation.isPending ? "Sending..." : formConfig.submit.text}
            </Button>


        </form>
    );
}
