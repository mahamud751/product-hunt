import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Download,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";

interface Campaign {
  id: string;
  productName: string;
  productImage: string;
  headline: string;
  placement: "Spotlight" | "Top of Search" | "Sidebar";
  impressions: number;
  clicks: number;
  ctr: number;
  spent: number;
  startDate: string;
  endDate: string;
  performance: "High" | "Medium" | "Low";
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    productName: "TechLaunch Pro",
    productImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80",
    headline: "Launch your tech product with confidence",
    placement: "Spotlight",
    impressions: 15400,
    clicks: 770,
    ctr: 5.0,
    spent: 4240,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    performance: "High",
  },
  {
    id: "2",
    productName: "DesignFlow",
    productImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80",
    headline: "Design workflow automation for teams",
    placement: "Top of Search",
    impressions: 12200,
    clicks: 610,
    ctr: 5.0,
    spent: 3560,
    startDate: "2024-01-14",
    endDate: "2024-02-14",
    performance: "Medium",
  },
  {
    id: "3",
    productName: "MarketMaster",
    productImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80",
    headline: "AI-powered market analysis",
    placement: "Sidebar",
    impressions: 8800,
    clicks: 396,
    ctr: 4.5,
    spent: 1980,
    startDate: "2024-01-13",
    endDate: "2024-02-13",
    performance: "Low",
  },
];

export default function ExpiredCampaigns({
  dateFilter,
}: {
  dateFilter: string;
}) {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [performanceFilter, setPerformanceFilter] = useState("All");
  const [placementFilter, setPlacementFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"productName" | "impressions" | "spent">(
    "spent"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCampaigns(mockCampaigns.map((campaign) => campaign.id));
    } else {
      setSelectedCampaigns([]);
    }
  };

  const handleSelectCampaign = (campaignId: string) => {
    if (selectedCampaigns.includes(campaignId)) {
      setSelectedCampaigns(selectedCampaigns.filter((id) => id !== campaignId));
    } else {
      setSelectedCampaigns([...selectedCampaigns, campaignId]);
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "High":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPlacementColor = (placement: string) => {
    switch (placement) {
      case "Spotlight":
        return "bg-purple-100 text-purple-800";
      case "Top of Search":
        return "bg-blue-100 text-blue-800";
      case "Sidebar":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCampaigns = mockCampaigns
    .filter(
      (campaign) =>
        (campaign.productName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
          campaign.headline
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) &&
        (performanceFilter === "All" ||
          campaign.performance === performanceFilter) &&
        (placementFilter === "All" || campaign.placement === placementFilter)
    )
    .sort((a, b) => {
      if (sortBy === "impressions" || sortBy === "spent") {
        return sortOrder === "asc"
          ? a[sortBy] - b[sortBy]
          : b[sortBy] - a[sortBy];
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
          Expired Campaigns
        </h2>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730] transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Renew Selected</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={performanceFilter}
            onChange={(e) => setPerformanceFilter(e.target.value)}
          >
            <option value="All">All Performance</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={placementFilter}
            onChange={(e) => setPlacementFilter(e.target.value)}
          >
            <option value="All">All Placements</option>
            <option value="Spotlight">Spotlight</option>
            <option value="Top of Search">Top of Search</option>
            <option value="Sidebar">Sidebar</option>
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="productName">Sort by Product</option>
              <option value="impressions">Sort by Impressions</option>
              <option value="spent">Sort by Spent</option>
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
      {selectedCampaigns.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedCampaigns.length} campaigns selected
          </span>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-[#AF583B] text-white hover:bg-[#8E4730]">
              <RefreshCw className="w-4 h-4" />
              <span>Renew</span>
            </button>
          </div>
        </div>
      )}

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedCampaigns.length === mockCampaigns.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                />
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Campaign
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Placement
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Performance
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Results
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Duration
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCampaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedCampaigns.includes(campaign.id)}
                    onChange={() => handleSelectCampaign(campaign.id)}
                    className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <Image
                        className="h-10 w-10 rounded-lg object-cover"
                        src={campaign.productImage}
                        alt="campain product"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {campaign.productName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {campaign.headline}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPlacementColor(
                      campaign.placement
                    )}`}
                  >
                    {campaign.placement}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPerformanceColor(
                      campaign.performance
                    )}`}
                  >
                    {campaign.performance}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {campaign.impressions.toLocaleString()} impressions
                  </div>
                  <div className="text-sm text-gray-500">
                    {campaign.clicks.toLocaleString()} clicks ({campaign.ctr}%
                    CTR)
                  </div>
                  <div className="text-sm font-medium text-[#AF583B]">
                    ${campaign.spent.toLocaleString()} spent
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{new Date(campaign.startDate).toLocaleDateString()}</div>
                  <div>to</div>
                  <div>{new Date(campaign.endDate).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="text-[#AF583B] hover:text-[#8E4730]">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-900">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
