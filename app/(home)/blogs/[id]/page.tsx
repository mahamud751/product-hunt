"use client";
import DetailsPageCard from "@/components/alternative/DetailsPageCard";
import BlogFeatureCard from "@/components/blogs/BlogFeatureCard";
import { getSingleBlogs } from "@/lib/server-actions";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Grid } from "@mui/material";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

const BlogDetails = ({}: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const id = searchParams.get("id");

  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const productRefs = useRef<HTMLDivElement[]>([]);
  console.log("blog", blog);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const data = await getSingleBlogs(id as string);
        setBlog(data);
      } catch (error) {
        console.error("Error fetching alternative details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blog) {
    return <p>No Blog found.</p>;
  }

  return (
    <div>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />} // Custom separator
        className="my-4"
      >
        <Link color="inherit" href="/" className="flex items-center gap-1">
          <Home className="w-5 h-5 text-gray-500" />
          <span className="ms-[2px]">Home</span>
        </Link>
        <Link href="/alternatives" className="text-gray-500 hover:underline">
          Blogs
        </Link>
        {/* Display the current pathname */}
        <span>{pathname}</span>
      </Breadcrumbs>
      <div className="w-full mx-auto py-8">
        <div>
          <div className="pt-8">
            <h1 className="text-4xl font-semibold tracking-tighter leading-none">
              {blog?.name?.slice(0, 80)} {blog?.name.length > 80 && "..."}
            </h1>

            <p className="text-lg leading-loose text-neutral-600 mt-8">
              {blog?.headline?.slice(0, 200)}{" "}
              {blog?.headline?.length > 200 && "..."}
            </p>
          </div>
          <Grid container spacing={3}>
            {/* Left Side Grid */}
            <Grid item xs={12} sm={6} md={8} lg={8}>
              <div>
                <Image
                  src={blog?.photos[0]}
                  alt={blog?.name}
                  width={1000}
                  height={1000}
                  className="object-contain w-full rounded-xl mt-12"
                />
              </div>

              <div>
                {blog?.contents?.map((data: any, index: number) => {
                  return (
                    <div
                      className="mt-4"
                      key={index}
                      //@ts-ignore
                      ref={(el) => (productRefs.current[index] = el!)}
                    >
                      {data?.photos.length > 0 && (
                        <div className="flex-grow border-[1px] border-[#D4D4D4] mt-12"></div>
                      )}
                      <div className="flex mt-6">
                        <p className="text-4xl font-semibold tracking-tighter leading-none">
                          {index + 1}.
                        </p>
                        <h1 className="ms-2 text-4xl font-semibold tracking-tighter leading-none">
                          {data?.title?.slice(0, 80)}{" "}
                          {data?.title?.length > 80 && "..."}
                        </h1>
                      </div>
                      {data?.photos.length > 0 && (
                        <Image
                          src={data?.photos[0]}
                          alt={data?.name}
                          width={1000}
                          height={1000}
                          className="object-contain w-full rounded-xl mt-12"
                        />
                      )}

                      <p
                        className="text-lg leading-loose text-neutral-600 mt-2"
                        dangerouslySetInnerHTML={{
                          __html: data?.description,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <div className="py-2 md:sticky md:top-0">
                <p className="text-lg leading-loose text-neutral-600 mt-8">
                  Written by
                </p>
                <div className="flex">
                  <div>
                    <Image
                      src={blog?.user?.image}
                      alt={blog?.name}
                      width={100}
                      height={100}
                      className="w-12 h-12 object-contain rounded-full"
                    />
                  </div>
                  <div className="ms-2">
                    <p className="text-lg ">{blog?.user?.name}</p>
                    <p className="text-sm text-neutral-600 p-0 m-0">
                      {blog?.user?.email}
                    </p>
                  </div>
                </div>
                <BlogFeatureCard />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
