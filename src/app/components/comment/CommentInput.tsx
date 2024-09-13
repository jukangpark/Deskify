import getCommentsByPostId from "@/utils/supabase/api/getCommentsByPostId";
import createComment from "@/utils/supabase/api/createComment";
import { useState } from "react";

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
    >
      <input
        onChange={(e) => {
          setCommentText(e.target.value);
        }}
        value={commentText}
        placeholder="Add a Comment..."
        className="w-full flex-grow border rounded-lg p-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 border-none text-sm"
      ></input>
    </form>
  );
};

export default CommentInput;
