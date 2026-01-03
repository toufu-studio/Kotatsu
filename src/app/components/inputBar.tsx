"use client";

import "../globals.css";

import { FiSend, FiPlus } from "react-icons/fi";

import { supabase } from "../../lib/supabase";
import { useState } from "react";

export default function InputBar({ threadId }: { threadId: number }) {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("てすとたろう");

    const handleSend = async () => {
        if (message.trim() === "") return;

        const { error } = await supabase
            .from("posts")
            .insert([
                {
                    thread_id: threadId,
                    content: message,
                    user_name: "username",
                },
            ]);

        if (error) {
            console.error("Error:", error);
        } else {
            setMessage("");
        }
    };

    return (
        <div className="sticky bottom-0 h-20 border-t border-gray-200 flex items-center bg-white shadow-[0_-1px_4px_rgba(0,0,0,0.05)] px-4 gap-4">
            
            <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
                <FiPlus className="w-6 h-6 stroke-[1.6]" />
            </button>
            

            <div className="flex-1 h-12 relative">
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} name="" id="" placeholder="メッセージを入力..." className="w-full h-full outline-none overflow-y-auto resize-none align-bottom p-2 border-b border-gray-200" />
            </div>

            <button onClick={handleSend} className="w-30 shrink-0 bg-[#8d6f71] hover:bg-[#af8f92] text-white font-bold py-2 items-center rounded-3xl">
                <div className="flex items-center justify-center gap-2">
                    <FiSend className="w-7 h-7 stroke-[1.6]" />
                    <span>発言</span>
                </div>
            </button>

        </div>
    );
}