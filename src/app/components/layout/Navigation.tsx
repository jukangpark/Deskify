"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationArray } from "@/app/constants";
import NavigationLogo from "../common/NavigationLogo";
import Footer from "./Footer";
import logOut from "@/utils/supabase/auth/logOut";
import getSession from "@/utils/supabase/auth/getSession";
import { useEffect, useState } from "react";

// 공통된 스타일을 정의한 함수
const getNavItemClasses = (isActive: boolean) =>
  `w-[311px] h-[48px] m-[4px_0] p-[0] text-[16px] font-bold transition-transform transform ${
    isActive
      ? "scale-105 text-blue-400"
      : "text-white hover:scale-105 hover:text-blue-400"
  }`;

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    (async () => {
      const { session } = await getSession();
      setIsLoggedIn(!!session);
    })();
  }, []);

  return (
    <ul className="fixed left-0 top-0 h-full w-[335px] p-4 border-r border-gray-600 flex flex-col justify-between">
      <div>
        <NavigationLogo />
        {navigationArray.map((item) => (
          <li
            key={item.link}
            className={getNavItemClasses(currentPath === item.link)}
          >
            <Link href={item.link} className="block w-full h-full p-[12px]">
              {item.label}
            </Link>
          </li>
        ))}
        <li
          onClick={logOut}
          className="w-[311px] h-[48px] m-[4px_0] p-[12px] text-[16px] font-bold cursor-pointer text-gray-300 hover:scale-105 hover:text-red-500"
        >
          {isLoggedIn && "Log Out"}
        </li>
      </div>
      <Footer />
    </ul>
  );
};

export default Navigation;
