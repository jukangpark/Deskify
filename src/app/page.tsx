import Feed from "./components/layout/Feed";
import Posts from "./components/layout/Posts";

const Home = () => {
  return (
    <div>
      <Feed>
        <Posts />
      </Feed>
    </div>
  );
};

export default Home;
