"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface SectionHeaderProps {
    title: string;
    description?: string;
    linkText?: string;
    linkHref?: string;
    className?: string;
}

export function SectionHeader({ title, description, linkText, linkHref, className = "" }: SectionHeaderProps) {
    return (
        <div className={`flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-12 ${className}`}>
            <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                    {title}
                </h2>
                {description && (
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                        {description}
                    </p>
                )}
            </div>
            {linkText && linkHref && (
                <Link
                    href={linkHref}
                    className="inline-flex items-center gap-2 text-[#e3171e] hover:text-[#06113d] font-medium underline decoration-2 underline-offset-4 hover:decoration-[#06113d] transition-all group shrink-0"
                >
                    {linkText}
                    <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            )}
        </div>
    );
}
