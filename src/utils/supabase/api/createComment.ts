import { createClient } from "../client";

/**
 * Create comment with content and post_id
 * @param {string} comment - comment
 * @param {string} post_id - post_id
 * @returns
 */
const createComment = async (content: string, post_id: string) => {
    const supabase = createClient();

    const { data, error } = await supabase.from("comment").insert([
        {
            post_id,
            content,
        },
    ]);

    if (error) {
        console.error(error);
        return;
    }
};

export default createComment;
