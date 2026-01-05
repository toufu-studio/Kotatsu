"use client";

import { useLoginChecker } from "@/lib/loginChecker";
import { useState } from "react";

import ThreadsList from "./threadsList";
import LeftBar from "./leftBar";
import LoginForm from "./loginForm";
import Header from "./header";
import { Analytics } from "@vercel/analytics/next";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { user, loading } = useLoginChecker();

  const [isOpen, setIsOpen] = useState(false);

  if (loading && !user) return null;

  if (!user) { return <LoginForm />; }

  return (
    <div className="justify-between md:flex md:justify-between min-h-screen">
      <div className="hidden md:flex">
        <LeftBar />
      </div>
      <div className="flex flex-1 flex-col bg-white">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="">
          <div className="">{children}
            <Analytics /></div>
        </main>
      </div>
      <ThreadsList isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

//スマホレイアウト（後回し）
//基本UI完成が最優先。スレ立て関連のUIができてない。
//入力バー周り。データベース優先。
//ちょっと色を付けたい。ボタンとかに？