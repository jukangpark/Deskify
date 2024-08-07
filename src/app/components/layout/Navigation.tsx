import Link from "next/link";
import { navigationArray } from "@/app/constants";

const Navigation = () => {
  return (
    <ul className="fixed left-0 top-0 h-full w-[335px] p-4 border-r border-gray-600">
      <div className="w-[311px] h-[73px] mb-[19px] pt-[25px] pr-[12px] pb-[16px] pl-[12px] text-[25px] font-black">
        Deskify
      </div>
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
      <div className="w-[311px] h-[48px] m-[4px_0] p-[0] text-[16px] font-bold">
        <Link href="/profile" className="block w-full h-full p-[12px]">
          Profile
        </Link>
      </div>
    </ul>
  );
};

export default Navigation;
