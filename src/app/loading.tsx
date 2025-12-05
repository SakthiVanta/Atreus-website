export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
            <div className="text-center">
                {/* Animated physiotherapy-themed loader */}
                <div className="relative w-24 h-24 mx-auto mb-8">
                    {/* Outer ring - navy */}
                    <div className="absolute inset-0 rounded-full border-4 border-[#06113d]/20 dark:border-[#06113d]/40"></div>

                    {/* Spinning ring - red */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#e3171e] animate-spin"></div>

                    {/* Inner pulse - navy */}
                    <div className="absolute inset-3 rounded-full bg-[#06113d]/10 dark:bg-[#06113d]/20 animate-pulse"></div>

                    {/* Physiotherapy icon - person with movement */}
                    <svg
                        className="absolute inset-0 m-auto w-10 h-10 text-[#06113d] dark:text-[#e3171e]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {/* Person icon */}
                        <circle cx="12" cy="5" r="3" />
                        <path d="M12 8v13" />
                        <path d="M8 14l4-4 4 4" />
                        <path d="M8 18h8" />
                    </svg>
                </div>

                {/* Loading text */}
                <div className="space-y-2">
                    <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                        Loading
                        <span className="inline-flex ml-1">
                            <span className="animate-bounce">.</span>
                            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                            <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
                        </span>
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Preparing your experience
                    </p>
                </div>

                {/* Optional: Skeleton content preview */}
                <div className="mt-12 max-w-2xl mx-auto space-y-4 opacity-40">
                    <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mx-auto animate-pulse"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mx-auto animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}
