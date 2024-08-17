import Feed from "@/app/components/layout/Feed";
import Navigation from "@/app/components/layout/Navigation";

async function ProfilePage() {
  const items = Array.from({ length: 9 }); // 40개의 아이템을 생성

  return (
    <div>
      <Navigation />
      <Feed>
        <div className="display: flex mx-auto max-w-[910px] border-b border-gray-600 pb-[174px]">
          <div>
            <div className="w-[150px] h-[150px] bg-gray-600 rounded-full"></div>
          </div>
          <div className="ml-4">
            <h1 className="text-[20px]">{"user.name"}</h1>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 max-w-[910px] mx-auto mt-20">
          {items.map((_, index) => (
            <div
              key={index}
              className="w-[300px] h-[300px] bg-gray-300 border border-gray-600 "
            />
          ))}
        </div>
      </Feed>
    </div>
  );
}

export default ProfilePage;
