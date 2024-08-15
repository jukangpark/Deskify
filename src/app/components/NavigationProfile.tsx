"use client";

import Image from "next/image";

const NavigationProfile = ({ avatarUrl }: { avatarUrl: string }) => {
  return (
    <div>
      <div className="flex items-center">
        {avatarUrl ? (
          <Image
            className="rounded-full"
            src={avatarUrl}
            alt="avatar"
            width={20}
            height={20}
          />
        ) : (
          <div className="w-[22px] h-[22px] bg-gray-600 rounded-full" />
        )}
      </div>
    </div>
  );
};

export default NavigationProfile;
