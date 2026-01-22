"use client";

import "../globals.css";

import { FiUser, FiHome, FiSettings, FiBook, FiBell, FiX } from "react-icons/fi";
import Link from "next/link";
import { useBGTheme } from "@/lib/themeContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LeftBar() {

  const [isOpen, setIsOpen] = useState(false);
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

  //色系処理

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

  //投稿処理

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
      setIsOpen(false);
    }
  }

  return (
    <div>
      <div style={{ color: textColor }} className="w-[80px] xl:w-[280px] 2xl:w-[400px] min-[1920px]:!w-[500px] bg-background md:border-r border-gray-200 h-15 md:h-screen sticky top-0 flex justify-between shrink-0">
        <div className="flex md:flex md:flex-col xl:mt-19 xl:mr-10 ml-auto md:mr-3 md:mt-13">
          <div className="flex gap-5 items-center rounded-3xl p-3">
            <div className="font-bold text-xl hidden xl:flex">KOTATSU</div>
          </div>
          <Link href={"/home"} className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
            <FiHome className="w-7 h-7 stroke-[1.6]" />
            <div className="text-base hidden xl:flex">ホーム</div>
          </Link>
          <Link href={"/notifications"} className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
            <FiBell className="w-7 h-7 stroke-[1.6]" />
            {unreadCount > 0 && <span className="fixed mb-7 text-sm ml-3 text-center bg-red-400 text-white rounded-4xl w-5 h-5">{unreadCount}</span>}
            <div className="text-base hidden xl:flex">通知</div>
          </Link>
          <Link href={"/archive"} className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
            <FiBook className="w-7 h-7 stroke-[1.6]" />
            <div className="text-base hidden xl:flex">アーカイブ</div>
          </Link>
          <Link href="/profile" className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
            <FiUser className="w-7 h-7 stroke-[1.6]" />
            <div className="text-base hidden xl:flex">プロフィール</div>
          </Link>
          <Link href={"/setting"} className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
            <FiSettings className="w-7 h-7 stroke-[1.6]" />
            <div className="text-base hidden xl:flex">設定</div>
          </Link>
          <button onClick={() => setIsOpen(true)} style={{ backgroundColor: buttonColor }} className="rounded-3xl w-full h-10 mt-5 text-white font-bold cursor-pointer">投稿</button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pb-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
          <div className="bg-white rounded-lg px-5 py-4 z-10 w-[500px] h-[255px]">
            <div className="hover:bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer">
              <FiX className="" onClick={() => setIsOpen(false)} />
            </div>
            <div className="flex flex-col gap-3 mt-3 mb-4">
              <h2 className="text-xl font-bold">投稿</h2>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} name="" id="" maxLength={100} placeholder="今、共有したいことは？" className="w-full h-20 focus:outline-none resize-none p-1.5 rounded-lg mb-1"></textarea>
            </div>
            <div className="flex justify-end mt-5 items-center gap-5">
              <button onClick={() => {
                post();
              }}  style={{ backgroundColor: buttonColor }} className="text-white font-bold py-2 px-4 rounded-3xl cursor-pointer">投稿する</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}