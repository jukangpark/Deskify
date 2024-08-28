import { ReactNode } from "react";

interface FeedProps {
  children: ReactNode;
}

const Feed: React.FC<FeedProps> = ({ children }) => {
  return <div className="mt-[24px] w-full">{children}</div>;
};

export default Feed;
