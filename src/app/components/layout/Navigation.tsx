"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import loginUserAtom from "@/atom/loginUserAtom";
import { useRecoilState } from "recoil";
import LargeScreenNavigation from "../common/LargeScreenNavigation";
import SmallScreenNavigation from "../common/SmallScreenNavigation";

const Navigation = () => {
  const pathname = usePathname();
  const [user, setUser] = useRecoilState(loginUserAtom);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await createClient().auth.getUser();

      setUser(user);
      if (user) {
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
      } else {
        localStorage.removeItem("isLoggedIn");
      }
    })();
  }, []);

  return (
    <>
      <LargeScreenNavigation user={user} pathname={pathname} />
      <SmallScreenNavigation user={user} pathname={pathname} />
    </>
  );
};

export default Navigation;
