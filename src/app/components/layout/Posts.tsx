import Post from "../Post";

const Posts = () => {
  const postsArray = Array.from({ length: 50 });
  return (
    <div className="w-[630px] mx-auto">
      {postsArray.map((_, index) => (
        <Post key={index} />
      ))}
    </div>
  );
};

export default Posts;
