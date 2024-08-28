import Link from "next/link";
import NavigationLogo from "./NavigationLogo";
import { navigationArray } from "@/app/constants";
import NavigationProfile from "@/app/components/NavigationProfile";
import LogOutButton from "../LogOutButton";
import Footer from "../layout/Footer";

// 공통된 스타일을 정의한 함수
const getNavItemClasses = (isActive: boolean) =>
  `w-[311px] h-[48px] m-[4px_0] p-[0] text-[16px] transition-transform transform transition-colors duration-300 ${
    isActive ? "font-bold" : "text-gray-400"
  }`;

const LargeScreenNavigation = ({ user, pathname }: any) => {
  // Navigation 호버 시 색상
  const hoverBgColor = "bg-gray-200";
  const isProfilePage = pathname === "/profile";

  return (
    <ul className="hidden sm:flex fixed left-0 top-0 h-full w-[335px] p-4 border-r border-gray-600 flex-col justify-between">
      <div>
        <NavigationLogo />
        {navigationArray.map((item) => {
          const isViewPage = item.link === pathname;
          return (
            <li
              key={item.link}
              className={`${getNavItemClasses(
                isViewPage
              )} hover:${hoverBgColor}`}
            >
              <Link
                href={item.link}
                className="flex items-center w-full h-full p-[12px] gap-2"
              >
                <item.icon size={24} />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
        <li
          className={`${getNavItemClasses(
            isProfilePage
          )} hover:${hoverBgColor}`}
        >
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
};

export default LargeScreenNavigation;
