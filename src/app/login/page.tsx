"use client";

import Feed from "../components/layout/Feed";
import LogInButton from "./LogInButton";

const Page = () => {
  return (
    <div>
      <Feed>
        <div className="flex items-center justify-center ">
          <div>
            <h1 className="text-[25px]">Sign In Once</h1>
            <LogInButton />
          </div>
        </div>
      </Feed>
    </div>
  );
};

export default Page;
