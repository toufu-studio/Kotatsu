"use client";

import "../globals.css";

import { FiUser, FiHome, FiSettings, FiBook } from "react-icons/fi";

export default function LeftBar() {
    return (
        <div className="2xl:w-[25%] xl:w-[16rem] md:w-[87px] bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col justify-between shrink-0">
                    <div className="flex flex-col xl:mt-19 xl:mr-10 ml-auto md:mr-3 md:mt-13">
                      <div className="flex gap-5 items-center rounded-3xl p-3">
                        <div className="font-bold text-xl md:hidden xl:flex">KOTATSU</div>
                      </div>
                      <div className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
                        <FiHome className="w-7 h-7 stroke-[1.6]" />
                        <div className="text-xl md:hidden xl:flex">ホーム</div>
                      </div>
                      <div className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
                        <FiUser className="w-7 h-7 stroke-[1.6]" />
                        <div className="text-xl md:hidden xl:flex">プロフィール</div>
                      </div>
                      <div className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
                        <FiBook className="w-7 h-7 stroke-[1.6]" />
                        <div className="text-xl md:hidden xl:flex">使い方</div>
                      </div>
                      <div className="flex gap-5 items-center rounded-3xl hover:bg-gray-100 duration-200 p-3 cursor-pointer">
                        <FiSettings className="w-7 h-7 stroke-[1.6]" />
                        <div className="text-xl md:hidden xl:flex">設定</div>
                      </div>
                    </div>
                  </div>
    );
}