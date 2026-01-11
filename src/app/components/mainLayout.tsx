"use client";

import { useLoginChecker } from "@/lib/loginChecker";
import { useEffect, useState } from "react";

import ThreadsList from "./threadsList";
import LeftBar from "./leftBar";
import LoginForm from "./loginForm";
import Header from "./header";
import { Analytics } from "@vercel/analytics/next";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import { routeModule } from "next/dist/build/templates/pages";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { user, loading } = useLoginChecker();

  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const noLogInPage = ["/tos", "/privacy"];
  const isNoLogInPage = noLogInPage.includes(pathname);

  //ログインしてない人をホームに送る
  useEffect(() => {
    if (!loading && !user && !isNoLogInPage && pathname !== "/home") {
      router.push("/home");
    }
  }, [user, loading, isNoLogInPage, pathname, router])

  if (loading) return null;

  if (isNoLogInPage && !user) {
    return (
      <div>
        {children}
      </div>
    )
  }

  if (!user) {
    if (pathname !== "/home") {

      return null;
    }

    return <LoginForm />;
  }

  return (
    <div className="justify-between md:flex md:justify-between min-h-screen">
      <div className="hidden md:flex">
        <LeftBar />
      </div>
      <div className="flex flex-1 flex-col bg-secondbg">
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