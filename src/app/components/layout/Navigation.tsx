"use client";

import Link from "next/link";
import { navigationArray } from "@/app/constants";
import NavigationLogo from "../common/NavigationLogo";
import Footer from "./Footer";
import { createClient } from "@/utils/supabase/client";
import NavigationProfile from "@/app/components/NavigationProfile";
import LogOutButton from "../LogOutButton";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

// 공통된 스타일을 정의한 함수
const getNavItemClasses = (isActive: boolean) =>
  `w-[311px] h-[48px] m-[4px_0] p-[0] text-[16px] transition-transform transform transition-colors duration-300 ${
    isActive ? "font-bold" : "text-gray-400"
  }`;
function Navigation() {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await createClient().auth.getUser();

      setUser(user);
    })();
  }, []);

  return (
    <ul className="fixed left-0 top-0 h-full w-[335px] p-4 border-r border-gray-600 flex flex-col justify-between">
      <div>
        <NavigationLogo />
        {navigationArray.map((item) => (
          <li
            key={item.link}
            className={`${getNavItemClasses(false)} hover:bg-gray-700`}
          >
            <Link
              href={item.link}
              className="flex items-center w-full h-full p-[12px] gap-2"
            >
              <item.icon size={24} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
        <li className={`${getNavItemClasses(false)} hover:bg-gray-700`}>
          <Link
            href={"/profile"}
            className="flex items-center w-full h-full p-[12px] gap-2"
          >
            <NavigationProfile avatarUrl={user?.user_metadata.avatar_url} />
            <span>Profile</span>
          </Link>
        </li>
        <LogOutButton user={user} />
      </div>
      <Footer />
    </ul>
  );
}

export default Navigation;
