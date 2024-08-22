import Feed from "../components/layout/Feed";
import UploadPostForm from "./UploadPostForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function CreatePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen p-6">
      <Feed>
        <UploadPostForm userId={user.id} />
      </Feed>
    </div>
  );
}

export default CreatePage;
