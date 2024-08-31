import IComment from "@/app/types/IComment";
import createComment from "@/utils/supabase/api/createComment";
import getCommentsByPostId from "@/utils/supabase/api/getCommentsByPostId";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FaComment } from "react-icons/fa";

interface CommentButtonProps {
  post_id: string;
  setComments: (comments: IComment[]) => void;
}

const CommentButton = ({ post_id, setComments }: CommentButtonProps) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleClick = useCallback(async () => {
    if (!isLoggedIn) {
      alert("please sign in"); // 다국어 처리하기
      return router.push("/login");
    } else {
      const comment = prompt("Enter your comment here:");

      if (!comment) {
        return;
      } else {
        await createComment(comment, post_id);
        await getCommentsByPostId(post_id).then((data) => setComments(data));
      }
    }
  }, [isLoggedIn, router, setComments, post_id]);

  return (
    <FaComment
      size={22}
      className={`cursor-pointer transition-colors duration-300`} // 색상 변경에 애니메이션 추가
      color={isHovered && isLoggedIn ? "white" : "gray"}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default CommentButton;
