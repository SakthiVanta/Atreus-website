"use client";

import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    variant?: "default" | "elevated" | "outlined";
    className?: string;
    hover?: boolean;
}

export function Card({ children, variant = "default", className = "", hover = false }: CardProps) {
    const baseStyles = "rounded-2xl transition-all duration-300";

    const variantStyles = {
        default: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm",
        elevated: "bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl",
        outlined: "bg-transparent border-2 border-slate-200 dark:border-slate-700 hover:border-[#e3171e]",
    };

    const hoverStyles = hover
        ? "hover:shadow-lg hover:scale-[1.02] hover:border-[#e3171e]/30"
        : "";

    return (
        <div className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
}

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
    return (
        <div className={`p-6 ${className}`}>
            {children}
        </div>
    );
}

interface CardBodyProps {
    children: ReactNode;
    className?: string;
}

export function CardBody({ children, className = "" }: CardBodyProps) {
    return (
        <div className={`p-6 pt-0 ${className}`}>
            {children}
        </div>
    );
}

interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
    return (
        <div className={`p-6 pt-0 border-t border-slate-100 dark:border-slate-700 mt-4 ${className}`}>
            {children}
        </div>
    );
}
