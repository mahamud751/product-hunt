"use client";
import React, { useState } from "react";
import {
  ChevronUp,
  Menu,
  PlusCircle,
  Globe,
  MessageCircle,
  Hand,
  Headphones,
  MessageSquareDashed,
  Flame,
  Clock,
} from "lucide-react";
import Image from "next/image";

type Thread = {
  id: number;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  upvotes: number;
  comments: number;
  path: string;
  timestamp: string;
  isPinned?: boolean;
  isFeatured?: boolean;
  tags?: string[];
};

type Category = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const topics: Category[] = [
  {
    name: "General",
    path: "p/general",
    icon: <Globe className="w-5 h-5 text-gray-600" />,
  },
  {
    name: "AMA",
    path: "p/ama",
    icon: <MessageCircle className="w-5 h-5 text-gray-600" />,
  },
  {
    name: "Introduce Yourself",
    path: "p/introduce-yourself",
    icon: <Hand className="w-5 h-5 text-gray-600" />,
  },
  {
    name: "Self-Promotion",
    path: "p/self-promotion",
    icon: <Headphones className="w-5 h-5 text-gray-600" />,
  },
];

const productForums: Category[] = [
  {
    name: "Cal",
    path: "p/cal",
    icon: (
      <Image
        src="https://ph-files.imgix.net/d1a35e06-ec86-4a7c-b0f0-b066bef2d1ce.png?auto=format"
        className="w-5 h-5 rounded"
        alt="Cal"
        width={20}
        height={20}
      />
    ),
  },
  {
    name: "Claude",
    path: "p/claude",
    icon: (
      <Image
        src="https://ph-files.imgix.net/3e3b3dd3-cf7d-4354-b90f-5f4d2d3e0a5d.png?auto=format"
        className="w-5 h-5 rounded"
        alt="Claude"
      />
    ),
  },
  {
    name: "Cursor",
    path: "p/cursor",
    icon: (
      <Image
        src="https://ph-files.imgix.net/ec7f0711-b108-4a5e-9d4b-9a0a4fb2901e.png?auto=format"
        className="w-5 h-5 rounded"
        alt="Cursor"
        width={20}
        height={20}
      />
    ),
  },
  {
    name: "Deepgram",
    path: "p/deepgram",
    icon: (
      <Image
        src="https://ph-files.imgix.net/d8c6a846-6451-4e86-b3f7-c7278f51bb46.png?auto=format"
        className="w-5 h-5 rounded"
        alt="Deepgram"
        width={20}
        height={20}
      />
    ),
  },
  {
    name: "Dub",
    path: "p/dub",
    icon: (
      <Image
        src="https://ph-files.imgix.net/4b7c5f2d-ff3b-4bc0-8548-6fdce2c3f96d.png?auto=format"
        className="w-5 h-5 rounded"
        alt="Dub"
        width={20}
        height={20}
      />
    ),
  },
];

const sampleThreads: Thread[] = [
  {
    id: 1,
    path: "p/general",
    title:
      "I'm the Product Hunt CEO - tell me your tagline and I'll fix it for you :)",
    description:
      "I'm the @Product Hunt CEO, I've launched 7 times on PH, and helped countless friends prep their launches. The most common mistake I see is a confusing tagline. Launching on Product Hunt soon? Tell me your tagline and I'll fix it for you :)",
    author: {
      name: "Rajiv Ayyangar",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    upvotes: 144,
    comments: 128,
    timestamp: "6d ago",
    isFeatured: true,
  },
  {
    id: 2,
    path: "p/general",
    title: "What's your favorite productivity hack?",
    description:
      "Share your best productivity tips and tricks that have made a significant impact on your work life.",
    author: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    upvotes: 89,
    comments: 45,
    timestamp: "2d ago",
  },
];

type FilterOption = "trending" | "recent";

const Forum = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedPath, setSelectedPath] = useState("p/general");
  const [selectedFilter, setSelectedFilter] =
    useState<FilterOption>("trending");

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out overflow-y-auto ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="p-4">
            <button className="w-full py-3 px-4 bg-[#AF583B] text-white rounded-lg hover:bg-opacity-90 flex items-center justify-center gap-2">
              <PlusCircle size={20} />
              Start New Thread
            </button>
          </div>

          <div className="px-4 py-2">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">Topics</h2>
            <nav className="space-y-1">
              {topics.map((topic) => (
                <button
                  key={topic.path}
                  onClick={() => setSelectedPath(topic.path)}
                  className={`w-full px-3 py-2 flex items-center gap-3 rounded-lg text-sm ${
                    selectedPath === topic.path
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {topic.icon}
                  <span>{topic.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="px-4 py-2 mt-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">
              Product Forums
            </h2>
            <nav className="space-y-1">
              {productForums.map((product) => (
                <button
                  key={product.path}
                  onClick={() => setSelectedPath(product.path)}
                  className={`w-full px-3 py-2 flex items-center gap-3 rounded-lg text-sm ${
                    selectedPath === product.path
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {product.icon}
                  <span>{product.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 ${isSidebarOpen ? "lg:ml-64" : ""} p-6`}>
          <div className="max-w-3xl mx-auto">
            {/* Filter Options */}
            <div className="mb-6 border-b border-gray-200">
              <div className="flex gap-6">
                <button
                  onClick={() => setSelectedFilter("trending")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                    selectedFilter === "trending"
                      ? "border-[#AF583B] text-[#AF583B]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  Trending
                </button>
                <button
                  onClick={() => setSelectedFilter("recent")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                    selectedFilter === "recent"
                      ? "border-[#AF583B] text-[#AF583B]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  Recent
                </button>
              </div>
            </div>

            {/* Thread List */}
            {sampleThreads.map((thread) => (
              <div
                key={thread.id}
                className="mb-4 hover:bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <Globe className="w-4 h-4" />
                      <a href={thread.path} className="hover:text-gray-900">
                        {thread.path}
                      </a>
                      <span>by</span>
                      <div className="flex items-center gap-2">
                        <Image
                          src={thread.author.avatar}
                          alt={thread.author.name}
                          className="w-5 h-5 rounded-full"
                          height={20}
                          width={20}
                        />
                        <a
                          href="#"
                          className="font-medium text-gray-900 hover:underline"
                        >
                          {thread.author.name}
                        </a>
                      </div>
                      {thread.isFeatured && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
                          Featured
                        </span>
                      )}
                      <span>•</span>
                      <span>{thread.timestamp}</span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                      <a href="#" className="hover:text-[#AF583B]">
                        {thread.title}
                      </a>
                    </h2>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {thread.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
                        <MessageSquareDashed className="w-4 h-4" />
                        <span>{thread.comments}</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-700">
                      <ChevronUp size={20} />
                    </button>
                    <span className="text-sm font-medium text-gray-900">
                      {thread.upvotes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Forum;
