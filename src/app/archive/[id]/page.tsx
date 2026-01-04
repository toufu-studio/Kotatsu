import { supabase } from "@/lib/supabase";
import Header from "../../components/header";

export default async function archivePostPage({params}: {params: Promise<{id: string}>}){
  const {id} = await params;

  const {data: thread} = await supabase.from("archive_threads").select("*").eq("id", id).single();

  const {data: posts} = await supabase.from("archive_posts").select("*").eq("thread_id", id).order("created_at", {ascending: true});

  if (!thread) return <div>No Found</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 flex flex-col justify-end">
      <div className="flex flex-col items-center mb-2 mt-6">
        <div className="flex flex-col w-[690px]">
          {posts?.map((post, index) => (
            <div key={post.id} className="mb-5 bg-white px-10 py-1 hover:bg-gray-50">

              <div className="flex justify-between w-150 items-center">
                <div className="flex items-center">
                  <div className="mr-2 text-sm text-gray-500">{index + 1}</div>
                  <div className="text-sm text-gray-500">{post.user_name}</div>
                </div>
                <div className="whitespace-nowrap text-xs text-gray-400">{post.created_at}</div>
              </div>
              <div className="mt-1 text-sm w-120">{post.content}</div>
            </div>


          ))}
        </div>
      </div>
    </main>
      </div>
    </div>

  );
} 