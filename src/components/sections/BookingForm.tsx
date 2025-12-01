"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../ui/Button";

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
    const [success, setSuccess] = useState(false);

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const res = await fetch("/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Booking failed");
            return res.json();
        },
        onSuccess: () => {
            setSuccess(true);
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

    if (success) {
        return (
            <div className="p-6 bg-green-50 text-green-800 rounded-xl border border-green-100">
                <h3 className="text-lg font-semibold mb-2">Request Received</h3>
                <p>{formConfig.submit.successMessage}</p>
            </div>
        );
    }

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
                                className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 min-h-[100px]"
                            />
                        ) : (
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                required={field.required}
                                placeholder={field.placeholder}
                                value={(formData as any)[field.name]}
                                onChange={handleChange}
                                className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                            />
                        )}
                    </div>
                ))}
            </div>

            <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full md:w-auto"
            >
                {mutation.isPending ? "Sending..." : formConfig.submit.text}
            </Button>

            {mutation.isError && (
                <p className="text-sm text-red-600">
                    Something went wrong. Please try again.
                </p>
            )}
        </form>
    );
}
