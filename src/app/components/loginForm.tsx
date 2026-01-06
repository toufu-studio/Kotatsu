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
    const [showUsernameError, setShowUsernameError] = useState(false);
    const [showLoginError, setShowLoginError] = useState(false);
        const [showPasswordError, setShowPasswordError] = useState(false);

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
    }, [user]);

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

        if (userPassword.length < 6) {
            setShowPasswordError(true);
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: `${userName}@example.com`,
            password: userPassword,
            options: { data: { display_name: userName } }
        });

        if (error) {
            if (error.status === 422) {
                setShowUsernameError(true);
            } else {
                setIsOpen(false);
            }
        }
    }

    const LogIn = async () => {

        if (!userName || !userPassword) {
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: `${userName}@example.com`,
            password: userPassword,
        });

        if (error) {
            if (error.status === 400) {
                setShowLoginError(true);
            } else {
                setIsLoginOpen(false);
            }
        }
    }

    return (
        <div>
            {/*サインアップ画面*/}
            <div>{isOpen &&
                <div className="fixed inset-0 z-50 flex items-center justify-center w-screen">
                    <div className="flex justify-center items-center absolute inset-0 bg-white">

                        <div className="hidden md:flex justify-center flex-col bg-white border-r border-gray-200 pr-10 z-10 mr-5 ml-10 lg:ml-auto">
                            <div className=" flex flex-col text-end gap-10">
                                <h1 className="font-bold text-5xl lg:text-9xl">Sign Up</h1>
                                <p className="text-sm lg:text-base">今までにないほどハイスピードな会話に参加しましょう。<br />個人情報は、不要です。</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center bg-white md:w-1/2 md:mr-10 lg:mr-10 lg:ml-10 rounded-lg py-5 z-10 h-[450px]">
                            <div className="flex flex-col w-full max-w-md items-center md:items-start">
                                <h2 className="text-xl font-bold mb-5">KOTATSUのアカウントを作成</h2>
                                <div className="flex items-center">
                                    <p className="mb-3">* ユーザー名（変更不可）</p>
                                    {showSpaceError && <p className="text-red-500 text-xs mb-2">スペースは使用できません。</p>}
                                    {showUsernameError && <p className="text-red-500 text-xs mb-2">ユーザー名が既に使用されています。</p>}
                                    {showPasswordError && <p className="text-red-500 text-xs mb-2">パスワードが短すぎます。(6文字以上)</p>}
                                </div>
                                <input value={userName} onChange={(e) => { const value = e.target.value; if (value.includes(" ") || value.includes("　")) { setShowSpaceError(true); return; } setShowSpaceError(false); setShowUsernameError(false); setUserName(value); }} maxLength={30} placeholder="John_Smith" className="w-full h-10 border p-1.5 border-gray-200 rounded-lg mb-1"></input>
                                <div className="mb-5 text-right text-sm text-gray-500">残り{maxchar - userName.length}文字</div>
                                <div className="flex items-center">
                                    <p className="mb-3">* パスワード（変更不可）</p>
                                    {showPasswordSpaceError && <p className="text-red-500 text-xs mb-2">スペースは使用できません。</p>}
                                </div>
                                <input value={userPassword} onChange={(e) => { const value = e.target.value; if (value.includes(" ") || value.includes("　")) { setShowPasswordSpaceError(true); return; } setShowPasswordSpaceError(false); setShowPasswordError(false); setUserPassword(value); }} maxLength={20} placeholder="Password123" type="password" className="w-full h-10 border p-1.5 border-gray-200 rounded-lg mb-1"></input>
                                <div className="text-right text-sm text-gray-500">残り{maxPasswordChar - userPassword.length}文字</div>
                                <div className="flex flex-col md:flex-row justify-end mt-10 md:mt-5 gap-5 items-center">
                                    <img src="/kotatsu_logo.svg" alt="" className="w-auto h-10 mb-4" />
                                    <button onClick={() => { setIsOpen(false), setIsLoginOpen(true); }} className="text-sm">アカウントをお持ちの場合</button>
                                    <button onClick={() => {
                                        SignUp();
                                    }} className="bg-[#8d6f71] hover:bg-[#af8f92] text-white font-bold py-2 px-4 rounded-3xl cursor-pointer">サインアップ</button>
                                </div>
                                <p className="text-xs mt-5 w-80 md:w-full">アカウントを作成することにより、<a href="/tos" target="_blank" className="text-blue-400">利用規約</a>と<a href="/privacy" target="_blank" className="text-blue-400">プライバシーポリシー</a>に同意したものとみなされます。</p>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>

            {/*ログイン画面*/}
            <div>{isLoginOpen &&
                <div className="fixed inset-0 z-50 flex items-center justify-center w-screen">
                    <div className="flex justify-center items-center absolute inset-0 bg-white">

                        <div className="hidden md:flex justify-center flex-col bg-white border-r border-gray-200 pr-10 z-10 mr-5 ml-10 lg:ml-auto">
                            <div className=" flex flex-col text-end gap-10">
                                <h1 className="font-bold text-5xl lg:text-9xl">Login</h1>
                                <p className="text-sm lg:text-base">お久しぶりです。<br />早速、会話に参加しましょう。</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center bg-white md:w-1/2 md:mr-10 lg:mr-10 lg:ml-10 rounded-lg py-5 z-10 h-[450px]">
                            <div className="flex flex-col w-full max-w-md items-center md:items-start">
                                <h2 className="text-xl font-bold mb-5">KOTATSUに入る</h2>
                                <div className="flex items-center">
                                    <p className="mb-3">ユーザー名</p>
                                    {showLoginError && <p className="text-red-500 text-xs mb-3">ユーザー名またはパスワードが違います。</p>}
                                </div>
                                <input value={userName} onChange={(e) => { const value = e.target.value; if (value.includes(" ") || value.includes("　")) { setShowSpaceError(true); return; } setShowSpaceError(false); setUserName(value); }} maxLength={30} placeholder="John_Smith" className="w-full h-10 border p-1.5 border-gray-200 rounded-lg mb-1"></input>
                                <div className="mb-5 text-right text-sm text-gray-500">残り{maxchar - userName.length}文字</div>
                                <div className="flex items-center">
                                    <p className="mb-3">パスワード</p>
                                    {showPasswordSpaceError && <p className="text-red-500 text-xs mb-2">スペースは使用できません。</p>}
                                </div>
                                <input value={userPassword} onChange={(e) => { const value = e.target.value; if (value.includes(" ") || value.includes("　")) { setShowPasswordSpaceError(true); return; } setShowPasswordSpaceError(false); setUserPassword(value); }} maxLength={20} placeholder="Password123" type="password" className="w-full h-10 border p-1.5 border-gray-200 rounded-lg mb-1"></input>
                                <div className="text-right text-sm text-gray-500">残り{maxPasswordChar - userPassword.length}文字</div>
                                <div className="flex flex-col md:flex-row justify-end mt-10 md:mt-5 gap-5 items-center">
                                    <img src="/kotatsu_logo.svg" alt="" className="w-auto h-10 mb-4" />
                                    <button onClick={() => { setIsOpen(true), setIsLoginOpen(false); }} className="text-sm">アカウントをお持ちでない場合</button>
                                    <button onClick={() => {
                                        LogIn();
                                    }} className="bg-[#8d6f71] hover:bg-[#af8f92] text-white font-bold py-2 px-4 rounded-3xl cursor-pointer">サインイン</button>
                                </div>
                                <p className="text-xs mt-5 w-80 md:w-full">アカウントを作成することにより、<a href="/tos" target="_blank" className="text-blue-400">利用規約</a>と<a href="/privacy" target="_blank" className="text-blue-400">プライバシーポリシー</a>に同意したものとみなされます。</p>
                            </div>
                        </div>
                    </div>
                </div>}
                </div>
            </div>

            );
}