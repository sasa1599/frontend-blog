import { IUser } from "@/types/blog";
import { useEffect, useState } from "react";

const useSession = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  const checkSession = async () => {
    try {
      const res = await fetch("${process.env.NEXT_BASE_URL_BE}/users/profile", {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) throw result;
      setUser(result.user);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    checkSession();
  }, []);
  return { isAuth, user, setIsAuth, setUser };
};

export default useSession;
