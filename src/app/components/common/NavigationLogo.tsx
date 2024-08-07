import Link from "next/link";

const NavigationLogo = () => {
  return (
    <div className="w-[311px] h-[73px] mb-[19px] pt-[25px] pr-[12px] pb-[16px] pl-[12px] text-[25px] font-black">
      <Link href="/" className="block w-full h-full">
        Deskify
      </Link>
    </div>
  );
};

export default NavigationLogo;
