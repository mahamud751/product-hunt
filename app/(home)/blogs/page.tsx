"use client";
import { getBlogs } from "@/lib/server-actions";
import { cleanName } from "@/lib/utils";
import { Blog } from "@/services/types";
import { Breadcrumbs } from "@mui/material";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    getBlogs().then((data) => {
      setBlogs(data);
    });
  }, []);

  return (
    <div>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
        className="my-4"
      >
        <Link color="inherit" href="/" className="flex items-center gap-1">
          <Home className="w-5 h-5 text-gray-500" />
          <span className="ms-[2px]">Home</span>
        </Link>
        <span>Blogs</span>
      </Breadcrumbs>
      <section className="py-16">
        <div>
          <h1 className="text-4xl font-semibold tracking-tighter leading-none mt-5">
            Blog
          </h1>
          <br />
          <p className="text-xm mt-1 text-[#4D4D4D]">
            A collection of useful articles for developers and open source
            enthusiasts. Learn about the latest trends and technologies in the
            open source community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {blogs?.map((item, i) => {
              const cleanedName = cleanName(item?.name || "");
              return (
                <Link
                  key={i}
                  href={{
                    pathname: `/blogs/${encodeURIComponent(cleanedName)}`,
                    query: { id: item?.id },
                  }}
                >
                  <article className="overflow-hidden pb-6 rounded-lg border border-solid bg-neutral-50 border-neutral-200 max-w-[307px]">
                    <figure className="w-full">
                      <Image
                        src={item?.photos?.[0]}
                        className="w-full h-40"
                        alt="blog"
                        width={1000}
                        height={1000}
                      />
                    </figure>

                    <div className="flex flex-col items-start px-5 mt-6 w-full">
                      <header>
                        <h2 className="text-xl font-semibold tracking-tight leading-7 text-stone-900">
                          {item?.name}
                        </h2>
                      </header>

                      <p className="self-stretch mt-6 text-sm leading-5 text-neutral-600 h-16">
                        {item?.headline?.slice(0, 110)}
                      </p>

                      <footer className="flex gap-2.5 mt-6 text-xs leading-none text-neutral-500">
                        <time
                          className="grow"
                          dateTime={item?.createdAt?.toString()}
                        >
                          {new Date(item?.createdAt ?? "").toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </time>
                        <span className="my-auto">•</span>
                        <span>{item?.readtime} min read</span>
                      </footer>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
