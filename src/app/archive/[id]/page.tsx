import { supabase } from "@/lib/supabase";
import Header from "../../components/header";

export default async function archivePostPage({params}: {params: Promise<{id: string}>}){
  const {id} = await params;

  const {data: thread} = await supabase.from("archive_threads").select("*").eq("id", id).single();

  const {data: posts} = await supabase.from("archive_posts").select("*").eq("thread_id", id).order("created_at", {ascending: true});

  if (!thread) return <div>No Found</div>;

  return (
    <main className="flex-1 flex flex-col justify-start bg-secondbg h-full">
      <div className="flex flex-col items-center mb-2 mt-6 w-full">
        <div className="flex flex-col w-full md:w-[690px] md:items-center">
          {posts?.map((post, index) => (
            <div key={post.id} className="w-full md:w-150 mb-5 bg-background text-foreground px-10 md:px-5 xl:px-10 py-5 hover:bg-gray-50 rounded-xl shadow-[0px_0px_20px_0.1px_rgba(0,3,3,0.03)]">

              <div className="flex justify-between w-full md:w-full items-center">
                <div className="flex items-center w-full">
                  <div className="mr-2 text-sm text-gray-500">{index + 1}</div>
                  <div className="flex items-center w-full justify-between">
                    <div className="text-sm text-gray-500">{post.user_name}</div>
                    <div className="whitespace-nowrap text-xs text-gray-400">{post.posted_at}</div>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-sm w-full md:w-120 whitespace-pre-wrap wrap-break-word leading-relaxed">{post.content}</div>
            </div>


          ))}
        </div>
      </div>
      {

      }
    </main>

  );
} 