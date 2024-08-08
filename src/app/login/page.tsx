"use client";

import Feed from "../components/layout/Feed";
import Image from "next/image";
import logInWithKakao from "@/utils/supabase/auth/logInWithKakao";

const Page = () => {
  return (
    <div>
      <Feed>
        <div className="flex items-center justify-center ">
          <div>
            <h1 className="text-[25px]">Sign In Once</h1>
            <div onClick={logInWithKakao} className="cursor: cursor-pointer">
              <Image
                src="/images/kakao_login_medium_wide.png"
                width={300}
                height={45}
                alt="kakao login"
              />
            </div>
          </div>
        </div>
      </Feed>
    </div>
  );
};

export default Page;
