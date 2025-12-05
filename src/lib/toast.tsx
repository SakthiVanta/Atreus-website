import { toast as sonnerToast } from "sonner";
import { CheckCircle2, XCircle, Loader2, Info, AlertTriangle } from "lucide-react";

interface ToastOptions {
    title: string;
    description?: string;
    duration?: number;
}

export const toast = {
    success: ({ title, description, duration = 4000 }: ToastOptions) => {
        sonnerToast.success(title, {
            description,
            duration,
            icon: <CheckCircle2 className="w-5 h-5" />,
        });
    },

    error: ({ title, description, duration = 5000 }: ToastOptions) => {
        sonnerToast.error(title, {
            description,
            duration,
            icon: <XCircle className="w-5 h-5" />,
        });
    },

    loading: ({ title, description }: Omit<ToastOptions, 'duration'>) => {
        return sonnerToast.loading(title, {
            description,
            icon: <Loader2 className="w-5 h-5 animate-spin" />,
        });
    },

    info: ({ title, description, duration = 4000 }: ToastOptions) => {
        sonnerToast.info(title, {
            description,
            duration,
            icon: <Info className="w-5 h-5" />,
        });
    },

    warning: ({ title, description, duration = 4000 }: ToastOptions) => {
        sonnerToast.warning(title, {
            description,
            duration,
            icon: <AlertTriangle className="w-5 h-5" />,
        });
    },

    dismiss: (toastId?: string | number) => {
        sonnerToast.dismiss(toastId);
    },
};
