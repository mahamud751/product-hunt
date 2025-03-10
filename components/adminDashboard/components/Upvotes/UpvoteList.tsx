import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Download, Flag, CheckCircle, XCircle } from 'lucide-react';

interface Upvote {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  productId: string;
  productName: string;
  timestamp: string;
  ipAddress: string;
  deviceInfo: string;
  fraudStatus: 'Legit' | 'Flagged' | 'Under Review';
}

const mockUpvotes: Upvote[] = [
  {
    id: '1',
    userId: 'user_1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    productId: 'prod_1',
    productName: 'TechLaunch Pro',
    timestamp: '2024-02-15T10:00:00Z',
    ipAddress: '192.168.1.1',
    deviceInfo: 'Chrome 121.0.0 / Windows',
    fraudStatus: 'Legit'
  },
  {
    id: '2',
    userId: 'user_2',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    productId: 'prod_2',
    productName: 'DesignFlow',
    timestamp: '2024-02-14T15:30:00Z',
    ipAddress: '192.168.1.2',
    deviceInfo: 'Safari 17.0 / macOS',
    fraudStatus: 'Flagged'
  },
  {
    id: '3',
    userId: 'user_3',
    userName: 'Mike Johnson',
    userEmail: 'mike@example.com',
    productId: 'prod_3',
    productName: 'MarketMaster',
    timestamp: '2024-02-13T09:15:00Z',
    ipAddress: '192.168.1.3',
    deviceInfo: 'Firefox 122.0 / Linux',
    fraudStatus: 'Under Review'
  }
];

export default function UpvoteList({ dateFilter }: { dateFilter: string }) {
  const [selectedUpvotes, setSelectedUpvotes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'userName' | 'productName' | 'timestamp'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUpvotes(mockUpvotes.map(upvote => upvote.id));
    } else {
      setSelectedUpvotes([]);
    }
  };

  const handleSelectUpvote = (upvoteId: string) => {
    if (selectedUpvotes.includes(upvoteId)) {
      setSelectedUpvotes(selectedUpvotes.filter(id => id !== upvoteId));
    } else {
      setSelectedUpvotes([...selectedUpvotes, upvoteId]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Legit':
        return 'bg-green-100 text-green-800';
      case 'Flagged':
        return 'bg-red-100 text-red-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUpvotes = mockUpvotes
    .filter(upvote => 
      (upvote.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
       upvote.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
       upvote.ipAddress.includes(searchQuery)) &&
      (statusFilter === 'All' || upvote.fraudStatus === statusFilter)
    )
    .sort((a, b) => {
      const compareValue = (val1: string, val2: string) => {
        return sortOrder === 'asc' ? val1.localeCompare(val2) : val2.localeCompare(val1);
      };
      return compareValue(a[sortBy], b[sortBy]);
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1F1F1F]">Upvote List</h2>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
          <Download className="w-4 h-4" />
          <span>Export List</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by user, product, or IP..."
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
            <option value="Legit">Legit</option>
            <option value="Flagged">Flagged</option>
            <option value="Under Review">Under Review</option>
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select 
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="userName">Sort by User</option>
              <option value="productName">Sort by Product</option>
              <option value="timestamp">Sort by Date</option>
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
      {selectedUpvotes.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedUpvotes.length} upvotes selected
          </span>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200">
              <CheckCircle className="w-4 h-4" />
              <span>Mark as Legit</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
              <Flag className="w-4 h-4" />
              <span>Flag for Review</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
              <XCircle className="w-4 h-4" />
              <span>Mark as Fraud</span>
            </button>
          </div>
        </div>
      )}

      {/* Upvotes Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedUpvotes.length === mockUpvotes.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Device Info
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUpvotes.map((upvote) => (
              <tr key={upvote.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedUpvotes.includes(upvote.id)}
                    onChange={() => handleSelectUpvote(upvote.id)}
                    className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://i.pravatar.cc/40?u=${upvote.userId}`}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{upvote.userName}</div>
                      <div className="text-sm text-gray-500">{upvote.userEmail}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {upvote.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {upvote.ipAddress}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {upvote.deviceInfo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(upvote.fraudStatus)}`}>
                    {upvote.fraudStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(upvote.timestamp).toLocaleString()}
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