"use client";

import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { supabase } from "@/lib/supabase";

export default function ApplyButton() {

    const [title, setTitle] = useState("");
    const [firstStatement, setFirstStatement] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    const maxchar = 140;
    const maxTitleChar = 35;

    const now = new Date();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer)
    }, []);

    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const isRecruiting = minutes >= 45;

        const SendThread = async () => {
        if (!title || !firstStatement) return;

        const { error } = await supabase
            .from("submitted_threads")
            .insert([
                {
                    title: title,
                    first_statement: firstStatement,
                },
            ]);

        if (error) {
            console.error("Error:", error);
        } else {
            setTitle("");
        }
    };

    return (
        <div>
            {isRecruiting ? (<button onClick={() => setIsOpen(true)} className="bg-[#8d6f71] hover:bg-[#9c7c7e] duration-100 text-white font-bold py-2 px-4 rounded-3xl cursor-pointer w-[144px] text-center">トピックを応募</button>) : (<div className="bg-[#8d6f71] hover:bg-[#9c7c7e] duration-100 text-white font-bold py-2 px-4 rounded-3xl cursor-pointer w-[144px] text-center">募集開始待機中</div>)}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
                    <div className="bg-white rounded-lg px-5 py-5 z-10 w-[700px] h-[450px]">
                        <div className="hover:bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer">
                            <FiX className="" onClick={() => setIsOpen(false)} />
                        </div>
                        <h2 className="text-xl font-bold mb-4 mt-10">トピックを応募</h2>

                        <p className="mb-3">トピックのタイトル</p>
                        <textarea value={title} onChange={(e) => setTitle(e.target.value)} name="" id="" maxLength={35} className="w-full h-10 border p-1.5 border-gray-200 rounded-lg mb-1"></textarea>
                        <div className="text-right text-sm text-gray-500">残り{maxTitleChar - title.length}文字</div>

                        <p className="mb-3">最初の発言</p>
                        <textarea value={firstStatement} onChange={(e) => setFirstStatement(e.target.value)} name="" id="" maxLength={maxchar} className="w-full h-20 border p-1.5 border-gray-200 rounded-lg mb-1"></textarea>
                        <div className="text-right text-sm text-gray-500">残り{maxchar - firstStatement.length}文字</div>
                        <div className="flex justify-end mt-5">
                            <button onClick={() => {
                                SendThread();
                                setIsOpen(false);
                            }} className="bg-[#8d6f71] hover:bg-[#af8f92] text-white font-bold py-2 px-4 rounded-3xl cursor-pointer">応募する</button>
                        </div>
                    </div>
                </div>
            )}
            <div>
                {isRecruiting ? (<div className="text-xs text-gray-400 ml-2.5 mt-2">こたつリセットまで: {minutes === 59 ? `${60 - seconds}秒` : `${60 - minutes}分`}</div>) : (<div className="text-xs text-gray-400 ml-2.5 mt-2">次のトピック募集まで: {minutes === 44 ? `${60 - seconds}秒` : `${45 - minutes}分`}</div>)}
            </div>
        </div>
    );
};