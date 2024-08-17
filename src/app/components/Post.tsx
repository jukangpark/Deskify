import Presentation from "./Presentation";
import PresentationHeader from "./PresentationHeader";
import IPost from "@/app/types/IPost";

const Post = ({
  id,
  content,
  image,
  user_id,
  created_at,
  updated_at,
}: IPost) => {
  return (
    <div className="w-[479px] h-[813px] mb-[20px] border-b border-gray-600 pt-0 pr-0 pb-[16px] pl-0">
      <PresentationHeader created_at={created_at} user_id={user_id} />
      <Presentation image={image} user_id={user_id} content={content} />
    </div>
  );
};

export default Post;
