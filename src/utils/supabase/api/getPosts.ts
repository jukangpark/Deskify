import { createClient } from "@/utils/supabase/client";

const getPosts = async () => {
    const supabase = await createClient();

    const { data: posts, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false }); // created_at에 따라 오름차순 정렬

    if (error) {
        throw new Error("Failed to load posts");
    }

    return posts;
};

export default getPosts;
