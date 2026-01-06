"use client";

import { useEffect, useState } from "react";
import { useLoginChecker } from "../../lib/loginChecker";

import Header from "../components/header";
import LoadingScreen from "../components/loading"
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import LoginForm from "../components/loginForm";

import { FiUser } from "react-icons/fi";


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

    return (
        <div className="flex flex-col min-h-screen">

            <div className="w-full md:w-[690px] bg-white min-h-full px-10 py-8">
                <div className="flex flex-col h-screen">
                    <div className="flex items-center border-b border-gray-200 mb-5 gap-3">
                        <FiUser className="w-7 h-7 mb-5" />
                        <div className="text-2xl font-bold mb-5">Profile</div>
                    </div>
                    <div className="text-3xl mb-1">{displayName}</div>
                    <div className="text-lg">{registrationDate}からこたつに入っています。</div>
                </div>
            </div>
        </div>
    );
}