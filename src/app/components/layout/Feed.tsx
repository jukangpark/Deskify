import { ReactNode } from "react";

interface FeedProps {
  children: ReactNode;
}

const Feed: React.FC<FeedProps> = ({ children }) => {
  return <div className="flex-grow">{children}</div>;
};

export default Feed;
