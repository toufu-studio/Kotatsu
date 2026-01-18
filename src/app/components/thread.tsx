"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

export default function PostsList({ threadId }: { threadId: number }) {
  const [posts, setPosts] = useState<{ id: number; username: string; content: string; postedAt: string }[]>([]);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const bottom = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false);
  };

  useEffect(() => {
    const CreatePosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("thread_id", threadId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error:", error);
      } else if (data) {
        const formattedPosts = data.map((post) => ({
          id: post.id,
          username: post.user_name,
          content: post.content,
          postedAt: new Date(post.created_at).toLocaleString(),
        }));
        setPosts(formattedPosts);
      }
    };

    CreatePosts();

    const subscription = supabase
      .channel("postsupdata")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts", filter: `thread_id=eq.${threadId}` },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newPost = payload.new;
            const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;

            setPosts((prevPosts) => [
              ...prevPosts,
              {
                id: newPost.id,
                username: newPost.user_name,
                content: newPost.content,
                postedAt: new Date(newPost.created_at).toLocaleString(),
              }
            ]);

            if (!isBottom) {
              setShowScrollButton(true);
            }
          } else if (payload.eventType === "DELETE") {
            CreatePosts();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [threadId]);

  useEffect(() => {
    if (posts.length === 0) return;

    if (!showScrollButton) {
      scrollToBottom();
    }
  }, [posts.length]);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
      if (isBottom) {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="flex-1 items-center flex flex-col justify-end bg-secondbg">
      {showScrollButton && (<div onClick={scrollToBottom} className="fixed z-50 bg-gray-200 hover:bg-gray-300 py-3 px-5 bottom-28 rounded-3xl text-blacks text-xs shadow-[0px_0px_20px_0.1px_rgba(0,3,3,0.3)] cursor-pointer">最新のメッセージまで移動</div>)}
      <div className="flex flex-col items-center mb-2 mt-6 w-full">
        <div className="flex flex-col w-full md:w-[690px] md:items-center">
          {posts.map((post, index) => (
            <div key={post.id} className="w-full md:w-150 mb-5 bg-background text-foreground px-10 md:px-5 xl:px-10 py-5 hover:bg-gray-50 rounded-xl shadow-[0px_0px_20px_0.1px_rgba(0,3,3,0.05)]">

              <div className="flex justify-between w-full md:w-full items-center">
                <div className="flex items-center w-full">
                  <div className="mr-2 text-sm text-gray-500">{index + 1}</div>
                  <div className="flex items-center w-full justify-between">
                    <div className="text-sm text-gray-500">{post.username}</div>
                    <div className="whitespace-nowrap text-xs text-gray-400">{post.postedAt}</div>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-sm w-full md:w-120 whitespace-pre-wrap wrap-break-word leading-relaxed">{post.content}</div>
            </div>


          ))}
        </div>
      </div>
      {

      }
      <div ref={bottom} />
    </main>
  );
} 