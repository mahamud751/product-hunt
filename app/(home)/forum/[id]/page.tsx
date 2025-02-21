"use client";
import React, { useState } from "react";
import {
  MessageSquare,
  Share2,
  Flag,
  ThumbsUp,
  ThumbsDown,
  Send,
  Bold,
  Italic,
  Link,
  Code,
  List,
  AtSign,
  Hash,
  Globe,
  ArrowLeft,
} from "lucide-react";

// Mock data for demonstration
const thread = {
  category: "p/general",
  title:
    "I'm the Product Hunt CEO - tell me your tagline and I'll fix it for you :)",
  description:
    "Share and discuss tech, products, business, startups, or product recommendations",
  author: {
    name: "Rajiv Ayyangar",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    badge: "Featured",
    isStaff: true,
    timestamp: "6d ago",
  },
  content:
    "I'm the @Product Hunt CEO, I've launched 7 times on PH, and helped countless friends prep their launches.\n\nThe most common mistake I see is a confusing tagline.\n\nLaunching on Product Hunt soon? Tell me your tagline and I'll fix it for you :)",
  engagement: {
    upvotes: 128,
    comments: 144,
  },
};

const comments = [
  {
    id: 1,
    author: {
      name: "Per Clingweld",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      badge: "Launching soon",
    },
    content:
      'The fewer words, the harder the craft, right? :)\n\nWe\'re launching soon and where thinking of using the tagline: "The world\'s first customer relationship agent"\n\nShort description:\n"Drive your client relations and sales pipeline forward, with the world\'s first Customer Relationship Agent. Andsend identifies your opportunities and drafts compelling messages for email and LinkedIn, so you can easily nurture your conversations and close deals."\n\nJust review and send. No effort, full control."',
    timestamp: "6d ago",
    upvotes: 7,
    replies: [
      {
        id: 11,
        author: {
          name: "Rajiv Ayyangar",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          isStaff: true,
          badge: "Product Hunt",
        },
        content:
          '@per_clingweld I\'m never a fan of "world\'s first" - it distracts from the core concept.\n\nCustomer relationship agent sound similar to AI SDRs (e.g. Artisan, 11x).\n\nSome ideas:\n\n"Replace your CRM with an outreach agent"\n"AI sales agent that"\n\nOr more specifically:\n\n"Outreach agent that identifies opportunities and reaches out authentically" (needs to be shortened).\n\nOverall my read on this space is: It\'s a problem, people want tools to help, but right now most of them aren\'t good / effective. How do you stand out? What\'s unique about your approach that will make this actually effective.',
        timestamp: "6d ago",
        upvotes: 8,
      },
    ],
  },
  {
    id: 2,
    author: {
      name: "Arlan Rakhmetzhanov",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      badge: "Nia",
    },
    content:
      '"Collaborative AI teammate that understands your codebase and can be queried via an API or Slack."',
    timestamp: "6d ago",
    upvotes: 7,
    replies: [
      {
        id: 21,
        author: {
          name: "Rajiv Ayyangar",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          isStaff: true,
          badge: "Product Hunt",
        },
        content:
          '@arlan "ai code agent that understands your codebase" is the holy grail. How specifically did you achieve that understanding? Emphasize that unique approach.',
        timestamp: "6d ago",
        upvotes: 2,
      },
    ],
  },
];

const categories = [
  { id: "general", name: "p/general" },
  { id: "ama", name: "p/ama" },
  { id: "introduce", name: "p/introduce-yourself" },
  { id: "promotion", name: "p/self-promotion" },
];

