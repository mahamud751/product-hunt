"use client";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  ThumbsUp,
  MessageSquare,
  DollarSign,
  Settings as SettingsIcon,
  Bell,
  Search,
  ChevronDown,
  Megaphone,
  Gift,
  BookOpen,
  MessageSquareDashed,
  Share2,
  Briefcase,
  Plus,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Award,
} from "lucide-react";
import Dashboard from "@/components/adminDashboard/components/Dashboard";
import UsersComponent from "@/components/adminDashboard/components/Users";
import BlogList from "@/components/adminDashboard/components/Blog/BlogList";
import BlogCategories from "@/components/adminDashboard/components/Blog/BlogCategories";
import BlogEditor from "@/components/adminDashboard/components/Blog/BlogEditor";
import CategoryEditor from "@/components/adminDashboard/components/Blog/CategoryEditor";
import Affiliates from "@/components/adminDashboard/components/Affiliates";
import Revenue from "@/components/adminDashboard/components/Revenue";
import Upvotes from "@/components/adminDashboard/components/Upvotes";
import Reviews from "@/components/adminDashboard/components/Reviews";
import Deals from "@/components/adminDashboard/components/Deals";
import Forums from "@/components/adminDashboard/components/Forums";
import AdManagement from "@/components/adminDashboard/components/AdManagement";
import Rewards from "@/components/adminDashboard/components/Rewards";
import Settings from "@/components/adminDashboard/components/Settings";
import Products from "@/components/adminDashboard/components/Products";
import Image from "next/image";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", color: "#AF583B" },
  { icon: Users, label: "Users", color: "#1F1F1F" },
  { icon: Package, label: "Products", color: "#1F1F1F" },
  { icon: ThumbsUp, label: "Upvotes", color: "#1F1F1F" },
  { icon: MessageSquare, label: "Reviews", color: "#1F1F1F" },
  { icon: DollarSign, label: "Revenue", color: "#1F1F1F" },
  { icon: Gift, label: "Deals", color: "#1F1F1F" },
  { icon: Megaphone, label: "Ads", color: "#1F1F1F" },
  { icon: BookOpen, label: "Blog", color: "#1F1F1F" },
  { icon: MessageSquareDashed, label: "Forum", color: "#1F1F1F" },
  { icon: Share2, label: "Affiliates", color: "#1F1F1F" },
  { icon: Award, label: "Rewards", color: "#1F1F1F" },
  { icon: Briefcase, label: "Services", color: "#1F1F1F" },
  { icon: SettingsIcon, label: "Settings", color: "#1F1F1F" },
];

function App() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [blogTab, setBlogTab] = useState("posts");
  const [blogMode, setBlogMode] = useState<"list" | "create">("list");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Default to false until client-side check
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  // Ensure localStorage and window are only accessed after mounting on the client
  useEffect(() => {
    setIsMounted(true); // Mark as mounted
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

  // Update document class and localStorage only after mounting
  useEffect(() => {
    if (isMounted) {
      document.documentElement.classList.toggle("dark", darkMode);
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    }
  }, [darkMode, isMounted]);

  const renderBlogContent = () => {
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

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <Dashboard />;
      case "Users":
        return <UsersComponent />;
      case "Products":
        return <Products />;
      case "Revenue":
        return <Revenue />;
      case "Upvotes":
        return <Upvotes />;
      case "Reviews":
        return <Reviews />;
      case "Deals":
        return <Deals />;
      case "Ads":
        return <AdManagement />;
      case "Blog":
        return renderBlogContent();
      case "Forum":
        return <Forums />;
      case "Affiliates":
        return <Affiliates />;
      case "Rewards":
        return <Rewards />;
      case "Settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  // Avoid rendering until the component is mounted to prevent hydration mismatches
  if (!isMounted) {
    return null; // Or a loading placeholder if preferred
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <aside
        className={`${
          sidebarCollapsed ? "w-16" : "w-64"
        } border-r border-gray-200 dark:border-gray-700 px-4 py-6 transition-all duration-300 ease-in-out relative bg-white dark:bg-gray-900`}
      >
        <div className="mb-8 flex items-center">
          <h1
            className={`text-xl font-bold text-content-light dark:text-content-dark ${
              sidebarCollapsed ? "hidden" : "block"
            }`}
          >
            LaunchPad
          </h1>
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => setActiveSection(item.label)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors w-full text-left ${
                    activeSection === item.label
                      ? "text-primary-500 bg-primary-50 dark:bg-gray-800"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 ${
                      activeSection === item.label ? "text-primary-500" : ""
                    }`}
                  />
                  <span className={`${sidebarCollapsed ? "hidden" : "block"}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </aside>

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

        {renderContent()}
      </main>
    </div>
  );
}

export default App;
