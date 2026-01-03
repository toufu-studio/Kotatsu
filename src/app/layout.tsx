import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { FiUser, FiHome, FiSettings, FiBook, FiPlus } from "react-icons/fi";

import InputBar from "./components/applyButton";

import { threads, posts1, posts2, posts3, posts4 } from "./data";
import Link from "next/dist/client/link";
import ApplyButton from "./components/applyButton";
const numberOfPosted1 = posts1.length + 1;
const numberOfPosted2 = posts2.length + 1;
const numberOfPosted3 = posts3.length + 1;
const numberOfPosted4 = posts4.length + 1;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kotatsu",
  description: "ハイスピードな、あたたかいSNS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-between sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-dvh 2xl:max-w-full">

          <div className="2xl:w-[25%] min-[86.875rem]:w-[260px] xl:w-[16rem] md:w-[87px] bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col justify-between shrink-0">
            <div className="flex flex-col xl:mt-19 xl:mr-10 ml-auto md:mr-3 md:mt-13">
              <div className="flex gap-5 items-center rounded-3xl p-3">
                <div className="font-bold text-xl md:hidden xl:flex">KOTATSU</div>
              </div>
              <div className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 p-3">
                <FiHome className="w-7 h-7 stroke-[1.6]" />
                <div className="text-xl md:hidden xl:flex">ホーム</div>
              </div>
              <div className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 p-3">
                <FiUser className="w-7 h-7 stroke-[1.6]" />
                <div className="text-xl md:hidden xl:flex">プロフィール</div>
              </div>
              <div className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 p-3">
                <FiBook className="w-7 h-7 stroke-[1.6]" />
                <div className="text-xl md:hidden xl:flex">使い方</div>
              </div>
              <div className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 p-3">
                <FiSettings className="w-7 h-7 stroke-[1.6]" />
                <div className="text-xl md:hidden xl:flex">設定</div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col bg-white">

            <main className="">
              <div className="">{children}</div>
            </main>
          </div>

          <div className="2xl:w-[40%] xl:w-[35rem] min-[1390px]:w-[30rem] lg:w-[35rem] bg-white border-l border-gray-200 h-screen sticky top-0 flex flex-col">
            <div className="2xl:w-85 min-[1390px]:w-85 min-[1280px]:w-50 lg:w-85 sm:w-60 flex flex-col mt-20 ml-7 border-b border-gray-200">
              <div className="text-xl font-bold mb-1 ml-2.5">現在のこたつ</div>
              <ul className="flex flex-col items-start mb-5">
                <Link href="/thread/1" className="w-full pb-2.5 pt-2.5 hover:bg-gray-100 duration-200 pr-2.5 pl-2.5">{threads[0].title}<div className="text-xs text-gray-400 pt-1">{numberOfPosted1}件の会話</div></Link>
                <Link href="/thread/2" className="w-full pb-2.5 pt-2.5 hover:bg-gray-100 duration-200 pr-2.5 pl-2.5">{threads[1].title}<div className="text-xs text-gray-400 pt-1">{numberOfPosted2}件の会話</div></Link>
                <Link href="/thread/3" className="w-full pb-2.5 pt-2.5 hover:bg-gray-100 duration-200 pr-2.5 pl-2.5">{threads[2].title}<div className="text-xs text-gray-400 pt-1">{numberOfPosted3}件の会話</div></Link>
              </ul>
              <div className="text-xl font-bold mb-1 ml-2.5">本日のこたつ（AI）</div>
              <ul className="flex flex-col items-start mb-5">
                <Link href="/thread/4" className="w-full pb-2.5 pt-2.5 hover:bg-gray-100 duration-200 pr-2.5 pl-2.5">{threads[3].title}<div className="text-xs text-gray-400 pt-1">{numberOfPosted4}件の会話</div></Link>
              </ul>
              <div className="flex flex-col mb-5 items-start gap-2">
                <ApplyButton />
                <div className="text-sm text-gray-400 ml-2.5">次の募集まで: 00:00</div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

//スマホレイアウト（後回し）
//基本UI完成が最優先。スレ立て関連のUIができてない。
//入力バー周り。データベース優先。
//ちょっと色を付けたい。ボタンとかに？