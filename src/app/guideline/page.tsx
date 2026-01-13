"use client";

import { useEffect, useState } from "react";
import { useLoginChecker } from "../../lib/loginChecker";

import Header from "../components/header";
import LoginForm from "../components/loginForm"
import LoadingScreen from "../components/loading"

import { FiHome, FiHelpCircle, FiBell, FiMail } from "react-icons/fi";


export default function Profile() {

    const { user, loading } = useLoginChecker();
    const [isMinLoadTime, setIsMinLoadTime] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMinLoadTime(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    if (loading || !isMinLoadTime) {
        return <LoadingScreen />;
    }

    const displayName = user?.user_metadata?.display_name
    const registrationDate = user?.created_at ? new Date(user.created_at).toLocaleDateString("ja-JP") : "";

    if (!user) { return <LoginForm />; }

    return (
        <div className="flex items-center flex-col md:min-h-screen bg-secondbg">

            <div className="w-80 md:w-[690px] bg-background text-foreground min-h-screen mx-10 my-8 px-10 py-8 rounded-xl shadow-[0px_0px_20px_0.1px_rgba(0,3,3,0.05)]">
                <div className="flex flex-col h-250 md:h-310">
                    <div className="flex flex-col border-b border-gray-200 mb-5">
                        <div className="flex items-center gap-3">
                            <FiHome className="w-7 h-7" />
                            <div className="text-2xl font-bold">Guideline</div>
                        </div>
                        <div className="text-base mb-5 mt-2">あたたかいSNSを維持するためのガイドラインです。</div>
                    </div>
                     <div className="text-lg mb-5 font-bold">ーKOTATSUが目指すもの</div>
                     <div className="text-base mb-10">KOTATSUは、『癒しを分かち合うSNS』というコンセプトのもと、いつでも誰かと温もりを共有できる場所を目指しています。<br /><br />まるでこたつを囲んでいるときのような、他愛のない話題で盛り上がれる空間を作り、守っていくために、ユーザーの皆様のご協力をお願いいたします。</div>
                    <div className="text-lg mb-5 font-bold">ー送信する内容の全般に関するガイドライン</div>
                    <div className="text-base mb-10">禁止されている内容<br />・過度に暴力的な表現<br />・露骨な性的表現<br />・いじめ、差別につながる表現<br />・自殺、自傷行為、薬物乱用を誘引または助長する表現<br />・反社会的な内容を含み他人に不快感を与える表現<br />・政治、宗教、思想等、対立を生む可能性のある表現<br />・自他問わず、個人情報が含まれる、または特定される可能性のあるものが含まれる表現<br />・その他公序良俗に反する表現<br /><br />いつ、誰が見ても問題のない内容にすることを心掛けるよう、お願いいたします。</div>
                    <div className="text-lg mb-5 font-bold">ー発言に関するガイドライン</div>
                    <div className="text-base mb-10">禁止されている内容<br />・個人または組織、およびその発言に対して批判する行為<br />・スパムや意味のない文字列を故意に送信する行為<br />・他者同士の会話や話題を故意に妨害する行為<br /><br />もし違反している内容が送信されていたとしても、話題に出さず、スルーするようお願いいたします。</div>
                    <div className="text-lg mb-5 font-bold">ー応募に関するガイドライン</div>
                    <div className="text-base mb-10">禁止されていること<br />・タイトルと最初の発言以外の文章を送信する行為<br />・個人名や組織名が含まれる文章を送信する行為<br /><br />応募内容の基準<br />こちらの基準を満たしているかどうかは、簡単な自己判断で問題ありません。<br />・20分以上は話せそうな内容であること<br />・誰かが傷つく、または不快になる可能性がない内容であること<br />・あまりにもネガティブな内容でないこと</div>
                    </div>
            </div>
        </div>
    );
}