"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Megaphone,
  Tag,
  MessageSquare,
  FileText,
  Users,
  Briefcase,
  Upload,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Moon,
  Trophy,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import clsx from "clsx";
import MyProducts from "@/components/userDashboard/components/MyProducts";
import AdCampaigns from "@/components/userDashboard/components/AdCampaigns";
import Deals from "@/components/userDashboard/components/Deals";
import Reviews from "@/components/userDashboard/components/Reviews";
import Affiliate from "@/components/userDashboard/components/Affiliate";
import RewardsTab from "@/components/userDashboard/components/Rewards";

const data = [
  { name: "Mon", views: 4000, upvotes: 2400 },
  { name: "Tue", views: 3000, upvotes: 1398 },
  { name: "Wed", views: 2000, upvotes: 9800 },
  { name: "Thu", views: 2780, upvotes: 3908 },
  { name: "Fri", views: 1890, upvotes: 4800 },
  { name: "Sat", views: 2390, upvotes: 3800 },
  { name: "Sun", views: 3490, upvotes: 4300 },
];

const Sidebar = ({
  activeItem,
  setActiveItem,
}: {
  activeItem: string;
  setActiveItem: (item: string) => void;
}) => {
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "products", icon: Package, label: "My Products" },
    { id: "campaigns", icon: Megaphone, label: "Ad Campaigns" },
    { id: "deals", icon: Tag, label: "Deals" },
    { id: "reviews", icon: MessageSquare, label: "Reviews" },
    { id: "rewards", icon: Trophy, label: "Rewards" },
    { id: "articles", icon: FileText, label: "Articles" },
    { id: "affiliate", icon: Users, label: "Affiliate" },
    { id: "services", icon: Briefcase, label: "Services" },
    { id: "autosubmit", icon: Upload, label: "Auto Submit" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-8">
        <Package className="w-8 h-8 text-[#AF583B]" />
        <span className="text-xl font-bold">Launchap</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={clsx(
              "nav-link w-full flex items-center space-x-3",
              activeItem === item.id && "active"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

const Header = () => (
  <header className="bg-white border-b border-gray-100 px-8 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Moon className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <button className="flex items-center space-x-1 hover:bg-gray-100 p-2 rounded-lg">
            <span>John Doe</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </header>
);

const Dashboard = () => (
  <main className="flex-1 overflow-y-auto p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Welcome Back, John! 👋</h1>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 mb-1">Active Products</p>
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-sm mt-1 text-green-600">
                +8.2% from last month
              </p>
            </div>
            <Package className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 mb-1">Total Views</p>
              <h3 className="text-2xl font-bold">48.5k</h3>
              <p className="text-sm mt-1 text-green-600">
                +12.5% from last month
              </p>
            </div>
            <Users className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 mb-1">Total Reviews</p>
              <h3 className="text-2xl font-bold">1,284</h3>
              <p className="text-sm mt-1 text-red-600">-2.4% from last month</p>
            </div>
            <MessageSquare className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 mb-1">Total Upvotes</p>
              <h3 className="text-2xl font-bold">3.2k</h3>
              <p className="text-sm mt-1 text-green-600">
                +5.7% from last month
              </p>
            </div>
            <Upload className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Analytics Overview</h2>
          <select className="border border-gray-200 rounded-lg px-4 py-2">
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Custom</option>
          </select>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#AF583B"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="upvotes"
                stroke="#198E49"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="card col-span-2">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full bg-[#AF583B] bg-opacity-10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#AF583B]" />
                </div>
                <div>
                  <h3 className="font-medium">New Product Submitted</h3>
                  <p className="text-sm text-gray-600">
                    You submitted "ProductX" for review
                  </p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="btn-primary w-full">Submit New Product</button>
            <button className="btn-secondary w-full">Create Campaign</button>
            <button className="w-full px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
);

function App() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const renderContent = () => {
    switch (activeItem) {
      case "products":
        return <MyProducts />;
      case "campaigns":
        return <AdCampaigns />;
      case "deals":
        return <Deals />;
      case "reviews":
        return <Reviews />;
      case "affiliate":
        return <Affiliate />;
      case "rewards":
        return <RewardsTab />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
