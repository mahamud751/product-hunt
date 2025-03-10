import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Flag,
  Ban,
  CheckCircle,
  XCircle,
  MessageSquare,
  Trash2,
} from "lucide-react";
import Image from "next/image";

interface FlaggedThread {
  id: string;
  title: string;
  content: string;
  category: string;
  flagReason: "Spam" | "Offensive" | "Inappropriate" | "Off-Topic";
  status: "Under Review" | "Investigating" | "Resolved";
  reports: number;
  author: {
    name: string;
    email: string;
    avatar: string;
    previousFlags: number;
  };
  reportedBy: {
    name: string;
    email: string;
    avatar: string;
  };
  reportedAt: string;
}

const mockFlaggedThreads: FlaggedThread[] = [
  {
    id: "1",
    title: "Promotional content disguised as discussion",
    content: "Check out my new product at...",
    category: "Product Launch",
    flagReason: "Spam",
    status: "Under Review",
    reports: 5,
    author: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://i.pravatar.cc/40?u=1",
      previousFlags: 2,
    },
    reportedBy: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      avatar: "https://i.pravatar.cc/40?u=4",
    },
    reportedAt: "2024-02-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Inappropriate language in discussion",
    content: "This content has been flagged for review...",
    category: "Marketing",
    flagReason: "Offensive",
    status: "Investigating",
    reports: 3,
    author: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://i.pravatar.cc/40?u=2",
      previousFlags: 1,
    },
    reportedBy: {
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "https://i.pravatar.cc/40?u=3",
    },
    reportedAt: "2024-02-14T15:30:00Z",
  },
  {
    id: "3",
    title: "Off-topic discussion in product category",
    content: "Content not related to the category...",
    category: "Community",
    flagReason: "Off-Topic",
    status: "Resolved",
    reports: 2,
    author: {
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "https://i.pravatar.cc/40?u=3",
      previousFlags: 0,
    },
    reportedBy: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://i.pravatar.cc/40?u=1",
    },
    reportedAt: "2024-02-13T09:15:00Z",
  },
];

export default function FlaggedContent({ dateFilter }: { dateFilter: string }) {
  const [selectedThreads, setSelectedThreads] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [reasonFilter, setReasonFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState<
    "reports" | "reportedAt" | "previousFlags"
  >("reportedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedThreads(mockFlaggedThreads.map((thread) => thread.id));
    } else {
      setSelectedThreads([]);
    }
  };

  const handleSelectThread = (threadId: string) => {
    if (selectedThreads.includes(threadId)) {
      setSelectedThreads(selectedThreads.filter((id) => id !== threadId));
    } else {
      setSelectedThreads([...selectedThreads, threadId]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      case "Investigating":
        return "bg-blue-100 text-blue-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case "Spam":
        return "bg-yellow-100 text-yellow-800";
      case "Offensive":
        return "bg-red-100 text-red-800";
      case "Inappropriate":
        return "bg-orange-100 text-orange-800";
      case "Off-Topic":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredThreads = mockFlaggedThreads
    .filter(
      (thread) =>
        (thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          thread.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          thread.author.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) &&
        (reasonFilter === "All" || thread.flagReason === reasonFilter) &&
        (statusFilter === "All" || thread.status === statusFilter)
    )
    .sort((a, b) => {
      if (sortBy === "reports" || sortBy === "previousFlags") {
        const aValue =
          sortBy === "previousFlags" ? a.author.previousFlags : a[sortBy];
        const bValue =
          sortBy === "previousFlags" ? b.author.previousFlags : b[sortBy];
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortOrder === "asc"
        ? a[sortBy].localeCompare(b[sortBy])
        : b[sortBy].localeCompare(a[sortBy]);
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1F1F1F]">
          Flagged Content
        </h2>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search flagged content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={reasonFilter}
            onChange={(e) => setReasonFilter(e.target.value)}
          >
            <option value="All">All Reasons</option>
            <option value="Spam">Spam</option>
            <option value="Offensive">Offensive</option>
            <option value="Inappropriate">Inappropriate</option>
            <option value="Off-Topic">Off-Topic</option>
          </select>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Under Review">Under Review</option>
            <option value="Investigating">Investigating</option>
            <option value="Resolved">Resolved</option>
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="reports">Sort by Reports</option>
              <option value="reportedAt">Sort by Report Date</option>
              <option value="previousFlags">Sort by Previous Flags</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedThreads.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedThreads.length} threads selected
          </span>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200">
              <CheckCircle className="w-4 h-4" />
              <span>Mark as Valid</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
              <Flag className="w-4 h-4" />
              <span>Investigate</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
              <XCircle className="w-4 h-4" />
              <span>Remove Thread</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
              <Ban className="w-4 h-4" />
              <span>Ban User</span>
            </button>
          </div>
        </div>
      )}

      {/* Flagged Threads Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedThreads.length === mockFlaggedThreads.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                />
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Thread
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Flag Reason
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reports
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Author
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reported By
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reported At
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredThreads.map((thread) => (
              <tr key={thread.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedThreads.includes(thread.id)}
                    onChange={() => handleSelectThread(thread.id)}
                    className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {thread.title}
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {thread.content}
                    </div>
                    <div className="mt-1">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {thread.category}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getReasonColor(
                      thread.flagReason
                    )}`}
                  >
                    {thread.flagReason}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      thread.status
                    )}`}
                  >
                    {thread.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1 text-gray-500" />
                    {thread.reports}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={thread.author.avatar}
                        alt=""
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {thread.author.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Previous Flags: {thread.author.previousFlags}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={thread.reportedBy.avatar}
                        alt=""
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {thread.reportedBy.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {thread.reportedBy.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(thread.reportedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-900">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