const productForums = [
  { id: "cal", name: "p/cal" },
  { id: "claude", name: "p/claude" },
  { id: "cursor", name: "p/cursor" },
  { id: "deepgram", name: "p/deepgram" },
];
const Page = () => {
  const [comment, setComment] = useState("");
  const [sortBy, setSortBy] = useState("best");

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-[#F5F5F5] p-6 overflow-y-auto border-r border-gray-200">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4 text-[#1F1F1F]">Topics</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="flex items-center space-x-2 text-gray-600 hover:text-[#1F1F1F] hover:bg-white rounded-lg p-2 cursor-pointer"
                >
                  <Hash className="w-4 h-4" />
                  <span>{category.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#1F1F1F]">
              Product Forums
            </h3>
            <ul className="space-y-2">
              {productForums.map((forum) => (
                <li
                  key={forum.id}
                  className="flex items-center space-x-2 text-gray-600 hover:text-[#1F1F1F] hover:bg-white rounded-lg p-2 cursor-pointer"
                >
                  <Hash className="w-4 h-4" />
                  <span>{forum.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Category Banner */}
        <div className="bg-[#F5F5F5] px-8 py-4 border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="text-gray-500 hover:text-gray-700">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-lg">
                    <Globe className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-[#1F1F1F]">
                      {thread.category}
                    </h1>
                    <p className="text-sm text-gray-600">
                      {thread.description}
                    </p>
                  </div>
                </div>
              </div>
              <button className="bg-white text-[#1F1F1F] px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 border border-gray-200">
                <MessageSquare className="w-4 h-4" />
                <span>Start new thread</span>
              </button>
            </div>
          </div>
        </div>

        {/* Thread Content */}
        <div className="max-w-4xl mx-auto px-8 py-6">
          <div className="bg-white rounded-lg">
            <div className="mb-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-[#1F1F1F] mb-4">
                    {thread.title}
                  </h1>

                  <div className="flex items-center space-x-4">
                    <img
                      src={thread.author.avatar}
                      alt={thread.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-[#1F1F1F]">
                          {thread.author.name}
                        </span>
                        {thread.author.isStaff && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            @Product Hunt
                          </span>
                        )}
                        {thread.author.badge && (
                          <span className="bg-red-100 text-[#AF583B] text-xs px-2 py-1 rounded">
                            {thread.author.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {thread.author.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-1 ml-8">
                  <button className="text-gray-500 hover:text-[#AF583B]">
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-medium text-gray-900">
                    {thread.engagement.upvotes}
                  </span>
                  <span className="text-xs text-gray-500">upvotes</span>
                </div>
              </div>

              <p className="text-[#1F1F1F] whitespace-pre-line">
                {thread.content}
              </p>

              <div className="flex items-center space-x-6 mt-6">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">
                    {thread.engagement.comments}
                  </span>
                </div>
                <button className="text-gray-500 hover:text-[#AF583B]">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="text-gray-500 hover:text-red-500">
                  <Flag className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comment Input */}
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-[#F5F5F5] rounded-lg p-4">
                <div className="flex space-x-2 mb-4">
                  <button
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Link"
                  >
                    <Link className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Code"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-200 rounded"
                    title="List"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Mention"
                  >
                    <AtSign className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex space-x-4">
                  <textarea
                    className="flex-1 p-3 rounded-md border border-gray-300 focus:border-[#AF583B] focus:ring focus:ring-[#AF583B] focus:ring-opacity-50"
                    placeholder="Add a comment..."
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button className="bg-[#AF583B] text-white px-4 py-2 rounded-md hover:bg-[#8F4731] transition-colors flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Comment</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1F1F1F]">Replies</h2>
                <select
                  className="border border-gray-300 rounded-md px-3 py-1.5"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="best">Best</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>

              {/* Comments List */}
              <div className="space-y-8">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b border-gray-100 pb-8"
                  >
                    {/* Comment */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-[#1F1F1F]">
                              {comment.author.name}
                            </span>
                            {comment.author.badge && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                {comment.author.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            {comment.timestamp}
                          </span>
                        </div>
                      </div>
                      <p className="text-[#1F1F1F] whitespace-pre-line">
                        {comment.content}
                      </p>
                      <div className="flex items-center space-x-6 mt-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-500 hover:text-[#AF583B]">
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <span className="text-sm text-gray-600">
                            {comment.upvotes}
                          </span>
                        </div>
                        <button className="text-sm text-gray-500 hover:text-[#AF583B]">
                          Reply
                        </button>
                        <button className="text-sm text-gray-500 hover:text-[#AF583B]">
                          Share
                        </button>
                        <button className="text-sm text-gray-500 hover:text-red-500">
                          Report
                        </button>
                      </div>
                    </div>

                    {/* Replies */}
                    <div className="ml-12 space-y-6">
                      {comment.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="border-l-2 border-gray-100 pl-6"
                        >
                          <div className="flex items-center space-x-4 mb-4">
                            <img
                              src={reply.author.avatar}
                              alt={reply.author.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-[#1F1F1F]">
                                  {reply.author.name}
                                </span>
                                {reply.author.isStaff && (
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                    @Product Hunt
                                  </span>
                                )}
                              </div>
                              <span className="text-sm text-gray-500">
                                {reply.timestamp}
                              </span>
                            </div>
                          </div>
                          <p className="text-[#1F1F1F] whitespace-pre-line">
                            {reply.content}
                          </p>
                          <div className="flex items-center space-x-6 mt-4">
                            <div className="flex items-center space-x-2">
                              <button className="text-gray-500 hover:text-[#AF583B]">
                                <ThumbsUp className="w-4 h-4" />
                              </button>
                              <span className="text-sm text-gray-600">
                                {reply.upvotes}
                              </span>
                            </div>
                            <button className="text-sm text-gray-500 hover:text-[#AF583B]">
                              Reply
                            </button>
                            <button className="text-sm text-gray-500 hover:text-[#AF583B]">
                              Share
                            </button>
                            <button className="text-sm text-gray-500 hover:text-red-500">
                              Report
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
