"use client";

import { useEffect, useState } from "react";
import { useLoginChecker } from "../../lib/loginChecker";

import Header from "../components/header";
import LoginForm from "../components/loginForm"
import LoadingScreen from "../components/loading"
import { supabase } from "@/lib/supabase";
import Link from "next/link";


export default function ArchiveList() {


    const { user, loading } = useLoginChecker();
    const [isMinLoadTime, setIsMinLoadTime] = useState(false);
    const [archives, setArchives] = useState<any[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMinLoadTime(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const createArchives = async () => {
            const { data, error } = await supabase.from("archive_threads").select("*").order("archived_at", { ascending: false }).limit(5);
            if (error) {
                (console.error)
            } else {
                setArchives(data || []);

            }
        };

        if (user) {
            createArchives();
        }
    }, [user]);



    if (loading || !isMinLoadTime) {
        return <LoadingScreen />;
    }

    if (!user) { return <LoginForm />; }

    const displayName = user?.user_metadata?.display_name
    const registrationDate = user?.created_at ? new Date(user.created_at).toLocaleDateString("ja-JP") : "";

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="w-[690px] bg-white min-h-full px-10 py-8">
                <div className="flex flex-col">
                    <div className="flex flex-col border-b border-gray-200 mb-5">
                        <div className="text-2xl font-bold">Archive</div>
                        <div className="text-lg mb-5">最近のこたつを5個まで遡って見ることができます。</div>
                    </div>
                    <div className="flex flex-col">
                        {archives?.map((thread) => (
                            <Link key={thread.id} href={`/archive/${thread.id}`} className="mb-5 py-1 hover:bg-gray-100">
                                <div className="flex flex-col">
                                    <span>{thread.title}</span>
                                    <span className="text-gray-400 text-sm">{thread.first_statement}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}