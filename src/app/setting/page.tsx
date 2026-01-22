"use client";

import { useEffect, useState } from "react";
import { useLoginChecker } from "../../lib/loginChecker";

import Header from "../components/header";
import LoadingScreen from "../components/loading"
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import LoginForm from "../components/loginForm";
import { useBGTheme } from "@/lib/themeContext";

import { FiSettings } from "react-icons/fi";


export default function Profile() {

    const { user, loading } = useLoginChecker();
    const [isMinLoadTime, setIsMinLoadTime] = useState(false);
    const { colorChange } = useBGTheme();

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

        const { error } = await supabase.rpc(`delete_user_self`);

        if (error) {
            alert("エラーが発生し、アカウント削除に失敗しました。" + error.message);
        } else {
            alert("アカウント削除が完了しました。ご利用ありがとうございました。");
            await supabase.auth.signOut();
            window.location.href = "/home";
        }
    }

    return (
        <div className="flex items-center flex-col min-h-screen bg-secondbg">

            <div className="w-80 md:w-[690px] bg-background text-foreground mx-10 my-8 px-10 py-8 rounded-xl shadow-[0px_0px_20px_0.1px_rgba(0,3,3,0.05)]">
                <div className="flex flex-col md:h-full">
                    <div className="flex items-center border-b border-gray-200 mb-5 gap-3">
                        <FiSettings className="w-7 h-7 mb-5" />
                        <div className="text-2xl font-bold mb-5">Settings</div>
                    </div>
                    <div className="flex flex-col gap-5 mt-5 mb-10">
                        <h2 className="text-xl font-bold">Theme Color</h2>
                        <div className="flex flex-wrap gap-5">
                            <button onClick={() => colorChange("rgb(249, 250, 251)")} className="bg-[rgb(249,250,251)] h-15 w-15 text-black rounded-xl cursor-pointer flex justify-center items-center relative group hover:-translate-y-1 ease-out transition-transform"><span className="hidden md:flex absolute opacity-0 group-hover:opacity-100 transition-opacity ease-out">標準</span><span className="flex md:hidden">標準</span></button>
                            <button onClick={() => colorChange("rgb(235, 246, 247)")} className="bg-[rgb(235,246,247)] h-15 w-15 text-black rounded-xl cursor-pointer flex justify-center items-center relative group hover:-translate-y-1 ease-out transition-transform"><span className="hidden md:flex absolute opacity-0 group-hover:opacity-100 transition-opacity ease-out">藍白</span><span className="flex md:hidden">藍白</span></button>
                            <button onClick={() => colorChange("rgb(234, 244, 252)")} className="bg-[rgb(234,244,252)] h-15 w-15 text-black rounded-xl cursor-pointer flex justify-center items-center relative group hover:-translate-y-1 ease-out transition-transform"><span className="hidden md:flex absolute opacity-0 group-hover:opacity-100 transition-opacity ease-out">月白</span><span className="flex md:hidden">月白</span></button>
                            <button onClick={() => colorChange("rgb(193, 228, 233)")} className="bg-[rgb(193,228,233)] h-15 w-15 text-white rounded-xl cursor-pointer flex justify-center items-center relative group hover:-translate-y-1 ease-out transition-transform"><span className="hidden md:flex absolute opacity-0 group-hover:opacity-100 transition-opacity ease-out">白藍</span><span className="flex md:hidden">白藍</span></button>
                            <button onClick={() => colorChange("rgb(219, 208, 230)")} className="bg-[rgb(219,208,230)] h-15 w-15 text-white rounded-xl cursor-pointer flex justify-center items-center relative group hover:-translate-y-1 ease-out transition-transform"><span className="hidden md:flex absolute opacity-0 group-hover:opacity-100 transition-opacity ease-out">白藤</span><span className="flex md:hidden">白藤</span></button>
                            <button onClick={() => colorChange("rgb(187, 200, 230)")} className="bg-[rgb(187,200,230)] h-15 w-15 text-white rounded-xl cursor-pointer flex justify-center items-center relative group hover:-translate-y-1 ease-out transition-transform"><span className="hidden md:flex absolute opacity-0 group-hover:opacity-100 transition-opacity ease-out">淡藤</span><span className="flex md:hidden">淡藤</span></button>
                            <button onClick={() => colorChange("rgb(192, 162, 199)")} className="bg-[rgb(192,162,199)] h-15 w-15 text-white rounded-xl cursor-pointer flex justify-center items-center relative group hover:-translate-y-1 ease-out transition-transform"><span className="hidden md:flex bsolute opacity-0 group-hover:opacity-100 transition-opacity ease-out">薄葡萄</span><span className="flex md:hidden">薄葡萄</span></button>
                            <button onClick={() => colorChange("rgb(185, 208, 139)")} className="bg-[rgb(185,208,139)] h-15 w-15 text-white rounded-xl cursor-pointer flex justify-center items-center relative group hover:-translate-y-1 ease-out transition-transform"><span className="hidden md:flex absolute opacity-0 group-hover:opacity-100 transition-opacity ease-out">若葉</span><span className="flex md:hidden">若葉</span></button>
                            <button onClick={() => colorChange("rgb(190, 211, 202)")} className="bg-[rgb(190,211,202)] h-15 w-15 text-white rounded-xl cursor-pointer flex justify-center items-center relative group hover:-translate-y-1 ease-out transition-transform"><span className="hidden md:flex absolute opacity-0 group-hover:opacity-100 transition-opacity ease-out">千草鼠</span><span className="flex md:hidden">千草鼠</span></button>
                            <button onClick={() => colorChange("rgb(166, 200, 178)")} className="bg-[rgb(166,200,178)] h-15 w-15 text-white rounded-xl cursor-pointer flex justify-center items-center relative group hover:-translate-y-1 ease-out transition-transform"><span className="hidden md:flex absolute opacity-0 group-hover:opacity-100 transition-opacity ease-out">錆青磁</span><span className="flex md:hidden">錆青磁</span></button>
                            <button onClick={() => colorChange("rgb(246, 173, 73)")} className="bg-[rgb(246,173,73)] h-15 w-15 text-white rounded-xl cursor-pointer flex justify-center items-center relative group hover:-translate-y-1 ease-out transition-transform"><span className="hidden md:flex absolute opacity-0 group-hover:opacity-100 transition-opacity ease-out">柑子</span><span className="flex md:hidden">柑子</span></button>
                            <button onClick={() => colorChange("rgb(201, 117, 134)")} className="bg-[rgb(201,117,134)] h-15 w-15 text-white rounded-xl cursor-pointer flex justify-center items-center relative group hover:-translate-y-1 ease-out transition-transform"><span className="hidden md:flex absolute opacity-0 group-hover:opacity-100 transition-opacity ease-out">長春</span><span className="flex md:hidden">長春</span></button>
                            <button onClick={() => colorChange("rgb(241, 144, 114)")} className="bg-[rgb(241,144,114)] h-15 w-15 text-white rounded-xl cursor-pointer flex justify-center items-center relative group hover:-translate-y-1 ease-out transition-transform"><span className="hidden md:flex absolute opacity-0 group-hover:opacity-100 transition-opacity ease-out">東雲</span><span className="flex md:hidden">東雲</span></button>
                            <button onClick={() => colorChange("rgb(165, 149, 100)")} className="bg-[rgb(165,149,100)] h-15 w-15 text-white rounded-xl cursor-pointer flex justify-center items-center relative group hover:-translate-y-1 ease-out transition-transform"><span className="hidden md:flex absolute opacity-0 group-hover:opacity-100 transition-opacity ease-out">利休茶</span><span className="flex md:hidden">利休茶</span></button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 md:mt-0 mb-5">
                        <h2 className="text-xl font-bold">Account</h2>
                        <button onClick={Logout} className="bg-[#302833] h-10 text-white cursor-pointer">ログアウト</button>
                        <button onClick={() => { deleteAccount(); }} className="bg-[#b94047] h-10 text-white cursor-pointer">アカウントを削除</button>
                    </div>
                </div>
            </div>
        </div>
    );
}