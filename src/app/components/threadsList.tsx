"use client";

import ApplyButton from "../components/applyButton";
import Link from "next/dist/client/link";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { FiUser, FiHome, FiSettings, FiBook, FiBell, FiX, FiPlusCircle } from "react-icons/fi";

import { useBGTheme } from "@/lib/themeContext";

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

  const [isPostOpen, setIsPostOpen] = useState(false);
  const [content, setContent] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  const notifications = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { count } = await supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('is_read', false).eq('user_id', user.id);

    setUnreadCount(count || 0);
  };

  useEffect(() => {
    notifications();

    let channel: any;

    const realtimeNotifications = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      channel = supabase.channel(`notification_${user.id}_${Math.random()}`).on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, (payload) => {
        notifications();
      })
        .subscribe();
    };

    realtimeNotifications();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  const { themeColor } = useBGTheme();
  
  const getTextColor = () => {
    if (themeColor === "rgb(249, 250, 251)") {
      return "rgb(103, 103, 103)";
    }
    return `color-mix(in srgb, ${themeColor}, var(--foreground) 70%)`;
  }
  const textColor = getTextColor();

  const getButtonColor = () => {
    if (themeColor === "rgb(249, 250, 251)") {
      return "rgb(141, 111, 113)";
    }
    return `color-mix(in srgb, ${themeColor}, black 15%)`;
  }
  const buttonColor = getButtonColor();

  // --- 投稿処理 ---
  const post = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const displayName = user?.user_metadata?.display_name

    const { error } = await supabase.from('todays_posts').insert({
      user_id: user?.id,
      user_name: displayName,
      content: content,
      created_at: new Date().toISOString()
    });

    if (!error) {
      setContent("");
      setIsPostOpen(false);
      setIsOpen(false);
    }
  }


  return (
    <div style={{ color: textColor }} className={`flex-col bg-background border-0 md:border-l border-gray-200 h-screen top-0 ${isOpen ? "fixed flex w-full mt-20" : "hidden"} md:flex md:sticky md:mt-0 lg:w-[35rem] min-[1390px]:w-[30rem] xl:w-[35rem] 2xl:w-[40%]`}>

      <div className="2xl:!w-85 xl:!w-85 lg:!w-85 sm:w-40 i flex flex-col mt-10 md:mt-20 ml-7 mr-7 md:ml-7 md:mr-0 border-0 md:border-b border-gray-200">
        <div className="text-xl font-bold mb-1 ml-2.5">現在のこたつ</div>
        <ul className="flex flex-col items-start mb-5">
          {thread.map((thread) => (
            <Link key={thread.id} href={`/thread/${thread.id}`} className="w-full pb-2.5 pt-2.5 hover:bg-gray-100 duration-200 pr-2.5 pl-2.5 cursor-pointer leading-relaxed">{thread.title}<div className="text-xs text-gray-400 pt-1">{thread.post_count}件の会話</div></Link>))}
          {thread.length === 0 && (<p>こたつがありません。応募しよう！</p>)}
        </ul>
        <div className="text-xl font-bold mb-1 ml-2.5">今日のこたつ（AI）</div>
        <ul className="flex flex-col items-start mb-5">
          <div className="w-full pb-2.5 pt-2.5 hover:bg-gray-100 duration-200 pr-2.5 pl-2.5 cursor-pointer leading-relaxed">{"実装準備中"}<div className="text-xs text-gray-400 pt-1">{0}件の会話</div></div>
        </ul>
        <div className="flex flex-col mb-5 items-start gap-2">
          <ApplyButton />
        </div>
      </div>

      <div className="flex md:hidden justify-start ml-6 mt-5 gap-1">
        <Link href={"/home"} className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
          <FiHome className="w-7 h-7 stroke-[1.6]" />
        </Link>
        
        <Link href={"/notifications"} className="relative flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
          <div className="relative">
            <FiBell className="w-7 h-7 stroke-[1.6]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center text-[10px] bg-red-400 text-white rounded-full w-4 h-4">
                {unreadCount}
              </span>
            )}
          </div>
        </Link>

        <Link href={"/archive"} className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
          <FiBook className="w-7 h-7 stroke-[1.6]" />
        </Link>
        
        <Link href="/profile" className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
          <FiUser className="w-7 h-7 stroke-[1.6]" />
        </Link>
        
        <Link href={"/setting"} className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
          <FiSettings className="w-7 h-7 stroke-[1.6]" />
        </Link>

        <button onClick={() => setIsPostOpen(true)} className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
             <FiPlusCircle className="w-7 h-7 stroke-[1.6]" />
        </button>
      </div>

      <div className="flex text-xs mt-15 md:mt-5 ml-7 gap-2 text-gray-400">
        <a href="/tos" target="_blank">利用規約</a>
        <a href="/privacy" target="_blank">プライバシーポリシー</a>
        <p>©2025 Kotatsu</p>
      </div>

      {isPostOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pb-50 px-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsPostOpen(false)}></div>
          <div className="bg-white rounded-lg px-5 py-4 z-10 w-full max-w-[500px] h-[255px]">
            <div className="hover:bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer">
              <FiX className="" onClick={() => setIsPostOpen(false)} />
            </div>
            <div className="flex flex-col gap-3 mt-3 mb-4">
              <h2 className="text-xl font-bold text-foreground">投稿</h2>
              <textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                name="" 
                id="" 
                maxLength={100} 
                placeholder="今、共有したいことは？" 
                className="w-full h-20 focus:outline-none resize-none p-1.5 rounded-lg mb-1"
              ></textarea>
            </div>
            <div className="flex justify-end mt-5 items-center gap-5">
              <button 
                onClick={() => { post(); }} 
                style={{ backgroundColor: buttonColor }} 
                className="text-white font-bold py-2 px-4 rounded-3xl cursor-pointer"
              >
                投稿する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}