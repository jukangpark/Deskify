import Posts from "./components/layout/Posts";
import { Suspense } from "react";
import LoadingSpinner from "./components/common/LoadingSpinner";

const Home = () => {
  return (
    <div className="mt-[24px]">
      <Suspense fallback={<LoadingSpinner />}>
        <Posts />
      </Suspense>
    </div>
  );
};

export default Home;
