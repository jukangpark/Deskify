"use client";

import { useRecoilValue } from "recoil";
import Feed from "../components/layout/Feed";
import UploadPostForm from "./UploadPostForm";
import loginUserAtom from "@/atom/loginUserAtom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CreatePage = () => {
  const router = useRouter();
  const user = useRecoilValue(loginUserAtom);

  useEffect(() => {
    if (!user) {
      router.push("/login"); // 상태 업데이트는 useEffect 내부에서 처리
    }
  }, [user, router]);

  // 사용자가 로그인되지 않은 경우 렌더링하지 않음
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen p-6">
      <Feed>
        <UploadPostForm userId={user?.id} />
      </Feed>
    </div>
  );
};

export default CreatePage;
