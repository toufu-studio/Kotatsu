"use client";

import React, { use, useRef } from "react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { posts1 } from "../../data";
import Thread from "../../components/thread";
import InputBar from "../../components/inputBar";

const currentThreadId = 3;

export default function Main() {
  return (

      <div>
        <Thread threadId={currentThreadId} />
        <InputBar threadId={currentThreadId} />
      </div>


  );
} 