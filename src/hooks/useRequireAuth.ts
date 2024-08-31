import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import loginUserAtom from "@/atom/loginUserAtom";

const useRequireAuth = () => {
    const router = useRouter();
    const user = useRecoilValue(loginUserAtom);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (!isLoggedIn) {
            router.push("/login");
        }
    }, [user, router]);

    return user;
};

export default useRequireAuth;
