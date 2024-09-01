import { createClient } from "../client";
import ICommentWithUsername from "@/app/types/ICommentWithUsername";

/**
 * Get comments by post_id
 * @param {string} postId - post_id
 * @returns {Promise<ICommentWithUsername[]>} - comment list
 */
const getCommentsByPostId = async (
    postId: string,
    parent_comment_id: string = "root",
): Promise<ICommentWithUsername[]> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("comment")
        .select(`
        id,
        content,
        created_at,
        user_id,
        post_id,
        updated_at,
        parent_comment_id,
        like_count,
        profiles ( username )
    `)
        .eq("post_id", postId)
        .eq("parent_comment_id", parent_comment_id) // parent_comment_id가 "root"인 댓글만 가져오기
        .order("created_at", { ascending: false }); // created_at 기준으로 내림차순 정렬

    if (error) {
        console.error(error);
    }

    return data ? data : [];
};

export default getCommentsByPostId;
