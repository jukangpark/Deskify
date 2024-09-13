import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FaComment } from "react-icons/fa";

interface CommentButtonProps {
  post_id: string;
  isDetailPostPage: boolean;
}

const CommentButton = ({ post_id, isDetailPostPage }: CommentButtonProps) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleClick = useCallback(async () => {
    if (!isLoggedIn) {
      alert("please sign in"); // 다국어 처리하기
      return router.push("/login");
    } else {
      if (!isDetailPostPage) {
        console.log("different post");
        return router.push(`/post/${post_id}`);
      } else {
        // 같은 포스트를 클릭한 경우 댓글 작성할 수 있도록 처리하기
      }
    }
  }, [isLoggedIn, router, post_id, isDetailPostPage]);

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
