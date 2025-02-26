import React, { useState, useEffect, useRef } from "react";
import { User, Settings, Package, LogOut, LogIn, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; // Use navigate for redirect

interface UserDropdownProps {
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
  authenticatedUser: any;
}

export default function UserDropdown({
  onLoginClick,
  authenticatedUser,
}: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter(); // Use navigate from next/navigation

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Redirect to home if no authenticated user
  useEffect(() => {
    if (!authenticatedUser) {
      navigate.push("/"); // Redirect to home page
    }
  }, [authenticatedUser, navigate]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          {authenticatedUser ? (
            <Image
              src={authenticatedUser?.user?.image}
              className="rounded-full border h-8 w-8"
              height={50}
              width={50}
              alt="avatar"
            />
          ) : (
            <User className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-fadeIn">
          {authenticatedUser ? (
            <div className="py-1">
              <Link
                href="profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#AF583B]"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
              <Link
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#AF583B]"
              >
                <Package className="h-4 w-4 mr-2" />
                My Products
              </Link>
              <Link
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#AF583B]"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
              <hr className="my-1" />
              <button
                onClick={() => signOut()}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#AF583B]"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="py-1">
              <button
                onClick={onLoginClick}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#AF583B]"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign in
              </button>
              <button
                onClick={onLoginClick}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#AF583B]"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create account
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
