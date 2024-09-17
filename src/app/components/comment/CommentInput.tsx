import getCommentsByPostId from "@/utils/supabase/api/getCommentsByPostId";
import createComment from "@/utils/supabase/api/createComment";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// TODO BasicCommentInput에 비동기 로직을 분리하여서 이 부분이 approve되면 CommentInput 삭제 예정
interface CommentInputProps {
  loggedInUserId: string | undefined;
  post_id: string;
  setComments: any; // TODO: 타입 정의
}

/**
    root 에 댓글 작성하는 컴포넌트
 */
const CommentInput = ({
  post_id,
  loggedInUserId,
  setComments,
}: CommentInputProps) => {
  const [commentText, setCommentText] = useState("");
  const router = useRouter();

  const handleFocus =  useCallback(async () => {
    if (!loggedInUserId) {
      return router.push("/login");
    }
  }, [loggedInUserId]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();     

        try {
          await createComment(commentText, post_id, "root", loggedInUserId);
          const commentData = await getCommentsByPostId(post_id);
          setCommentText("");
          setComments(commentData);
        } catch (error) {
          console.error(error);
        }
      }}
      className="flex items-center space-x-2"
    >
      <input
        onChange={(e) => {
          setCommentText(e.target.value);
        }}
        onFocus={handleFocus}
        value={commentText}
        placeholder="Add a Comment..."
        className="flex-grow border rounded-lg p-1 bg-gray-800 text-white border-gray-600 border-none text-sm"
      />
      <button
        type="submit"
        className={`bg-gray-600 ${
          commentText.length > 0 && `hover:bg-blue-700 cursor-pointer`
        } text-white h-[28px] px-3 rounded-md transition duration-300 text-sm`}
        disabled={commentText.length === 0}
      >
        Post
      </button>
    </form>
  );
};

export default CommentInput;
