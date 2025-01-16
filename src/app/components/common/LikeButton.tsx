"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

const LikeButton = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const loginStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(!!loginStatus);
      } catch (error) {
        console.error("localStorage is not available:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleClick = useCallback(() => {
    if (!isLoggedIn) {
      alert("please sign in");
      return router.push("/login");
    } else {
      alert("Like functionality is under development.");
    }
  }, [isLoggedIn, router]);

  return (
    <FaThumbsUp
      size={22}
      className={`cursor-pointer transition-colors duration-300`}
      color={isHovered && isLoggedIn ? "white" : "gray"}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default LikeButton;
