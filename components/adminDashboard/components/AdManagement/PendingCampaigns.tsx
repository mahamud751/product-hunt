import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Download, CheckCircle, XCircle, Edit3, Trash2 } from 'lucide-react';

interface Campaign {
  id: string;
  productName: string;
  productImage: string;
  headline: string;
  placement: 'Spotlight' | 'Top of Search' | 'Sidebar';
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  submittedBy: {
    name: string;
    email: string;
    avatar: string;
  };
  submittedAt: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    productName: 'TechLaunch Pro',
    productImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80',
    headline: 'Launch your tech product with confidence',
    placement: 'Spotlight',
    totalAmount: 199.99,
    discountAmount: 20.00,
    finalAmount: 179.99,
    submittedBy: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://i.pravatar.cc/40?u=1'
    },
    submittedAt: '2024-02-15T10:00:00Z'
  },
  {
    id: '2',
    productName: 'DesignFlow',
    productImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80',
    headline: 'Design workflow automation for teams',
    placement: 'Top of Search',
    totalAmount: 299.99,
    discountAmount: 0,
    finalAmount: 299.99,
    submittedBy: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://i.pravatar.cc/40?u=2'
    },
    submittedAt: '2024-02-14T15:30:00Z'
  },
  {
    id: '3',
    productName: 'MarketMaster',
    productImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80',
    headline: 'AI-powered market analysis',
    placement: 'Sidebar',
    totalAmount: 149.99,
    discountAmount: 15.00,
    finalAmount: 134.99,
    submittedBy: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: 'https://i.pravatar.cc/40?u=3'
    },
    submittedAt: '2024-02-13T09:15:00Z'
  }
];

export default function PendingCampaigns({ dateFilter }: { dateFilter: string }) {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [placementFilter, setPlacementFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'productName' | 'totalAmount' | 'submittedAt'>('submittedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCampaigns(mockCampaigns.map(campaign => campaign.id));
    } else {
      setSelectedCampaigns([]);
    }
  };

  const handleSelectCampaign = (campaignId: string) => {
    if (selectedCampaigns.includes(campaignId)) {
      setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaignId));
    } else {
      setSelectedCampaigns([...selectedCampaigns, campaignId]);
    }
  };

  const getPlacementColor = (placement: string) => {
    switch (placement) {
      case 'Spotlight':
        return 'bg-purple-100 text-purple-800';
      case 'Top of Search':
        return 'bg-blue-100 text-blue-800';
      case 'Sidebar':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCampaigns = mockCampaigns
    .filter(campaign => 
      (campaign.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
       campaign.headline.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (placementFilter === 'All' || campaign.placement === placementFilter)
    )
    .sort((a, b) => {
      if (sortBy === 'totalAmount') {
        return sortOrder === 'asc' ? a.totalAmount - b.totalAmount : b.totalAmount - a.totalAmount;
      }
      const compareValue = (val1: string, val2: string) => {
        return sortOrder === 'asc' ? val1.localeCompare(val2) : val2.localeCompare(val1);
      };
      return compareValue(a[sortBy], b[sortBy]);
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1F1F1F]">Pending Campaigns</h2>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
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
              <option value="totalAmount">Sort by Amount</option>
              <option value="submittedAt">Sort by Date</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
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
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200">
              <CheckCircle className="w-4 h-4" />
              <span>Approve</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
              <XCircle className="w-4 h-4" />
              <span>Reject</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
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
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Placement
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted By
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted At
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
                      <img className="h-10 w-10 rounded-lg object-cover" src={campaign.productImage} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{campaign.productName}</div>
                      <div className="text-sm text-gray-500">{campaign.headline}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPlacementColor(campaign.placement)}`}>
                    {campaign.placement}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${campaign.totalAmount.toFixed(2)}
                  </div>
                  {campaign.discountAmount > 0 && (
                    <>
                      <div className="text-xs text-gray-500">
                        -${campaign.discountAmount.toFixed(2)} discount
                      </div>
                      <div className="text-sm font-medium text-[#AF583B]">
                        ${campaign.finalAmount.toFixed(2)} final
                      </div>
                    </>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <img className="h-8 w-8 rounded-full" src={campaign.submittedBy.avatar} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{campaign.submittedBy.name}</div>
                      <div className="text-sm text-gray-500">{campaign.submittedBy.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(campaign.submittedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="text-[#AF583B] hover:text-[#8E4730]">
                      <Edit3 className="w-4 h-4" />
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