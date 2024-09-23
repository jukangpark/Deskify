"use client";

import logOut from "@/utils/supabase/auth/logOut";
import { logoutObj } from "../constants";

const LogOutButton = ({ user }: any) => {
  return (
    <li
      onClick={logOut}
      className="w-[250px] h-[48px] p-[12px] text-[16px] cursor-pointer text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
    >
      <div>
        <logoutObj.icon size={24} />
      </div>
      <div className="hidden md:block">{logoutObj.label}</div>
    </li>
  );
};

export default LogOutButton;
