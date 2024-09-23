import Link from "next/link";
import NavigationLogo from "./NavigationLogo";
import { navigationArray } from "@/app/constants";
import NavigationProfile from "@/app/components/NavigationProfile";
import LogOutButton from "../LogOutButton";
import Footer from "../layout/Footer";

// 공통된 스타일을 정의한 함수
const getNavItemClasses = (isActive: boolean) =>
  `w-[250px] h-[48px] m-[4px_0] p-[0] text-[16px] transition-transform transform transition-colors duration-300 ${
    isActive ? "font-bold" : "text-gray-400"
  }`;

const LargeScreenNavigation = ({ user, pathname }: any) => {
  // Navigation 호버 시 색상
  const hoverTextColor = "hover:text-white"; // hover 시 텍스트를 검은색으로 변경
  const isProfilePage = pathname === "/profile";

  return (
    <ul className="hidden sm:flex fixed left-0 top-0 h-full w-[80px] md:w-[240px]  p-4 border-r border-gray-600 flex-col justify-between overflow-hidden">
      <div>
        <NavigationLogo />
        {navigationArray.map((item) => {
          const isViewPage = item.link === pathname;
          return (
            <li
              key={item.link}
              className={`${getNavItemClasses(isViewPage)} ${hoverTextColor}`}
            >
              <Link
                href={item.link}
                className="flex items-center w-full h-full p-[12px] gap-2"
              >
                <item.icon size={24} />
                <span className="hidden md:block">{item.label}</span>
              </Link>
            </li>
          );
        })}
        <li className={`${getNavItemClasses(isProfilePage)} ${hoverTextColor}`}>
          <Link
            href={"/profile"}
            className="flex items-center w-full h-full p-[12px] gap-2"
          >
            <NavigationProfile avatarUrl={user?.user_metadata.avatar_url} />
            <span className="hidden md:block">Profile</span>
          </Link>
        </li>
        {user && <LogOutButton user={user} />}
      </div>
      <Footer />
    </ul>
  );
};

export default LargeScreenNavigation;
