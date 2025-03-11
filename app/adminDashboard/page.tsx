"use client";
import React, { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Bell,
  Search,
  ChevronDown,
  Plus,
  Sun,
  Moon,
  LucideIcon,
} from "lucide-react";
import BlogList from "@/components/adminDashboard/components/Blog/BlogList";
import BlogCategories from "@/components/adminDashboard/components/Blog/BlogCategories";
import BlogEditor from "@/components/adminDashboard/components/Blog/BlogEditor";
import CategoryEditor from "@/components/adminDashboard/components/Blog/CategoryEditor";
import Image from "next/image";

// Define the type for menu items and subitems

const App: React.FC = () => {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );
  const [blogTab, setBlogTab] = useState<"posts" | "categories">("posts");
  const [blogMode, setBlogMode] = useState<"list" | "create">("list");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.classList.toggle("dark", darkMode);
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    }
  }, [darkMode, isMounted]);

  const renderBlogContent = (): JSX.Element => {
    if (blogMode === "create") {
      return (
        <div className="p-8">
          {blogTab === "posts" ? (
            <BlogEditor onBack={() => setBlogMode("list")} />
          ) : (
            <CategoryEditor onBack={() => setBlogMode("list")} />
          )}
        </div>
      );
    }
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setBlogTab("posts")}
                className={`${
                  blogTab === "posts"
                    ? "border-[#AF583B] text-[#AF583B]"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
              >
                Blog Posts
              </button>
              <button
                onClick={() => setBlogTab("categories")}
                className={`${
                  blogTab === "categories"
                    ? "border-[#AF583B] text-[#AF583B]"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
              >
                Categories
              </button>
            </nav>
          </div>
          <button
            onClick={() => setBlogMode("create")}
            className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New {blogTab === "posts" ? "Post" : "Category"}</span>
          </button>
        </div>
        {blogTab === "posts" ? <BlogList /> : <BlogCategories />}
      </div>
    );
  };

  const toggleMenu = (label: string): void => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-80 bg-white dark:bg-gray-800 text-content-light dark:text-content-dark"
              />
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
              <button className="relative">
                <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                  width={32}
                  height={32}
                />
                <div>
                  <p className="text-sm font-medium text-content-light dark:text-content-dark">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Admin
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </div>
            </div>
          </div>
        </header>
      </main>
    </div>
  );
};

export default App;
