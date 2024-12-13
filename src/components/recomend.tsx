import { IBlog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

export default function RecomendationBlog({ blogs }: { blogs: IBlog[] }) {
    return (
        <div className="space-y-6">
            <p className="font-bold text-gray-700">Recommendation</p>
            {blogs.map((item, index) => (
                <Link href={item.slug} key={index}>
                    <div className="flex items-start gap-4 p-4 bg-white shadow-lg rounded-md border border-gray-200">
                        <div className="flex-shrink-0">
                            <Image
                                src={`https:${item.thumbnail}`}
                                alt="thumbnail"
                                width={100}
                                height={100}
                                className="object-cover w-[100px] h-[90px] rounded-md"
                            />
                        </div>
                        <div className="flex flex-col justify-between">
                            <p className="text-lg font-semibold text-gray-900">{item.title}</p>
                            <div className="flex items-center text-sm text-gray-600 mt-2">
                                <p className="font-semibold">{item.user.username}</p>
                                <span className="mx-2 text-gray-400">||</span>
                                <p>{item.createdAt}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}