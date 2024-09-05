import { createClient } from "../client";

/**
 * Create comment with content and post_id
 * @param {string} comment - comment
 * @param {string} post_id - post_id
 * @param {string} parent_comment_id - parent_comment_id
 * @param {string} loggedInUserId - user_id
 * @returns
 */
const createComment = async (
    content: string,
    post_id: string,
    parent_comment_id: string,
    loggedInUserId: string | undefined,
) => {
    if (!loggedInUserId) {
        console.error("Please log in first");
        return;
    }

    const supabase = createClient();

    const { data, error } = await supabase.from("comment").insert([
        {
            post_id,
            content,
            parent_comment_id, // if parent_comment_id is null, it means it's a root comment
            user_id: loggedInUserId,
        },
    ]);

    if (error) {
        console.error(error);
        return;
    }
};

export default createComment;
