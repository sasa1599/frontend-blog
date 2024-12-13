"use client";

import { useState } from "react";
import { FaLink } from "react-icons/fa6";
import { useCopyToClipboard } from "usehooks-ts";
import { FaCheck } from "react-icons/fa";




export default function COpyButton({link}: {link:string}) {
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <div className="text-gray-500 cursor-pointer" 
    onClick={() => {
        copy(link);
        setCopied(true)
    }}
    onMouseLeave={()=> setCopied(false)}>
      {copied ? <FaCheck/> : <FaLink />}
    </div>
  );
}