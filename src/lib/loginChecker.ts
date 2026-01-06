"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useLoginChecker(){
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user)
            setLoading(false)
        };
        checkLogin();

        const { data: loginStatus } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            loginStatus.subscription.unsubscribe();
        };
    }, []);
    
    return {user, loading};
}