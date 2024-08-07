import Presentation from "./Presentation";
import PresentationHeader from "./PresentationHeader";

const Post = () => {
  return (
    <div className="w-[479px] h-[813px] mb-[20px] border-b border-gray-600 pt-0 pr-0 pb-[16px] pl-0">
      <PresentationHeader />
      <Presentation />
    </div>
  );
};

export default Post;
