import { useCallback, useState } from "react";
import { IoIosSend } from "react-icons/io";

interface ShareButtonProps {
  post_id: string;
}

const ShareButton = ({ post_id }: ShareButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(async (post_id: string) => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_URL}/post/${post_id}`
      );
      alert("Post link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy the link to clipboard: ", err);
      alert("Failed to copy the link. Please try again.");
    }
  }, []);

  return (
    <IoIosSend
      size={22}
      className={`cursor-pointer transition-colors duration-300`} // 색상 변경에 애니메이션 추가
      color={isHovered ? "white" : "gray"}
      onClick={() => handleClick(post_id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default ShareButton;
