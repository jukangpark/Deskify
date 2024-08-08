import Feed from "../components/layout/Feed";

const ExplorePage = () => {
  const items = Array.from({ length: 40 }); // 40개의 아이템을 생성

  return (
    <div>
      <Feed>
        <div className="grid grid-cols-3 gap-4 max-w-[932px] mx-auto">
          {items.map((_, index) => (
            <div
              key={index}
              className="w-[300px] h-[300px] bg-gray-300 border border-gray-600"
            />
          ))}
        </div>
      </Feed>
    </div>
  );
};

export default ExplorePage;
