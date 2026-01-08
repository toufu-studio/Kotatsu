"use client";

import "../globals.css";

import { useState } from "react";

import EmojiPicker from 'emoji-picker-react';

import { FiSend, FiSmile } from "react-icons/fi";

import { supabase } from "../../lib/supabase";
import { DiVim } from "react-icons/di";

export default function InputBar({ threadId }: { threadId: number }) {
    const [message, setMessage] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    const maxchar = 140;

    const onEmojiClick = (emojiData: { emoji: string }) => {
        setMessage((prev) => prev + emojiData.emoji);
    };

    const SendMessage = async () => {
        if (message.trim() === "") return;
        const { data: { user } } = await supabase.auth.getUser();

        const displayName = user?.user_metadata?.display_name

        const { error } = await supabase
            .from("posts")
            .insert([
                {
                    thread_id: threadId,
                    content: message,
                    user_name: displayName,
                },
            ]);

        if (error) {
            console.error("Error Details:", error.message);
        } else {
            setMessage("");
            setShowPicker(false);
        }
    };

    return (
        <div className="sticky bottom-0 h-20 border-t border-gray-200 flex items-center bg-background text-foreground shadow-[0_-1px_4px_rgba(0,0,0,0.05)] px-4 gap-4">

            <div className="relative flex items-center">
                <button onClick={() => setShowPicker(!showPicker)} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer">
                    <FiSmile className="w-6 h-6 stroke-[1.6]" />
                </button>
                {showPicker && (
                    <div>
                        <div onClick={() => setShowPicker(false)} className="fixed inset-0 z-[40]" />

                        <div className="absolute bottom-full left-0 mb-7 z-[50]">
                            <EmojiPicker onEmojiClick={onEmojiClick} width={350} height={400} />
                        </div>
                    </div>)}
            </div>


            <div className="flex-1 h-12 relative">
                <textarea value={message} maxLength={maxchar} onChange={(e) => setMessage(e.target.value)} name="" id="" placeholder="メッセージを入力..." className="w-full h-full outline-none overflow-y-auto resize-none align-bottom p-2 border-b border-gray-200" />
            </div>

            <div>
                <div className="text-sm text-gray-500">{maxchar - message.length}</div>
            </div>

            <button onClick={SendMessage} className="w-11 md:w-30 shrink-0 bg-[#8d6f71] hover:bg-[#9c7c7e] duration-100 text-white font-bold py-2 items-center rounded-3xl cursor-pointer">
                <div className="flex items-center justify-center gap-2">
                    <FiSend className="mr-1 pt-0.5 w-7 h-7 stroke-[1.6]" />
                    <span className="hidden md:flex">発言</span>
                </div>
            </button>

        </div>
    );
}