import { ReactNode } from "react";

interface FeedProps {
  children: ReactNode;
}

const Feed: React.FC<FeedProps> = ({ children }) => {
  return (
    <div className="mt-[24px] w-[calc(100%-335px)] ml-[336px]">{children}</div>
  );
};

export default Feed;
