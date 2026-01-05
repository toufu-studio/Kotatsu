"use client";

import ApplyButton from "../components/applyButton";
import Link from "next/dist/client/link";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

import { FiUser, FiHome, FiSettings, FiBook } from "react-icons/fi";

export default function ThreadsList({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void; }) {

  const [thread, setThread] = useState<{ id: number, title: string, post_count: number }[]>([]);
  const createThreads = async () => {
    const { data, error } = await supabase.from("active_threads").select("id, title, posts(count)").order("id", { ascending: true });

    if (error) { console.error; }
    else {
      const formattedData = data.map((t: any) => ({
        id: t.id,
        title: t.title,
        post_count: t.posts?.[0]?.count || 0
      }));
      setThread(formattedData);
    }
  };

  useEffect(() => {
    createThreads();

    const subscription = supabase
      .channel("active_threads")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "active_threads" },
        () => {
          createThreads();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts"
        },
        () => {
          createThreads();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (<div className={`flex-col bg-white border-0 md:border-l border-gray-200 h-screen top-0 ${isOpen ? "fixed flex w-full mt-20" : "hidden"} md:flex md:sticky md:mt-0 lg:w-[35rem] min-[1390px]:w-[30rem] xl:w-[35rem] 2xl:w-[40%]`}>

    <div className="2xl:!w-85 xl:!w-85 lg:!w-85 sm:w-40 i flex flex-col mt-10 md:mt-20 ml-7 mr-7 md:ml-7 md:mr-0 border-0 md:border-b border-gray-200">
      <div className="text-xl font-bold mb-1 ml-2.5">現在のこたつ</div>
      <ul className="flex flex-col items-start mb-5">
        {thread.map((thread) => (
          <Link key={thread.id} href={`/thread/${thread.id}`} className="w-full pb-2.5 pt-2.5 hover:bg-gray-100 duration-200 pr-2.5 pl-2.5 cursor-pointer">{thread.title}<div className="text-xs text-gray-400 pt-1">{thread.post_count}件の会話</div></Link>))}
        {thread.length === 0 && (<p>こたつがありません。応募しよう！</p>)}
      </ul>
      <div className="text-xl font-bold mb-1 ml-2.5">本日のこたつ（AI）</div>
      <ul className="flex flex-col items-start mb-5">
        <div className="w-full pb-2.5 pt-2.5 hover:bg-gray-100 duration-200 pr-2.5 pl-2.5 cursor-pointer">{"実装準備中"}<div className="text-xs text-gray-400 pt-1">{0}件の会話</div></div>
        {/*<Link href="/thread/4" className="w-full pb-2.5 pt-2.5 hover:bg-gray-100 duration-200 pr-2.5 pl-2.5 cursor-pointer">{"実装準備中"}<div className="text-xs text-gray-400 pt-1">{0}件の会話</div></Link>*/}
      </ul>
      <div className="flex flex-col mb-5 items-start gap-2">
        <ApplyButton />
      </div>
    </div>

    <div className="flex md:hidden justify-start ml-6 mt-5">
      <Link href={"/home"} className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
        <FiHome className="w-7 h-7 stroke-[1.6]" />
      </Link>
      <Link href="/profile" className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
        <FiUser className="w-7 h-7 stroke-[1.6]" />
      </Link>
      <Link href={"/archive"} className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
        <FiBook className="w-7 h-7 stroke-[1.6]" />
      </Link>
      <Link href={"/setting"} className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
        <FiSettings className="w-7 h-7 stroke-[1.6]" />
      </Link>
    </div>
  </div>);
}