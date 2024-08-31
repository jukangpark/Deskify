import { createClient } from "../client";
import IComment from "@/app/types/IComment";

/**
 * Get comments by post_id
 * @param {string} postId - post_id
 * @returns {Promise<IComment[]>} - comment list
 */
const getCommentsByPostId = async (postId: string): Promise<IComment[]> => {
    const supabase = createClient();

    const { data, error } = await supabase.from("comment").select("*").eq(
        "post_id",
        postId,
    ).order("created_at", { ascending: false }); // created_at 기준으로 내림차순 정렬

    if (error) {
        console.error(error);
    }

    return data ? data : [];
};

export default getCommentsByPostId;
