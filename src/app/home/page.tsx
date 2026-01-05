"use client";

import { useEffect, useState } from "react";
import { useLoginChecker } from "../../lib/loginChecker";

import Header from "../components/header";
import LoginForm from "../components/loginForm"
import LoadingScreen from "../components/loading"


export default function Profile() {

    const { user, loading } = useLoginChecker();
    const [isMinLoadTime, setIsMinLoadTime] = useState(false);

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
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="w-[690px] bg-white min-h-full px-10 py-8">
                <div className="flex flex-col h-screen">
                    <div className="flex flex-col border-b border-gray-200 mb-5">
                        <div className="text-2xl font-bold mb-5">Home</div>
                    </div>
                    <div className="text-lg mb-10">{displayName}さん、ようこそ！</div>
                    <div className="flex flex-col border-b border-gray-200 mb-5">
                        <div className="text-2xl font-bold mb-5">Hint</div>
                    </div>
                    <div className="flex flex-col text-lg mb-10 gap-5">
                        <div>[?] 右側の「現在のこたつ」から好きなトピックを選んで会話してみましょう。</div>
                        <div>[?] 毎時45分からトピックの募集が始まり、毎時0分にランダムで3つが選ばれます。</div>
                    </div>
                </div>
            </div>
        </div>
    );
}