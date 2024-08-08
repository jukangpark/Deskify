"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationArray } from "@/app/constants";
import NavigationLogo from "../common/NavigationLogo";
import Footer from "./Footer";
import logOut from "@/utils/supabase/auth/logOut";
import getSession from "@/utils/supabase/auth/getSession";
import { useEffect, useState } from "react";
import User from "@/app/types/User";

// 공통된 스타일을 정의한 함수
const getNavItemClasses = (isActive: boolean) =>
  `w-[311px] h-[48px] m-[4px_0] p-[0] text-[16px] transition-transform transform transition-colors duration-300 ${
    isActive ? "font-bold" : "text-gray-400"
  }`;

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentPath = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const { session } = await getSession();
      if (session) {
        const {
          user: { user_metadata },
        } = session;
        setUser({
          avatar_url: user_metadata.avatar_url,
          name: user_metadata.name,
        });
        setIsLoggedIn(session ? true : false);
      }
    })();
  }, []);

  return (
    <ul className="fixed left-0 top-0 h-full w-[335px] p-4 border-r border-gray-600 flex flex-col justify-between">
      <div>
        <NavigationLogo />
        {navigationArray.map((item) => (
          <li
            key={item.link}
            className={`${getNavItemClasses(
              currentPath === item.link
            )} hover:bg-gray-700`}
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
        <li
          onClick={logOut}
          className="w-[311px] h-[48px] m-[4px_0] p-[12px] text-[16px] font-bold cursor-pointer text-gray-400 hover:font-bold transition-colors duration-300"
        >
          {isLoggedIn && "Log Out"}
        </li>
      </div>
      <Footer />
    </ul>
  );
};

export default Navigation;
