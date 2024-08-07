import Input from "../components/common/Input";
import Feed from "../components/layout/Feed";
import Navigation from "../components/layout/Navigation";

const CreatePage = () => {
  return (
    <div>
      <Navigation />
      <Feed>
        <h1>게시글 작성 페이지</h1>
        <Input />
      </Feed>
    </div>
  );
};

export default CreatePage;
