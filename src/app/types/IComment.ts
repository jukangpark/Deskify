interface IComment {
    id: string;
    content: string;
    post_id: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    parent_comment_id: string | null;
    like_count: number;
}

export default IComment;
