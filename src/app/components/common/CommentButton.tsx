import { useState } from "react";
import { FaComment } from "react-icons/fa";

const CommentButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FaComment
      size={22}
      className={`cursor-pointer transition-colors duration-300`} // 색상 변경에 애니메이션 추가
      color={isHovered ? "white" : "gray"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default CommentButton;
