"use client";

import { FiAlignJustify, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";


import "../globals.css";

export default function Header({ isOpen, setIsOpen}: { isOpen: boolean;setIsOpen: (value:boolean) => void;}) {


    useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "unset";
    }
})

    return (
        <header className="sticky shrink-0 top-0 h-20 border-b justify-between md:justify-center gap-10 border-gray-200 flex items-center bg-background/50 text-foreground shadow-[0_1px_4px_-1px_rgba(0,0,0,0.05)] backdrop-blur-md">
            <div className="flex justify-between md:justify-center items-center mx-5 md:mx-0 w-full md:w-fit">
                <img src="/kotatsu_logo.svg" alt="kotatsu_logo" width={70} />
                <div className="mr-auto ml-5 flex md:hidden">KOTATSU</div>
                { !isOpen && <FiAlignJustify onClick={() => setIsOpen(true)} className="w-10 h-10 flex md:hidden" />}
                { isOpen && <FiX onClick={() => setIsOpen(false)} className="w-10 h-10 flex md:hidden" />}
            </div>
            <div className="text-xs hidden md:flex">ハイスピードな、あたたかいSNS</div> {/* sm:text-red-600 md:text-blue-600 lg:text-green-600 xl:text-yellow-600  min-[86.875rem]:text-purple-400 2xl:text-pink-600sm:text-red-600 md:!text-blue-600 lg:!text-green-600 xl:!text-yellow-600 2xl:!text-pink-600 */}
        </header>
    );
}