"use client";

import { useLoginChecker } from "@/lib/loginChecker";

import ThreadsList from "../components/threadsList";
import LeftBar from "../components/leftBar";
import LoginForm from "../components/loginForm";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { user } = useLoginChecker();

  if (!user) { return; }

  return (
    <div className="flex justify-between sm:max-w-sm md:!max-w-md lg:!max-w-lg xl:!max-w-xl 2xl:!max-w-full">
      <LeftBar />
      <div className="flex flex-1 flex-col bg-white">

        <main className="">
          <div className="">{children}</div>
        </main>
      </div>
      <ThreadsList />
    </div>
  );
}

//スマホレイアウト（後回し）
//基本UI完成が最優先。スレ立て関連のUIができてない。
//入力バー周り。データベース優先。
//ちょっと色を付けたい。ボタンとかに？