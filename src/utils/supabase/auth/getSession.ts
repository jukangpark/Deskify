import { createClient } from "../client";

async function getSession() {
  const { data, error } = await createClient().auth.getSession();

  if (error) {
    throw new Error("Failed to get session");
  }

  return data;
}

export default getSession;
