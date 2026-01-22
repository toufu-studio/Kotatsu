"use client";

import { useEffect, useState } from "react";
import { useLoginChecker } from "../../lib/loginChecker";

import Header from "../components/header";
import LoginForm from "../components/loginForm"
import LoadingScreen from "../components/loading"
import { supabase } from "@/lib/supabase";
import Link from "next/link";

import { FiBell } from "react-icons/fi";

export default function notifications() {

    const { user, loading } = useLoginChecker();
    const [isMinLoadTime, setIsMinLoadTime] = useState(false);

    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMinLoadTime(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const getNotifications = async (userId:string) => {
        const { data, error } = await supabase.from('notifications').select(`id,type,created_at,is_read,post_id,sender_name,post_content`).eq('user_id', userId).order('created_at', { ascending: false });

        if (!error) setNotifications(data || []);
    };

    useEffect(() => {
        const unreadMark = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const {error: updataError} = await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id).eq('is_read', false);
            if (updataError){
                console.error(updataError);
                return;
            }
            await getNotifications(user.id);
        };
        unreadMark();
    }, []);

    if (loading || !isMinLoadTime) {
        return <LoadingScreen />;
    }

    if (!user) { return <LoginForm />; }

    return (
        <div className="flex flex-col items-center min-h-screen bg-secondbg">

            <div className="w-80 md:w-[690px] bg-background text-foreground min-h-full mx-10 my-8 px-10 py-8 rounded-xl border-secondbg border-4 shadow-[0px_0px_20px_0.1px_rgba(0,3,3,0.05)]">
                <div className="flex flex-col">
                    <div className="flex flex-col border-b border-gray-200 mb-5">
                        <div className="flex items-center gap-3 mb-5">
                            <FiBell className="w-7 h-7" />
                            <div className="text-2xl font-bold">Notifications</div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        {notifications.map((notification) => (
                            <div key={notification.id} className="flex flex-col gap-3 mb-5 py-1 hover:bg-gray-100">
                                <div className="flex justify-between">
                                    <span>{notification.sender_name}さんがあなたの投稿にいいねしました</span>
                                    <span className="text-sm text-gray-400">{new Date(notification.created_at).toLocaleString('ja-JP',{year:'numeric',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'})}</span>
                                </div>
                                <div className="text-sm text-gray-400">{notification.post_content}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}