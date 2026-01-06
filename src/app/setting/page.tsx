"use client";

import { useEffect, useState } from "react";
import { useLoginChecker } from "../../lib/loginChecker";

import Header from "../components/header";
import LoadingScreen from "../components/loading"
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import LoginForm from "../components/loginForm";


export default function Profile() {

    const { user, loading } = useLoginChecker();
    const [isMinLoadTime, setIsMinLoadTime] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMinLoadTime(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const router = useRouter();
    const Logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) { router.push("/") };
    };

    if (loading || !isMinLoadTime) {
        return <LoadingScreen />;
    }

    const displayName = user?.user_metadata?.display_name
    const registrationDate = user?.created_at ? new Date(user.created_at).toLocaleDateString("ja-JP") : "";

    if (!user) {
        return <LoginForm />;
    }

    const deleteAccount = async () => {
        const confirm = window.confirm("アカウントを削除しますか？今までの投稿は残り、アカウントは二度と復旧できません。")
        if (!confirm) return;

        const {error} = await supabase.rpc(`delete_user_self`);

        if(error){
            alert("エラーが発生し、アカウント削除に失敗しました。" + error.message);
        }else {
            alert("アカウント削除が完了しました。ご利用ありがとうございました。");
            await supabase.auth.signOut();
            window.location.href = "/home";
        }
    }

    return (
        <div className="flex flex-col min-h-screen">

            <div className="w-full md:w-[690px] bg-white min-h-full px-10 py-8">
                <div className="flex flex-col h-screen">
                    <div className="flex flex-col border-b border-gray-200 mb-5">
                        <div className="text-2xl font-bold mb-5">Setting</div>
                    </div>
                    <div className="flex flex-col gap-5 mt-20">
                        <button onClick={Logout} className="bg-red-500 h-10 text-white">ログアウト</button>
                        <button onClick={()=>{deleteAccount();}} className="bg-red-500 h-10 text-white">アカウントを削除</button>
                    </div>
                </div>
            </div>
        </div>
    );
}