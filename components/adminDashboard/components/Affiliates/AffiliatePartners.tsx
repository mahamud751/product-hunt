import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import Image from "next/image";

interface Affiliate {
  id: string;
  email: string;
  country: string;
  countryCode: string;
  totalConversions: number;
  revenueGenerated: number;
  status: "Active" | "Suspended";
  joinDate: string;
}

const mockAffiliates: Affiliate[] = [
  {
    id: "1",
    email: "sarah@example.com",
    country: "United States",
    countryCode: "US",
    totalConversions: 156,
    revenueGenerated: 12500,
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    email: "michael@example.com",
    country: "United Kingdom",
    countryCode: "GB",
    totalConversions: 98,
    revenueGenerated: 8200,
    status: "Active",
    joinDate: "2024-01-20",
  },
  {
    id: "3",
    email: "emma@example.com",
    country: "Canada",
    countryCode: "CA",
    totalConversions: 45,
    revenueGenerated: 3800,
    status: "Suspended",
    joinDate: "2024-02-01",
  },
];

export default function AffiliatePartners() {
  const [selectedAffiliates, setSelectedAffiliates] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"email" | "conversions" | "revenue">(
    "revenue"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedAffiliates(mockAffiliates.map((affiliate) => affiliate.id));
    } else {
      setSelectedAffiliates([]);
    }
  };

  const handleSelectAffiliate = (affiliateId: string) => {
    if (selectedAffiliates.includes(affiliateId)) {
      setSelectedAffiliates(
        selectedAffiliates.filter((id) => id !== affiliateId)
      );
    } else {
      setSelectedAffiliates([...selectedAffiliates, affiliateId]);
    }
  };

  const filteredAffiliates = mockAffiliates
    .filter(
      (affiliate) =>
        affiliate.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (statusFilter === "All" || affiliate.status === statusFilter)
    )
    .sort((a, b) => {
      if (sortBy === "email") {
        return sortOrder === "asc"
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      }
      if (sortBy === "conversions") {
        return sortOrder === "asc"
          ? a.totalConversions - b.totalConversions
          : b.totalConversions - a.totalConversions;
      }
      return sortOrder === "asc"
        ? a.revenueGenerated - b.revenueGenerated
        : b.revenueGenerated - a.revenueGenerated;
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">
          Affiliate Partners
        </h2>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search affiliates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="email">Sort by Email</option>
              <option value="conversions">Sort by Conversions</option>
              <option value="revenue">Sort by Revenue</option>
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
      {selectedAffiliates.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedAffiliates.length} affiliates selected
          </span>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200">
              <CheckCircle className="w-4 h-4" />
              <span>Activate</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
              <XCircle className="w-4 h-4" />
              <span>Suspend</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
              <Trash2 className="w-4 h-4" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      )}

      {/* Affiliates Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedAffiliates.length === mockAffiliates.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                />
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Affiliate
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Country
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Conversions
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Revenue Generated
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAffiliates.map((affiliate) => (
              <tr key={affiliate.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedAffiliates.includes(affiliate.id)}
                    onChange={() => handleSelectAffiliate(affiliate.id)}
                    className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {affiliate.email}
                  </div>
                  <div className="text-sm text-gray-500">
                    Joined {new Date(affiliate.joinDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Image
                      src={`https://flagcdn.com/w20/${affiliate.countryCode.toLowerCase()}.png`}
                      alt={affiliate.country}
                      className="mr-2 h-4"
                      height={20}
                      width={20}
                    />
                    <span className="text-sm text-gray-900">
                      {affiliate.country}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {affiliate.totalConversions}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${affiliate.revenueGenerated.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      affiliate.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {affiliate.status}
                  </span>
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
