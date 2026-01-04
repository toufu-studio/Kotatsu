"use client";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="flex justify-center items-center absolute inset-0 bg-white/50 backdrop-blur-lg">
                <div className="animate-spin h-10 w-10 border-2 border-[#8d6f71] border-t-transparent rounded-full"></div>
            </div>
        </div>

    );
} 