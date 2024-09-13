import { createClient } from "../client";

const getCommentCountByPostId = async (postId: string) => {
    const supabase = createClient();

    const { data, count, error } = await supabase
        .from('comment') // 'comment' 테이블을 대상으로
        .select('*', { count: 'exact' }) // 정확한 개수 반환을 요청
        .eq('post_id', postId); // 특정 post_id를 기준으로 필터링

    if (error) {
    console.error('Error fetching comments:', error);
    } else {
    console.log('Total comments:', count);
    }

    return count;
};

export default getCommentCountByPostId;