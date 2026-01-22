"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FiHeart } from "react-icons/fi";

export default function RandomPost({changePostTrigger}: {changePostTrigger: number}) {
    const [post, setpost] = useState<any>(null);
    const [isLiked, setIsLiked] = useState(false);
    const [ispost, setispost] = useState(false);
    const [likeCount, setlikeCount] = useState<number>(0);
    const lastPost = useRef<any>(null);

    const getPostAndLikes = useCallback(async () => {
        setispost(false);
        setIsLiked(false);
        setlikeCount(0);
        setpost(null);

        const { data: postData } = await supabase.rpc('get_random_post', {exclude_id: lastPost.current ? String(lastPost.current):null});

        if (postData && postData.length > 0) {
            const randomPost = postData[0];

            const { data: { session } } = await supabase.auth.getSession();
            let user = session?.user || null;

            if (!user) {
                const { data: { user: retry } } = await supabase.auth.getUser();
                user = retry;
            }

            const { count } = await supabase.from('likes')
                .select('*', { count: 'exact', head: true })
                .eq('post_id', randomPost.id);

            let liked = false;
            if (user) {
                const { data: likeData, error: likeError } = await supabase
                    .from('likes')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('post_id', randomPost.id)
                    .maybeSingle();

                liked = !!likeData;
            }
            setlikeCount(count || 0);
            setIsLiked(liked);
            setpost(randomPost);
            setispost(true);
            lastPost.current = randomPost.id;
        }
    }, []);

    const like = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || !post?.id) return;

        setIsLiked(true);

        const { error } = await supabase.from('likes').insert({
            user_id: user?.id,
            post_id: post.id,
            post_content: post.content
        });
        if (error) {
            setIsLiked(false);
        }
    };

    useEffect(() => {
        getPostAndLikes();
    }, [getPostAndLikes, changePostTrigger]);

    useEffect(() => {
        if (!post?.id) return;

        const channel = supabase.channel(`likes_${post.id}`).on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'likes',
            filter: `post_id=eq.${post.id}`
        },
            (payload) => {
                setlikeCount((prev) => prev + 1);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [post?.id]);

    return (
        <div className="w-full h-full flex">
            <div className="w-full h-full bg-background border-3 border-secondbg p-5 shadow-[0px_0px_20px_0.1px_rgba(0,3,3,0.03)]">
                {ispost && <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="text-gray-500 text-sm">{post.user_name}</div>
                        <div className="text-gray-400 text-xs">{post.created_at ? new Date(post.created_at).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', }) : ""}</div>
                    </div>
                    <div className="text-sm">{post.content}</div>
                    {!ispost && <div className="text-sm">今日の初投稿者になりましょう</div>}
                    <div className="flex items-center gap-2 group transition-all">
                        <button onClick={like} disabled={isLiked}><FiHeart stroke={isLiked ? "#ef4444" : "#c0c6c9"} fill={isLiked ? "#ef4444" : "transparent"} className={`transition-transform duration-200 ${isLiked ? `scale-120` : `group-hover:scale-110`}`} /></button>
                        <div>{likeCount}</div>
                    </div>
                </div>}
                {!ispost && <div className="text-sm">今日の初投稿者になりましょう</div>}
            </div>
        </div>
    )
}