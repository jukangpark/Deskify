import { GoHomeFill } from "react-icons/go";
import { MdExplore } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { BiMessageSquareDetail } from "react-icons/bi";
import { AiFillNotification } from "react-icons/ai";

import { IconType } from "react-icons"; // Import IconType

interface NavigationItem {
  link: string;
  label: string;
  icon: IconType; // Ensure this matches the type of your icons
}

export const navigationArray: NavigationItem[] = [
  { icon: GoHomeFill, label: "Home", link: "/" },
  { icon: FaSearch, label: "Search", link: "/search" },
  { icon: MdExplore, label: "Explore", link: "/explore" },
  { icon: BiMessageSquareDetail, label: "Messages", link: "/messages" },
  { icon: AiFillNotification, label: "Notifications", link: "/notifications" },
  { icon: IoMdCreate, label: "Create", link: "/create" },
];
