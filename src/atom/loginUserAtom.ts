import { atom } from "recoil";
import { User } from "@supabase/supabase-js";

const loginUserAtom = atom<User | null>({
    key: "loginUserAtom",
    default: null,
});

export default loginUserAtom;
