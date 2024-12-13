import Link from "next/link";
import { IconType } from "react-icons";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsappSquare,
  FaLinkedin,
} from "react-icons/fa";
import COpyButton from "./copy";

interface IShare {
  Icon: IconType;
  link: string;
}

const share: IShare[] = [
  { Icon: FaFacebook, link: "https://www.facebook.com/sharer/sharer.php?u=" },
  { Icon: FaTwitter, link: "https://www.twitter.com/intent/tweet?url=" },
  { Icon: FaWhatsappSquare, link: "https://wa.me/?text=" },
  { Icon: FaLinkedin, link: "https://www.linkedin.com/sharing/share-offsite/?url=" },
];

export default function ShareButton({slug}: {slug: string}) {
    const domain = "https://blog-mu-cyan-36.vercel.app/blog/"
  return (
    <div className="flex flex-col  mb-9">
      <p className="mb-2 font-semibold font-sans text-[15px]">Bagikan :</p>
      <div className="flex gap-4">
        {share.map((item, index) => (
          <Link
            href={`${item.link}${domain}${slug}`}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <item.Icon size={20} />
          </Link>
        ))}
        <COpyButton link={`${domain}${slug}`}/>
      </div>
    </div>
  );
}