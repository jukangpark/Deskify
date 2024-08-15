import { GoHomeFill } from "react-icons/go";
import { MdExplore } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { IconType } from "react-icons"; // Import IconType

interface NavigationItem {
  link: string;
  label: string;
  icon: IconType; // Ensure this matches the type of your icons
}

export const navigationArray: NavigationItem[] = [
  { icon: GoHomeFill, label: "Home", link: "/" },
  { icon: MdExplore, label: "Explore", link: "/explore" },
  { icon: IoIosCreate, label: "Create", link: "/create" },
];
