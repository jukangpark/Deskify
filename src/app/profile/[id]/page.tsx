import Image from "next/image";
import Feed from "@/app/components/layout/Feed";
import Navigation from "@/app/components/layout/Navigation";
import getUserProfileDataById from "@/app/lib/api/getUserProfileDataById";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

async function ProfilePage(props: ProfilePageProps) {
  const items = Array.from({ length: 9 }); // 40개의 아이템을 생성
  const { id } = props.params;

  let data = {
    username: "",
    avatar_url: "",
  };

  try {
    data = await getUserProfileDataById(id);
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <Navigation />
      <Feed>
        <div className="display: flex mx-auto max-w-[910px] border-b border-gray-600 pb-[174px]">
          <div>
            {data.avatar_url ? (
              <Image
                className="rounded-full"
                src={data?.avatar_url}
                alt="avatar"
                width={150}
                height={150}
              />
            ) : (
              <div className="w-[150px] h-[150px] bg-gray-600 rounded-full"></div>
            )}
          </div>
          <div className="ml-4">
            {data?.username ? (
              <h1 className="text-[20px]">{data?.username}</h1>
            ) : (
              <>
                <h1>User not found</h1>
                <p className="text-color-[gray]">
                  The user you are looking for does not exist.
                </p>
              </>
            )}
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
