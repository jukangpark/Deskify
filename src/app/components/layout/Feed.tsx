import { ReactNode } from "react";

interface FeedProps {
  children: ReactNode;
}

const Feed: React.FC<FeedProps> = ({ children }) => {
  return (
    <div className="mt-[24px] w-full sm:w-[calc(100%-335px)] sm:ml-[336px]">
      {children}
    </div>
  );
};

export default Feed;
