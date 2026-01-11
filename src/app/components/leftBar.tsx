"use client";

import "../globals.css";

import { FiUser, FiHome, FiSettings, FiBook } from "react-icons/fi";
import Link from "next/link";
import { useBGTheme } from "@/lib/themeContext";

export default function LeftBar() {

  const { themeColor } = useBGTheme();

  const getTextColor = () => {
    if (themeColor === "rgb(249, 250, 251)") {
      return "rgb(103, 103, 103)";
    }
    return `color-mix(in srgb, ${themeColor}, var(--foreground) 70%)`;
  }

  const textColor = getTextColor();

  return (
    <div style={{color: textColor}} className="w-[80px] xl:w-[280px] 2xl:w-[400px] bg-background md:border-r border-gray-200 h-15 md:h-screen sticky top-0 flex justify-between shrink-0">
      <div className="flex md:flex md:flex-col xl:mt-19 xl:mr-10 ml-auto md:mr-3 md:mt-13">
        <div className="flex gap-5 items-center rounded-3xl p-3">
          <div className="font-bold text-xl hidden xl:flex">KOTATSU</div>
        </div>
        <Link href={"/home"} className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
          <FiHome className="w-7 h-7 stroke-[1.6]" />
          <div className="text-base hidden xl:flex">ホーム</div>
        </Link>
        <Link href="/profile" className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
          <FiUser className="w-7 h-7 stroke-[1.6]" />
          <div className="text-base hidden xl:flex">プロフィール</div>
        </Link>
        <Link href={"/archive"} className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
          <FiBook className="w-7 h-7 stroke-[1.6]" />
          <div className="text-base hidden xl:flex">アーカイブ</div>
        </Link>
        <Link href={"/setting"} className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
          <FiSettings className="w-7 h-7 stroke-[1.6]" />
          <div className="text-base hidden xl:flex">設定</div>
        </Link>
      </div>
    </div>
  );
}