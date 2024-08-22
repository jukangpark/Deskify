"use client";

import Image from "next/image";
import logInWithKakao from "@/utils/supabase/auth/logInWithKakao";

const LogInButton = () => {
  return (
    <div onClick={logInWithKakao} className="cursor: cursor-pointer">
      <Image
        src="/images/kakao_login_medium_wide.png"
        width={300}
        height={45}
        alt="kakao login"
      />
    </div>
  );
};

export default LogInButton;
