import { getBlogs } from "@/libs/blog";
import { IBlog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const data: IBlog[] = await getBlogs();
  console.log(data);

  return (
    <div className="flex justify-center items-center p-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-lg mx-auto">
        {data.map((item) => (
          <div
            key={item.title}
            className="w-full max-w-xs h-[450px] p-4 bg-white shadow-lg rounded-lg text-center text-black border border-gray-200 flex flex-col items-center relative"
          >
            <div className="w-full h-3/5 flex justify-center mb-4">
              <Image
                src={item.thumbnail}
                alt="thumbnail"
                width={200}
                height={200}
                className="rounded-xl object-cover w-full h-full"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 flex-grow">
              {item.title}
            </h3>
            <div className="flex flex-col items-center gap-2 mb-4">
              <img
                src="https://blog-mu-cyan-36.vercel.app/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwcb4iy28ttmy%2FKej4HeqoPcIIMyqwnqfOH%2F82398ce5102f544bab02265e174261ac%2FMuslimah_Cartoon_With_Brown_Hijab__Cartoon_Clipart__Hijab_Clipart__Muslim_Cartoon_Hijab_PNG_Transparent_Clipart_Image_and_P.jfif&w=96&q=75"
                alt="Author Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="text-center">
                <p className="text-sm font-semibold">{item.user.username}</p>
                <p className="text-xs text-gray-500">{item.user.email}</p>
              </div>
            </div>
            <Link
              href={`/blog/${item.slug}`}
              className="absolute bottom-4 left-4 right-4 bg-teal-500 rounded-xl px-4 py-2 text-white hover:bg-teal-600 transition-all duration-200 text-sm"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
