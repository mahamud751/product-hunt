import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className=" px-0 md:mx-24" style={{ background: "" }}>
        <div className=" px-4 py-16 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center sm:text-left">
              <p className="font-extrabold text-md">Browse:</p>
              <nav className="flex flex-col mt-4 space-y-3 text-[14px] font-bold text-[#999]">
                <Link href="#" className="hover:opacity-75">
                  Alternatives
                </Link>
                <Link href="#" className="hover:opacity-75">
                  All Categories
                </Link>
                <Link href="#" className="hover:opacity-75">
                  AI & Assistants
                </Link>
                <Link href="#" className="hover:opacity-75">
                  Work & Productivity
                </Link>
                <Link href="#" className="hover:opacity-75">
                  Marketing & Sales
                </Link>
                <Link href="#" className="hover:opacity-75">
                  Social Meida Tools
                </Link>
              </nav>
            </div>

            {/* Account Section */}
            <div className="text-center sm:text-left">
              <p className="font-bold text-md">Quick Links:</p>
              <nav className="flex flex-col mt-4 space-y-3 text-[14px] font-bold text-[#999]">
                <Link href="#" className="hover:opacity-75">
                  About Us
                </Link>
                <Link href="#" className="hover:opacity-75">
                  Our Blog
                </Link>
                <Link href="#" className="hover:opacity-75">
                  Advertise
                </Link>
                <Link href="#" className="hover:opacity-75">
                  Add a Free Listing
                </Link>
                <Link href="#" className="hover:opacity-75">
                  Auto Submit
                </Link>
                <Link href="#" className="hover:opacity-75">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:opacity-75">
                  Terms & Condtion
                </Link>
              </nav>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-bold text-md">Platforms:</p>
              <nav className="flex flex-col mt-4 space-y-3 text-[14px] font-bold text-[#999]">
                <Link href="#" className="hover:opacity-75">
                  Leaderboard
                </Link>
                <Link href="#" className="hover:opacity-75">
                  Community
                </Link>
                <Link href="#" className="hover:opacity-75">
                  Winner Borad
                </Link>
                <Link href="#" className="hover:opacity-75">
                  How it Works
                </Link>
                <Link href="#" className="hover:opacity-75">
                  Newsletter
                </Link>
                <Link href="#" className="hover:opacity-75">
                  Become An
                </Link>
                <Link href="#" className="hover:opacity-75">
                  Affiliate
                </Link>
              </nav>
            </div>

            <div className="text-center sm:text-left block flex-col sm:flex-row justify-center sm:justify-start">
              <p className="font-bold text-md">Subscribe to our newsletter</p>
              <p className="mt-2 text-sm text-[#999]">
                Join 2,100+ other members and get updates on new products and
                startups.
              </p>
              <div className="flex items-center mt-12 border-[#eaeaea] w-[270px] text-sm border rounded-lg">
                <input
                  type="email"
                  className="min-h-[20px]  p-2 text-white   rounded-l-lg bg-transparent focus:border-[#3898EC] focus:outline-none"
                  id="Email"
                  name="Email"
                  placeholder="Enter your email"
                  autoComplete="off"
                />
                <input
                  className="min-h-[18px] px-4 py-2 ms-[-2px] text-white text-sm bg-[#000000] rounded-l-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#5e5dcd]"
                  value="Subscribe"
                  type="submit"
                />
              </div>
              <div className="flex mt-6 space-x-4 justify-center sm:justify-start">
                <Link href="#" className="hover:opacity-75">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                <Link href="#" className="hover:opacity-75">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.406-.24a1.196 1.196 0 11-2.392 0 1.196 1.196 0 012.392 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                <Link href="#" className="hover:opacity-75">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 19c7.5 0 11.6-6.25 11.6-11.66 0-.18-.01-.35-.02-.53A8.31 8.31 0 0022 4.34a8.17 8.17 0 01-2.36.64 4.12 4.12 0 001.8-2.27 8.22 8.22 0 01-2.61.99 4.11 4.11 0 00-7.04 3.75A11.67 11.67 0 013 3.85a4.1 4.1 0 001.27 5.47 4.08 4.08 0 01-1.86-.52v.05c0 1.98 1.4 3.63 3.26 4a4.12 4.12 0 01-1.85.07c.52 1.63 2.04 2.82 3.83 2.85A8.24 8.24 0 012 17.23 11.65 11.65 0 008 19z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <p className="mt-12 text-xs text-center text-[#999]">
              &copy; {currentYear} Product Hunt. All rights reserved.
            </p>
            <p className="mt-12 text-xs text-center text-[#999]">
              This website may contain affiliate links
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
