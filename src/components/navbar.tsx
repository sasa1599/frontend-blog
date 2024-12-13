"use client";

import useSession from "@/hooks/useSession";
import { deleteCookie } from "@/libs/action";
import { useRouter } from "next/navigation";
import { FaBlogger } from "react-icons/fa";
import Link from "next/link";
import AvatarMenu from "./avatarmenu";

export function Navbar() {
  const router = useRouter();
  const { user, isAuth, setIsAuth } = useSession();

  const onLogout = () => {
    deleteCookie("token");
    setIsAuth(false);
    router.push("/login");
  };

  return (
    <div className="bg-gray-700 flex items-center justify-between font-sans p-4 sm:p-6 md:p-8">
      <Link href={"/"} className="flex items-center gap-2">
        <FaBlogger className="text-2xl sm:text-3xl md:text-4xl text-white" />
        <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
          Wonder
        </span>
      </Link>
      {isAuth ? (
        <div className="flex items-center gap-4">
          <AvatarMenu user={user} onLogout={onLogout} />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-white font-bold hover:text-pink-600 transition"
          >
            Home
          </Link>
          <button
            onClick={() => router.push("/register")}
            className="inline-flex items-center border px-3 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-gray-100"
          >
            Register
          </button>
          <button
            onClick={() => router.push("/login")}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-orange-700 rounded-lg hover:bg-orange-800"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
