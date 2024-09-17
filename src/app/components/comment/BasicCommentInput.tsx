import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface BasicCommentInputProps {
  loggedInUserId: string | undefined;
  createComment: (commentText: string) => Promise<void>
}

/**
    root 에 댓글 작성하는 컴포넌트
 */
const BasicCommentInput = ({
  loggedInUserId,
  createComment
}: BasicCommentInputProps) => {
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

        await createComment(commentText);
        setCommentText("");
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

export default BasicCommentInput;
