import { createClient } from "@/utils/supabase/client";

const getPostById = async (id: string) => {
    const supabase = await createClient();

    const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id).single();

    if (error) {
        console.error("Error fetching post:", error);
        return null;
    }

    return post;
};

export default getPostById;
