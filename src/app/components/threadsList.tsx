"use client";

import ApplyButton from "../components/applyButton";
import Link from "next/dist/client/link";

import { useEffect, useState, useRef } from "react";
import { FiUser, FiHome, FiSettings, FiBook } from "react-icons/fi";
import { supabase } from "@/lib/supabase";

export default function ThreadsList() {
    const [thread, setThread] = useState<{ id: number, title: string }[]>([]);

    return (<div className="2xl:w-[40%] xl:w-[35rem] min-[1390px]:w-[30rem] lg:w-[35rem] bg-white border-l border-gray-200 h-screen sticky top-0 flex flex-col">
            <div className="2xl:!w-85 xl:!w-85 lg:!w-85 sm:w-60 flex flex-col mt-20 ml-7 border-b border-gray-200">
              <div className="text-xl font-bold mb-1 ml-2.5">現在のこたつ</div>
              <ul className="flex flex-col items-start mb-5">
                <Link href="/thread/1" className="w-full pb-2.5 pt-2.5 hover:bg-gray-100 duration-200 pr-2.5 pl-2.5 cursor-pointer">{}<div className="text-xs text-gray-400 pt-1">{}件の会話</div></Link>
                <Link href="/thread/2" className="w-full pb-2.5 pt-2.5 hover:bg-gray-100 duration-200 pr-2.5 pl-2.5 cursor-pointer">{}<div className="text-xs text-gray-400 pt-1">{}件の会話</div></Link>
                <Link href="/thread/3" className="w-full pb-2.5 pt-2.5 hover:bg-gray-100 duration-200 pr-2.5 pl-2.5 cursor-pointer">{}<div className="text-xs text-gray-400 pt-1">{}件の会話</div></Link>
              </ul>
              <div className="text-xl font-bold mb-1 ml-2.5">本日のこたつ（AI）</div>
              <ul className="flex flex-col items-start mb-5">
                <Link href="/thread/4" className="w-full pb-2.5 pt-2.5 hover:bg-gray-100 duration-200 pr-2.5 pl-2.5 cursor-pointer">{}<div className="text-xs text-gray-400 pt-1">{}件の会話</div></Link>
              </ul>
              <div className="flex flex-col mb-5 items-start gap-2">
                <ApplyButton />

              </div>
            </div>
          </div>);
}