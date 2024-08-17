import Feed from "../components/layout/Feed";
import Navigation from "../components/layout/Navigation";
import ExplorePosts from "./ExplorePosts";

const ExplorePage = () => {
  return (
    <div>
      <Navigation />
      <Feed>
        <ExplorePosts />
      </Feed>
    </div>
  );
};

export default ExplorePage;
