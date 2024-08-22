import Feed from "../components/layout/Feed";
import ExplorePosts from "./ExplorePosts";

const ExplorePage = () => {
  return (
    <div>
      <Feed>
        <ExplorePosts />
      </Feed>
    </div>
  );
};

export default ExplorePage;
