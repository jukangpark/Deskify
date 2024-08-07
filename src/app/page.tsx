import Navigation from "./components/layout/Navigation";
import Feed from "./components/layout/Feed";
import Posts from "./components/layout/Posts";

const Home = () => {
  return (
    <div>
      <Navigation />
      <Feed>
        <Posts />
      </Feed>
    </div>
  );
};

export default Home;
