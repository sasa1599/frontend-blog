"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function VerifyPage({ params }: { params: { token: string } }) {
    const router = useRouter();
  const onVerify = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_BASE_URL_BE}/auth/verify/${params.token}`,
        {
          method: "PATCH",
        }
      );
      const result = await res.json();
      if (!res.ok) throw result;
      toast.success(result.message);
      router.push("/login");
    } catch (err:any) {
      console.log(err);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    onVerify();
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Account Verification</h1>
        <p className="text-sm text-gray-600 mb-6">
          Click the button below to verify your account. Your token:{" "}
          <span className="font-mono text-blue-600">{params.token}</span>
        </p>
        {/* <button 
        onClick={onVerify}
        className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition">
          Verify
        </button> */}
      </div>
    </div>
  );
}
