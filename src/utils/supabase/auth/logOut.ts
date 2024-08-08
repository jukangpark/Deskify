import { createClient } from "../client";
async function logOut() {
  const { error } = await createClient().auth.signOut();

  window.location.href = "/login"; // 리디렉션할 URL
}

export default logOut;
