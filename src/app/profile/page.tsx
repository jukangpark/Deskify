import Feed from "../components/layout/Feed";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navigation from "../components/layout/Navigation";

async function ProfilePage() {
  const items = Array.from({ length: 9 }); // 40개의 아이템을 생성

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <Navigation />
      <Feed>
        <div className="display: flex mx-auto max-w-[910px] border-b border-gray-600 pb-[174px]">
          <div>
            <Image
              className="rounded-full"
              src={user?.user_metadata.avatar_url}
              alt="avatar"
              width={150}
              height={150}
            />
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
