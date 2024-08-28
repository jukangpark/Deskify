"use client";

import LogInButton from "./LogInButton";

const Page = () => {
  return (
    <div>
      <div className="flex items-center justify-center ">
        <div>
          <h1 className="text-[25px]">Sign In Once</h1>
          <LogInButton />
        </div>
      </div>
    </div>
  );
};

export default Page;
