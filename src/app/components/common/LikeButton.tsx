import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

const LikeButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FaThumbsUp
      size={22}
      className={`cursor-pointer transition-colors duration-300`} // 색상 변경에 애니메이션 추가
      color={isHovered ? "white" : "gray"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default LikeButton;
