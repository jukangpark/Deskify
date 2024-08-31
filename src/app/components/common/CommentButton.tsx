import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FaComment } from "react-icons/fa";

const CommentButton = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleClick = useCallback(() => {
    if (!isLoggedIn) {
      alert("please sign in"); // 다국어 처리하기
      return router.push("/login");
    } else {
      alert("Comment functionality is under development.");
    }
  }, [isLoggedIn, router]);

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
