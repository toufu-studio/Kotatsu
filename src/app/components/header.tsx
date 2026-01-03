"use client";

import "../globals.css";

export default function Header() {
    return (
        <header className="shrink-0 sticky top-0 h-20 border-b justify-center gap-10 border-gray-200 flex items-center bg-white/80 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
            <img src="/kotatsu_logo.svg" alt="kotatsu_logo" width={70} />
            <div className="text-xs">ハイスピードな、あたたかいSNS</div> {/* sm:text-red-600 md:text-blue-600 lg:text-green-600 xl:text-yellow-600  min-[86.875rem]:text-purple-400 2xl:text-pink-600 */}
        </header>
    );
}