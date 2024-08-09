import { createClient } from "@/utils/supabase/client";

const getPosts = async () => {
    const supabase = await createClient();

    const { data: posts, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false }); // created_at에 따라 오름차순 정렬

    if (error) {
        console.error("Error fetching posts:", error.message);
        return null;
    }

    // [To Do] post 객체에 user 정보를 추가하는 코드를 작성합니다.
    return posts;
};

export default getPosts;
