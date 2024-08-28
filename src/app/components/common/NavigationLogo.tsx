import Link from "next/link";
import Image from "next/image";

const NavigationLogo = () => {
  return (
    <div className="w-[311px] h-[73px] mb-[19px] pt-[25px] pr-[12px] pb-[16px] pl-[5px] text-[25px] font-black">
      <Link href="/" className="flex items-center space-x-4">
        <Image
          className="rounded-full"
          src="/images/DeskifyLogo.png"
          alt="logo"
          width={35}
          height={35}
        />
        <span className="hidden md:block">Deskify</span>
      </Link>
    </div>
  );
};

export default NavigationLogo;
