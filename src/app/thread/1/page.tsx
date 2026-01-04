"use client";

import Thread from "../../components/thread";
import InputBar from "../../components/inputBar";
import Header from "../../components/header";

import { useLoginChecker } from "@/lib/loginChecker";


const currentThreadId = 1;

export default function Main() {
  const { user } = useLoginChecker();

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