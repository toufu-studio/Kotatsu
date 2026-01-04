"use client";

import { useEffect, useState } from "react";

import Thread from "../../components/thread";
import InputBar from "../../components/inputBar";
import Header from "../../components/header";

import { useLoginChecker } from "@/lib/loginChecker";
import LoadingScreen from "../../components/loading"

const currentThreadId = 2;

export default function Main() {
  const { user, loading } = useLoginChecker();
    const [ isMinLoadTime, setIsMinLoadTime ] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMinLoadTime(true);
        },300);
    return () => clearTimeout(timer);
}, []);

if (loading || !isMinLoadTime) {
    return <LoadingScreen />;
}

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col">
        <Thread threadId={currentThreadId} />
      </div>
      <InputBar threadId={currentThreadId} />
    </div>

  );
} 