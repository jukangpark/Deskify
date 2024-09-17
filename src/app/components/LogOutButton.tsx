"use client";

import logOut from "@/utils/supabase/auth/logOut";

const LogOutButton = ({ user }: any) => {
  return (
    <li
      onClick={logOut}
      className="w-[311px] h-[48px] m-[4px_0] p-[12px] text-[16px] font-bold cursor-pointer text-gray-400 hover:font-bold transition-colors duration-300 hidden md:block"
    >
      {"Log Out"}
    </li>
  );
};

export default LogOutButton;
