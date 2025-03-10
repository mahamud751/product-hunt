import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Gift,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Download,
} from "lucide-react";
import Image from "next/image";

interface RedemptionRequest {
  id: string;
  userId: string;
  userName: string;
  email: string;
  reward: {
    name: string;
    type: "Gift Card" | "Product Discount" | "Premium Access" | "Custom";
    value: number;
    pointCost: number;
  };
  status: "Pending" | "Approved" | "Rejected" | "Fulfilled";
  requestedAt: string;
  updatedAt: string;
  notes?: string;
}

const mockRedemptions: RedemptionRequest[] = [
  {
    id: "1",
    userId: "user_1",
    userName: "John Doe",
    email: "john@example.com",
    reward: {
      name: "Amazon Gift Card",
      type: "Gift Card",
      value: 50,
      pointCost: 5000,
    },
    status: "Pending",
    requestedAt: "2024-02-15T10:00:00Z",
    updatedAt: "2024-02-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user_2",
    userName: "Jane Smith",
    email: "jane@example.com",
    reward: {
      name: "Premium Subscription",
      type: "Premium Access",
      value: 99,
      pointCost: 10000,
    },
    status: "Approved",
    requestedAt: "2024-02-14T15:30:00Z",
    updatedAt: "2024-02-14T16:00:00Z",
    notes: "Premium access granted for 1 year",
  },
  {
    id: "3",
    userId: "user_3",
    userName: "Mike Johnson",
    email: "mike@example.com",
    reward: {
      name: "Product Discount 25%",
      type: "Product Discount",
      value: 25,
      pointCost: 2500,
    },
    status: "Rejected",
    requestedAt: "2024-02-13T09:15:00Z",
    updatedAt: "2024-02-13T10:00:00Z",
    notes: "Insufficient points balance",
  },
];

export default function RedemptionRequests({
  dateFilter,
}: {
  dateFilter: string;
}) {
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState<
    "userName" | "pointCost" | "requestedAt"
  >("requestedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRequests(mockRedemptions.map((request) => request.id));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleSelectRequest = (requestId: string) => {
    if (selectedRequests.includes(requestId)) {
      setSelectedRequests(selectedRequests.filter((id) => id !== requestId));
    } else {
      setSelectedRequests([...selectedRequests, requestId]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Fulfilled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRewardTypeColor = (type: string) => {
    switch (type) {
      case "Gift Card":
        return "bg-purple-100 text-purple-800";
      case "Product Discount":
        return "bg-blue-100 text-blue-800";
      case "Premium Access":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRequests = mockRedemptions
    .filter(
      (request) =>
        (request.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.reward.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) &&
        (typeFilter === "All" || request.reward.type === typeFilter) &&
        (statusFilter === "All" || request.status === statusFilter)
    )
    .sort((a, b) => {
      if (sortBy === "pointCost") {
        return sortOrder === "asc"
          ? a.reward.pointCost - b.reward.pointCost
          : b.reward.pointCost - a.reward.pointCost;
      }
      const compareValue = (val1: string, val2: string) => {
        return sortOrder === "asc"
          ? val1.localeCompare(val2)
          : val2.localeCompare(val1);
      };
      return compareValue(a[sortBy], b[sortBy]);
    });

  const selectedRequest = selectedRequestId
    ? mockRedemptions.find((request) => request.id === selectedRequestId)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1F1F1F]">
          Redemption Requests
        </h2>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
          <Download className="w-4 h-4" />
          <span>Export Requests</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Gift Card">Gift Cards</option>
            <option value="Product Discount">Product Discounts</option>
            <option value="Premium Access">Premium Access</option>
            <option value="Custom">Custom Rewards</option>
          </select>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Fulfilled">Fulfilled</option>
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="userName">Sort by User</option>
              <option value="pointCost">Sort by Points</option>
              <option value="requestedAt">Sort by Date</option>
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
      {selectedRequests.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedRequests.length} requests selected
          </span>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200">
              <CheckCircle className="w-4 h-4" />
              <span>Approve</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
              <XCircle className="w-4 h-4" />
              <span>Reject</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requests Table */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRequests.length === mockRedemptions.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                  />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Reward
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Points
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
                  Requested
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    selectedRequestId === request.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedRequestId(request.id)}
                >
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRequests.includes(request.id)}
                      onChange={() => handleSelectRequest(request.id)}
                      className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Image
                          className="h-10 w-10 rounded-full"
                          src={`https://i.pravatar.cc/40?u=${request.userId}`}
                          alt=""
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {request.userName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {request.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {request.reward.name}
                    </div>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRewardTypeColor(
                        request.reward.type
                      )}`}
                    >
                      {request.reward.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.reward.pointCost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.requestedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-gray-400 hover:text-gray-900"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Request Details Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {selectedRequest ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#1F1F1F]">
                  Request Details
                </h3>
                <Gift className="w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-6">
                {/* Reward Details */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Reward
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Name</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedRequest.reward.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Value</span>
                      <span className="text-sm font-medium text-gray-900">
                        ${selectedRequest.reward.value}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Points Cost</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedRequest.reward.pointCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          Request Submitted
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(
                            selectedRequest.requestedAt
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {selectedRequest.updatedAt !==
                      selectedRequest.requestedAt && (
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <Clock className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            Last Updated
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(
                              selectedRequest.updatedAt
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {selectedRequest.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedRequest.notes}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                {selectedRequest.status === "Pending" && (
                  <div className="flex space-x-3 pt-4">
                    <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Select a request to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
