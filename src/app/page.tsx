import React from "react";

export default function Home() {

  const posts = [
    { id: 16, username: "JohnSmith", content: "是非食べてみてほしい", postedAt: "2025-12-30 13:07" },
    { id: 15, username: "TaroYamada", content: "うまいぞ", postedAt: "2025-12-30 13:06" },
    { id: 14, username: "Mr.Pasta", content: "イカ墨って美味いんか", postedAt: "2025-12-30 13:06" },
    { id: 13, username: "JohnSmith", content: "是非食べてみてほしい", postedAt: "2025-12-30 13:07" },
    { id: 12, username: "TaroYamada", content: "うまいぞ", postedAt: "2025-12-30 13:06" },
    { id: 11, username: "Mr.Pasta", content: "イカ墨って美味いんか", postedAt: "2025-12-30 13:06" },
    { id: 10, username: "JohnSmith", content: "是非食べてみてほしい", postedAt: "2025-12-30 13:07" },
    { id: 9, username: "TaroYamada", content: "うまいぞ", postedAt: "2025-12-30 13:06" },
    { id: 8, username: "Mr.Pasta", content: "イカ墨って美味いんか", postedAt: "2025-12-30 13:06" },
    { id: 7, username: "JohnSmith", content: "是非食べてみてほしい", postedAt: "2025-12-30 13:07" },
    { id: 6, username: "TaroYamada", content: "うまいぞ", postedAt: "2025-12-30 13:06" },
    { id: 5, username: "Mr.Pasta", content: "イカ墨って美味いんか", postedAt: "2025-12-30 13:06" },
    { id: 4, username: "JohnSmith", content: "是非食べてみてほしい", postedAt: "2025-12-30 13:07" },
    { id: 3, username: "TaroYamada", content: "うまいぞ", postedAt: "2025-12-30 13:06" },
    { id: 2, username: "Mr.Pasta", content: "イカ墨って美味いんか", postedAt: "2025-12-30 13:06" },
    { id: 1, username: "ピエール", content: "ぱすたたべたい", postedAt: "2025-12-30 13:05" }
  ];
  return (
    <main className="flex-1 flex flex-col 9-6">
      <div className="flex flex-col items-center mb-50 mt-10">
        <div className="">
          {posts.map((post) => (
            <div key={post.id} className="mb-5 bg-white pr-2.5 pl-2.5">
              <div className="flex">
                <div className="mr-2 text-sm text-gray-500">{post.id}</div>
                <div className="text-sm pr-120 text-gray-500">{post.username}</div>
                <div className="ml-auto text-xs text-gray-400">{post.postedAt}</div>
              </div>
              <div className="mt-1 text-sm">{post.content}</div>
            </div>


          ))}
        </div>
      </div>
      {

      }
    </main>
  );
}