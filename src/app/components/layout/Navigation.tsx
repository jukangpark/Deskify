import Link from "next/link";
import { navigationArray } from "@/app/constants";
import NavigationLogo from "../common/NavigationLogo";
import Footer from "./Footer";

const Navigation = () => {
  return (
    <ul className="fixed left-0 top-0 h-full w-[335px] p-4 border-r border-gray-600 flex flex-col justify-between">
      <div>
        <NavigationLogo />
        {navigationArray.map((item) => (
          <li
            key={item.link}
            className="w-[311px] h-[48px] m-[4px_0] p-[0] text-[16px] font-bold"
          >
            <Link href={item.link} className="block w-full h-full p-[12px]">
              {item.label}
            </Link>
          </li>
        ))}
      </div>

      <Footer />
    </ul>
  );
};

export default Navigation;
