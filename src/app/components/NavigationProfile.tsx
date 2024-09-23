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
            width={24}
            height={24}
          />
        ) : (
          <div className="w-[24px] h-[24px] bg-gray-600 rounded-full" />
        )}
      </div>
    </div>
  );
};

export default NavigationProfile;
