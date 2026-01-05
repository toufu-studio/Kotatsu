import type { Metadata } from "next";
import { Geist, Geist_Mono, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next"

import ThreadsList from "./components/threadsList";

import { threads, posts1, posts2, posts3, posts4 } from "./data";
import LeftBar from "./components/leftBar";
import Header from "./components/header";
import MainLayout from "./components/mainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku-gothic-new",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
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
      <head><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}

//スマホレイアウト（後回し）
//基本UI完成が最優先。スレ立て関連のUIができてない。
//入力バー周り。データベース優先。
//ちょっと色を付けたい。ボタンとかに？