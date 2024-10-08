import Link from "next/link";
import { navigationArray } from "@/app/constants";
import NavigationProfile from "@/app/components/NavigationProfile";
import LogOutButton from "../LogOutButton";

// 공통된 스타일을 정의한 함수
const getNavItemClasses = (isActive: boolean) =>
  `w-full transition-transform transform transition-colors duration-300 ${
    isActive ? "font-bold" : "text-gray-400"
  }`;

const SmallScreenNavigation = ({ user, pathname }: any) => {
  // Navigation 호버 시 색상
  const hoverTextColor = "hover:text-white"; // hover 시 텍스트를 검은색으로 변경
  const isProfilePage = pathname === "/profile";

  return (
    <ul className="flex sm:hidden fixed bottom-0 left-0 w-full h-[50px] border-t border-gray-600 bg-black justify-between z-50 overflow-hidden">
      <div className="flex w-full items-center justify-between">
        {navigationArray.map((item) => {
          const isViewPage = item.link === pathname;
          return (
            <li
              key={item.link}
              className={`${getNavItemClasses(isViewPage)} ${hoverTextColor}`}
            >
              <Link
                href={item.link}
                className="flex w-full h-full items-center justify-center"
              >
                <item.icon size={24} />
              </Link>
            </li>
          );
        })}
        <li className={`${getNavItemClasses(isProfilePage)} ${hoverTextColor}`}>
          <Link
            href={"/profile"}
            className="flex w-full h-full items-center justify-center"
          >
            <NavigationProfile avatarUrl={user?.user_metadata.avatar_url} />
          </Link>
        </li>
        {user && <LogOutButton user={user} />}
      </div>
    </ul>
  );
};

export default SmallScreenNavigation;
