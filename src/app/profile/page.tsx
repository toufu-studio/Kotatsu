"use client";

import { useEffect, useState } from "react";
import { useLoginChecker } from "../../lib/loginChecker";

import Header from "../components/header";
import LoadingScreen from "../components/loading"


export default function Profile() {

    const { user, loading } = useLoginChecker();
    const [ isMinLoadTime, setIsMinLoadTime ] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMinLoadTime(true);
        },300);
    return () => clearTimeout(timer);
}, []);

if (loading || !isMinLoadTime) {
    return <LoadingScreen />;
}

    const displayName = user?.user_metadata?.display_name
    const registrationDate = user?.created_at ? new Date(user.created_at).toLocaleDateString("ja-JP"):"";

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="w-[690px] bg-white min-h-full px-10 py-8">
                <div className="flex flex-col">
                    <div className="flex flex-col border-b border-gray-200 mb-5">
                        <div className="text-2xl font-bold">Profile</div>
                        <div className="text-lg mb-5">{displayName}さん</div>
                        <div className="text-2xl font-bold">{displayName}さんは</div>
                    <div className="text-xl">{registrationDate}からこたつに入っています。</div>
                    <button className="bg-red-500 h-10 mt-10 text-whi">アカウントを削除</button>
                    </div>
                </div>
            </div>
        </div>
    );
}