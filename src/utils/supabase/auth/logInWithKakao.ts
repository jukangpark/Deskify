"use client";

import { createClient } from "../client";

async function logInWithKakao() {
  const { data, error } = await createClient().auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
    },
  });

  if (error) {
    throw new Error("Failed to sign in with Kakao");
  }
}

export default logInWithKakao;
