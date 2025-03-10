import React, { useState } from "react";
import {
  Search,
  Menu,
  Rocket,
  Compass,
  Mail,
  MessageSquare,
  Newspaper,
  Trophy,
  Gift,
} from "lucide-react";
import NavDropdown from "./NavDropdown";
import UserDropdown from "./UserDropdown";
import AuthModal from "./AuthModal";
import Submit from "../submit";
import Link from "next/link";

export default function Header({
  products,
  authenticatedUser,
  categories,
}: {
  products: any;
  authenticatedUser: any;
  categories: any;
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from your auth context

  const launchesItems = [
    {
      label: "Coming Soon",
      href: "#",
      icon: <Rocket className="h-5 w-5" />,
      description: "Get a sneak peek at upcoming product launches",
    },
    {
      label: "Launch Guide",
      href: "#",
      icon: <Compass className="h-5 w-5" />,
      description: "Step-by-step guide for launching your product",
    },
    {
      label: "Newsletter",
      href: "#",
      icon: <Mail className="h-5 w-5" />,
      description: "Weekly updates on the latest product launches",
    },
  ];

  const communityItems = [
    {
      label: "Forums",
      href: "#",
      icon: <MessageSquare className="h-5 w-5" />,
      description: "Connect with makers and get support",
    },
    {
      label: "Stories",
      href: "#",
      icon: <Newspaper className="h-5 w-5" />,
      description: "Read success stories and maker insights",
    },
    {
      label: "Streaks",
      href: "#",
      icon: <Trophy className="h-5 w-5" />,
      description: "Track your daily activity and achievements",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo & Search */}
          <div className="flex-1 flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-2xl font-bold text-[#1F1F1F]">
                  Launch<span className="text-[#AF583B]">Hub</span>
                </span>
              </Link>
            </div>
            <div className="hidden lg:block ml-5 flex-1">
              <div
                className={`relative w-[190px] rounded-full 
                flex items-center
                 text-gray-500 
                 
                 bg-[#f5f8ff]`}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search products, launches, and makers..."
                  className="block w-full pl-10 pr-3 py-1 border border-gray-200 rounded-lg focus:outline-none  bg-gray-50"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
            </div>
          </div>

          {/* Center Section - Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavDropdown title="Launches" items={launchesItems} />
            <NavDropdown
              title="Products"
              isProducts={true}
              categories={categories}
            />
            <NavDropdown title="Community" items={communityItems} />
            <Link
              href="promos"
              className="inline-flex items-center text-gray-700 hover:text-[#AF583B] font-medium"
            >
              <Gift className="h-5 w-5 mr-1" />
              Deals
            </Link>
          </nav>

          {/* Right Section - CTAs & User Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/affiliate">
              <button className="px-4 py-2 text-sm font-medium text-[#AF583B] hover:text-[#8E472F] transition-colors">
                Advertise
              </button>
            </Link>
            <Submit products={products} authenticatedUser={authenticatedUser} />
            <UserDropdown
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setIsAuthModalOpen(true)}
              authenticatedUser={authenticatedUser}
            />
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#AF583B] hover:bg-gray-50"
            >
              Launches
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#AF583B] hover:bg-gray-50"
            >
              Products
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#AF583B] hover:bg-gray-50"
            >
              Community
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#AF583B] hover:bg-gray-50"
            >
              Deals
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-1">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#AF583B] hover:bg-gray-50"
              >
                Sign in
              </button>
              <button className="w-full px-3 py-2 rounded-md text-base font-bold text-white bg-[#AF583B] hover:bg-[#8E472F]">
                New Launch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}
