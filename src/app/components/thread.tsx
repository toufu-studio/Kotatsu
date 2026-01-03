"use client";

import React, { use, useRef } from "react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home({ threadId }: { threadId: number }) {
  const [posts, setPosts] = useState<{ id: number; username: string; content: string; postedAt: string }[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
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

    fetchPosts();

    const subscription = supabase
    .channel("posts")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "posts", filter: `thread_id=eq.${threadId}` },
      (payload) => {
        const newPost = payload.new;
        setPosts((prevPosts) => [
          ...prevPosts,
          {
            id: newPost.id,
            username: newPost.user_name,
            content: newPost.content,
            postedAt: new Date(newPost.created_at).toLocaleString(),
          }
        ]);
      }
    )
    .subscribe();
    return () => {
        supabase.removeChannel(subscription);
    };
  }, [threadId]);


  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "auto" });
  }, [posts]);

  

  return (
    <main className="flex-1 flex flex-col justify-end">
      <div className="flex flex-col items-center mb-2 mt-6">
        <div className="flex flex-col w-[690px]">
          {posts.map((post, index) => (
            <div key={post.id} className="mb-5 bg-white px-10 py-1 hover:bg-gray-50">
              
              <div className="flex justify-between w-150 items-center">
                <div className="flex items-center">
                  <div className="mr-2 text-sm text-gray-500">{index + 1}</div>
                  <div className="text-sm text-gray-500">{post.username}</div>
                </div>
                <div className="whitespace-nowrap text-xs text-gray-400">{post.postedAt}</div>
              </div>
              <div className="mt-1 text-sm w-120">{post.content}</div>
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