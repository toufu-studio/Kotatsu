"use client";

import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { useBGTheme } from "@/lib/themeContext";

export default function ApplyButton() {

    const {themeColor} = useBGTheme();

    const [title, setTitle] = useState("");
    const [firstStatement, setFirstStatement] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [isApply, setIsApply] = useState(false);
    const [pushApply, setPushApply] = useState(false);
    const [isRecrutingError, setIsRecrutingError] = useState(false);

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

        if (!isRecruiting) {
            setIsRecrutingError(true);
            return;
        }

        if (!title || !firstStatement) return;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return;
        }

        const displayName = user?.user_metadata?.display_name

        const { error } = await supabase
            .from("submitted_threads")
            .insert([
                {
                    title: title,
                    first_statement: firstStatement,
                    author_id: user.id,
                    user_name: displayName,
                },

            ]);

        if (error) {
            if (error.code === '23505') {
                setIsApply(true);
            } else {
                setTitle("");
                setFirstStatement("");
                setIsOpen(false);
            }
        };
        setPushApply(true);
    };

    const getButtonColor = () =>{
        if (themeColor === "rgb(249, 250, 251)") {
            return "rgb(141, 111, 113)";
        }
        return `color-mix(in srgb, ${themeColor}, black 15%)`;
    }

    const buttonColor = getButtonColor();

    return (
        <div>
            {isRecruiting ? (<button onClick={() => { setIsOpen(true); setIsRecrutingError(false);; setIsApply(false); }} style={{backgroundColor: buttonColor}} className="duration-100 text-white font-bold py-2 px-4 rounded-3xl cursor-pointer w-[144px] text-center text-sm">トピックを応募</button>) : (<div  style={{backgroundColor: buttonColor}} className="hover:bg-[#9c7c7e] duration-100 text-white py-2 px-4 rounded-3xl cursor-pointer w-[144px] text-center text-sm">募集開始待機中</div>)}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
                    <div className="bg-white rounded-lg px-5 py-4 z-10 w-[700px] h-[450px]">
                        <div className="hover:bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer">
                            <FiX className="" onClick={() => setIsOpen(false)} />
                        </div>
                        <div className="flex flex-col gap-1 mt-5 mb-4">
                            <h2 className="text-xl font-bold">トピックを応募</h2>
                            <p className="text-sm text-gray-500">ランダムで3つのトピックが選ばれます。</p>
                        </div>

                        <p className="mb-3">トピックのタイトル</p>
                        <textarea value={title} onChange={(e) => setTitle(e.target.value)} name="" id="" maxLength={35} placeholder="新作のゲームでおすすめ教えて" className="w-full h-10 border p-1.5 border-gray-200 rounded-lg mb-1 resize-none"></textarea>
                        <div className="text-right text-sm text-gray-500">残り{maxTitleChar - title.length}文字</div>

                        <p className="mb-3">最初の発言</p>
                        <textarea value={firstStatement} onChange={(e) => setFirstStatement(e.target.value)} name="" id="" maxLength={maxchar} placeholder="最初に投稿される文章を入力..." className="w-full h-20 border p-1.5 border-gray-200 rounded-lg mb-1 resize-none"></textarea>
                        <div className="text-right text-sm text-gray-500">残り{maxchar - firstStatement.length}文字</div>
                        <div className="flex justify-end mt-5 items-center gap-5">
                            {pushApply && <p className="text-black text-sm">応募が完了しました！ :)</p>}
                            {isApply && <p className="text-red-500 text-sm">既に応募済みです :)</p>}
                            {isRecrutingError && <p className="text-red-500 text-sm">募集時間外です :)</p>}
                            <button onClick={() => {
                                SendThread();
                            }}  style={{ backgroundColor: buttonColor }} className="text-white font-bold py-2 px-4 rounded-3xl cursor-pointer">応募する</button>
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