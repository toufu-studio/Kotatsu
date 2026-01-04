import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ThreadsList from "./components/threadsList";

import { threads, posts1, posts2, posts3, posts4 } from "./data";
import LeftBar from "./components/leftBar";

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
        <div className="flex justify-between sm:max-w-sm md:!max-w-md lg:!max-w-lg xl:!max-w-xl 2xl:!max-w-full">
          <LeftBar />
          <div className="flex flex-1 flex-col bg-white">

            <main className="">
              <div className="">{children}</div>
            </main>
          </div>
          <ThreadsList />
        </div>
      </body>
    </html>
  );
}

//スマホレイアウト（後回し）
//基本UI完成が最優先。スレ立て関連のUIができてない。
//入力バー周り。データベース優先。
//ちょっと色を付けたい。ボタンとかに？