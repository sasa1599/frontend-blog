const base_url = process.env.NEXT_PUBLIC_BASE_URL;
export const getBlogs = async ()=> {
    const res = await fetch(
      `${base_url}/blogs`,
      {
        next: { revalidate: 60 },
      }
    );
    const data = await res.json();
    return data.blogs;
  };
  
  export const getBlogSlug = async (slug: string) => {
    const res = await fetch(
      `${base_url}/${slug}`,
      {
        next: { revalidate: 60 },
      }
    );
    const data = await res.json();
    
    return data.blog;
  };