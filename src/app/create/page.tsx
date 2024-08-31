"use client";

import UploadPostForm from "./UploadPostForm";
import useRequireAuth from "@/hooks/useRequireAuth";

const CreatePage = () => {
  const user = useRequireAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen p-6">
      <UploadPostForm userId={user?.id} />
    </div>
  );
};

export default CreatePage;
