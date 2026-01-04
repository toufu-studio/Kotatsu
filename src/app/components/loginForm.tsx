"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginForm() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [user, setUser] = useState<any>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showSpaceError, setShowSpaceError] = useState(false);
    const [showPasswordSpaceError, setShowPasswordSpaceError] = useState(false);

    const maxchar = 30;
    const maxPasswordChar = 20;
    const email = `${userName}@example.com`;

    //ユーザーがログインしてるか確認するとこ
    useEffect(() => {
        const checkLogin = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user)
            if (!user) setIsOpen(true);
        };
        checkLogin();

        const { data: loginStatus } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            loginStatus.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (user) { setIsOpen(false) };
    },[user]);

    //スクロールできなくする
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }), [isOpen]

    //サインアップするとこ
    const SignUp = async () => {

        if (!userName || !userPassword) {
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: `${userName}@example.com`,
            password: userPassword,
            options: { data: { display_name: userName } }
        });

        if (!error) {
            setIsOpen(false);
        }
    }

    return (
        <div>
            {/*サインアップ画面*/}
            <div>{isOpen &&
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="flex justify-center items-center absolute inset-0 bg-white">
                        <div className="justify-center flex flex-col bg-white border-r border-gray-200 w-full pr-10 z-10 md:">
                            <div className="flex flex-col text-end gap-10">
                                <h1 className="font-bold text-9xl">Sign Up</h1>
                                <p>今までにないほどハイスピードな会話に参加しましょう。<br />個人情報は、不要です。</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center bg-white w-full rounded-lg pl-15 pr-70 py-5 z-10 w-full h-[450px]">
                            <h2 className="text-xl font-bold mb-5">KOTATSUのアカウントを作成</h2>
                            <div className="flex flex-col w-150">
                                <div className="flex items-center">
                                    <p className="mb-3">* 表示名（変更不可）</p>
                                    {showSpaceError && <p className="text-red-500 text-xs mb-2">スペースは使用できません。</p>}
                                </div>
                                <input value={userName} onChange={(e) => { const value = e.target.value; if (value.includes(" ") || value.includes("　")) { setShowSpaceError(true); return; } setShowSpaceError(false); setUserName(value); }} maxLength={30} placeholder="John_Smith" className="w-full h-10 border p-1.5 border-gray-200 rounded-lg mb-1"></input>
                                <div className="text-right text-sm text-gray-500">残り{maxchar - userName.length}文字</div>
                                <div className="flex items-center">
                                    <p className="mb-3">* パスワード（変更不可）</p>
                                    {showPasswordSpaceError && <p className="text-red-500 text-xs mb-2">スペースは使用できません。</p>}
                                </div>
                                <input value={userPassword} onChange={(e) => { const value = e.target.value; if (value.includes(" ") || value.includes("　")) { setShowPasswordSpaceError(true); return; } setShowPasswordSpaceError(false); setUserPassword(value); }} maxLength={30} placeholder="Password123" type="password" className="w-full h-10 border p-1.5 border-gray-200 rounded-lg mb-1"></input>
                                <div className="text-right text-sm text-gray-500">残り{maxPasswordChar - userPassword.length}文字</div>
                                <div className="flex justify-end mt-5 gap-5 items-center">
                                    <img src="/kotatsu_logo.svg" alt="" className="w-auto h-10" />
                                    <a href="" className="text-sm">アカウントをお持ちの場合</a>
                                    <button onClick={() => {
                                        SignUp();
                                    }} className="bg-[#8d6f71] hover:bg-[#af8f92] text-white font-bold py-2 px-4 rounded-3xl cursor-pointer">サインアップ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>

            {/*ログイン画面*/}
            <div>{isLoginOpen &&
                <div className="fixed inset-0 z-50 flex items-center">
                    <div className="flex justify-center items-center absolute inset-0 bg-white backdrop-blur-md">
                        <div className="justify-center flex flex-col bg-white border-r border-gray-200 w-full pr-10 py-5 z-10 w-[500px] h-[450px]">
                            <div className="flex flex-col text-end gap-10">
                                <h1 className="font-bold text-9xl">Sign Up</h1>
                                <p>今までにないほどハイスピードな会話に参加しましょう。<br />個人情報は、不要です。</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center bg-white w-full rounded-lg pl-15 pr-70 py-5 z-10 w-full h-[450px]">
                            <h2 className="text-xl font-bold mb-5 mt-10">KOTATSUのアカウントを作成</h2>
                            <div className="flex flex-col w-150">
                                <div className="flex items-center">
                                    <p className="mb-3">* 表示名（変更不可）</p>
                                    {showSpaceError && <p className="text-red-500 text-xs mb-2">スペースは使用できません。</p>}
                                </div>
                                <input value={userName} onChange={(e) => { const value = e.target.value; if (value.includes(" ") || value.includes("　")) { setShowSpaceError(true); return; } setShowSpaceError(false); setUserName(value); }} maxLength={30} placeholder="John_Smith" className="w-full h-10 border p-1.5 border-gray-200 rounded-lg mb-1"></input>
                                <div className="text-right text-sm text-gray-500">残り{maxchar - userName.length}文字</div>
                                <div className="flex items-center">
                                    <p className="mb-3">* パスワード（変更不可）</p>
                                    {showPasswordSpaceError && <p className="text-red-500 text-xs mb-2">スペースは使用できません。</p>}
                                </div>
                                <input value={userPassword} onChange={(e) => { const value = e.target.value; if (value.includes(" ") || value.includes("　")) { setShowPasswordSpaceError(true); return; } setShowPasswordSpaceError(false); setUserPassword(value); }} maxLength={30} placeholder="Password123" type="password" className="w-full h-10 border p-1.5 border-gray-200 rounded-lg mb-1"></input>
                                <div className="text-right text-sm text-gray-500">残り{maxPasswordChar - userPassword.length}文字</div>
                                <div className="flex justify-end mt-5 gap-5">
                                    <img src="/kotatsu_logo.svg" alt="" className="w-auto h-10" />
                                    <button onClick={() => {
                                        SignUp();
                                    }} className="bg-[#8d6f71] hover:bg-[#af8f92] text-white font-bold py-2 px-4 rounded-3xl cursor-pointer">サインアップ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>

    );
}