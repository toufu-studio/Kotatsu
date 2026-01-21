"use client";

import { useEffect, useState } from "react";
import { useLoginChecker } from "../../lib/loginChecker";

import Header from "../components/header";
import LoginForm from "../components/loginForm"
import LoadingScreen from "../components/loading"
import RandomPost from "../components/randompost";

import { FiHome, FiHelpCircle, FiBell, FiMail } from "react-icons/fi";
import { useBGTheme } from "@/lib/themeContext";


export default function Profile() {

    const { user, loading } = useLoginChecker();
    const [isMinLoadTime, setIsMinLoadTime] = useState(false);

    const [changePostTrigger, setChangePostTrigger] = useState(0);

    const pushChangePost = () => {
        setChangePostTrigger(prev => prev + 1);
    };

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

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMinLoadTime(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    if (loading || !isMinLoadTime) {
        return <LoadingScreen />;
    }

    const displayName = user?.user_metadata?.display_name
    const registrationDate = user?.created_at ? new Date(user.created_at).toLocaleDateString("ja-JP") : "";

    if (!user) { return <LoginForm />; }

    return (
        <div className="flex items-center flex-col md:min-h-screen bg-secondbg">

            <div className="w-80 md:w-[690px] bg-background text-foreground min-h-screen mx-10 my-8 px-10 py-8 rounded-xl shadow-[0px_0px_20px_0.1px_rgba(0,3,3,0.05)]">
                <div className="flex flex-col h-300 md:h-screen">
                    <div className="flex items-center border-b border-gray-200 mb-5 gap-3">
                        <FiHome className="w-7 h-7 mb-5" />
                        <div className="text-2xl font-bold mb-5">Home</div>
                    </div>
                    <div className="text-base mb-3">今日の投稿</div>
                    <div>
                        <RandomPost changePostTrigger={changePostTrigger} />
                    </div>
                    <button onClick={pushChangePost} style={{ backgroundColor: buttonColor }} className="shrink-0 rounded-3xl w-full md:w-50 h-10 mt-5 text-white cursor-pointer text-sm">ランダムで切り替え</button>
                    <div className="mt-10 flex items-center border-b border-gray-200 mb-5 gap-3">
                        <FiHelpCircle className="w-7 h-7 mb-5" />
                        <div className="text-2xl font-bold mb-5">Hint</div>
                    </div>
                    <div className="flex flex-col text-sm mb-10 gap-5">
                        <div>[ ? ] 投稿と応募に関する<a href="/guideline" className="text-foreground/60">ガイドライン</a>を確認してみましょう。</div>
                        <div>[ ? ] 一覧の「現在のこたつ」から好きなトピックを選んで会話してみましょう。</div>
                        <div>[ ? ] 毎時45分からトピックの募集が始まり、毎時0分にランダムで3つ選ばれます。</div>
                        <div>[ ? ] 「空のスレ」は、トピックの応募が足りなかった場合に出現します。空のスレでの会話は「アーカイブ」に表示されません。</div>
                    </div>
                    <div className="flex items-center border-b border-gray-200 mb-5 gap-3">
                        <FiMail className="w-7 h-7 mb-5" />
                        <div className="text-2xl font-bold mb-5">Support</div>
                    </div>
                    <div className="flex flex-col text-sm mb-5 gap-5">
                        <div>[ ! ] データベースの関係で、利用者数が一定を超えると一部の機能に問題が生じる可能性がございます。確認次第迅速に対応を行いますが、予めご了承して頂けると幸いです。</div>
                    </div>
                    <div className="flex flex-col text-sm mb-10 gap-5">
                        <div>バグの報告にご協力して頂ける場合は、<a href="https://x.com/Toufu_Studio" target="_blank" rel="noopener noreferrer" className="text-foreground/60">Xアカウント</a>のDMまでお願いします。</div>
                    </div>
                    <div className="flex items-center border-b border-gray-200 mb-5 gap-3">
                        <FiBell className="w-7 h-7 mb-5" />
                        <div className="text-2xl font-bold mb-5">Announce</div>
                    </div>
                    <div className="flex flex-col text-sm mb-5 gap-5">
                        <div>[ ! ] 2026/01/09　サービス開始準備中です。</div>
                    </div>
                </div>
            </div>
        </div>
    );
}