import React, { useState } from 'react';
import { Search, Filter, MoreVertical, CheckCircle, XCircle, MessageSquare, Flag, Clock } from 'lucide-react';

interface PendingProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  submittedBy: {
    name: string;
    email: string;
    avatar: string;
  };
  submittedAt: string;
  status: 'Pending' | 'Under Review' | 'Needs Info';
  notes?: string;
  flags: {
    type: 'Duplicate' | 'Inappropriate' | 'Spam';
    count: number;
  }[];
}

const mockPendingProducts: PendingProduct[] = [
  {
    id: '1',
    name: 'TechLaunch Pro',
    description: 'A comprehensive platform for launching tech products with built-in analytics and marketing tools.',
    category: 'Development Tools',
    submittedBy: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    submittedAt: '2024-02-15T10:00:00Z',
    status: 'Pending',
    flags: [
      { type: 'Duplicate', count: 2 }
    ]
  },
  {
    id: '2',
    name: 'DesignFlow',
    description: 'AI-powered design tool for creating stunning user interfaces with automated workflows.',
    category: 'Design Tools',
    submittedBy: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    submittedAt: '2024-02-14T15:30:00Z',
    status: 'Under Review',
    notes: 'Checking for similar products in the database',
    flags: []
  },
  {
    id: '3',
    name: 'MarketMaster',
    description: 'Marketing automation platform with advanced analytics and campaign management.',
    category: 'Marketing',
    submittedBy: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
    },
    submittedAt: '2024-02-13T09:15:00Z',
    status: 'Needs Info',
    notes: 'Requesting additional pricing information',
    flags: [
      { type: 'Spam', count: 1 }
    ]
  }
];

export default function PendingApprovals({ dateFilter }: { dateFilter: string }) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'submittedAt' | 'status'>('submittedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProducts(mockPendingProducts.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Needs Info':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFlagColor = (type: string) => {
    switch (type) {
      case 'Duplicate':
        return 'bg-purple-100 text-purple-800';
      case 'Inappropriate':
        return 'bg-red-100 text-red-800';
      case 'Spam':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProducts = mockPendingProducts
    .filter(product => 
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (categoryFilter === 'All' || product.category === categoryFilter) &&
      (statusFilter === 'All' || product.status === statusFilter)
    )
    .sort((a, b) => {
      const compareValue = (val1: string, val2: string) => {
        return sortOrder === 'asc' ? val1.localeCompare(val2) : val2.localeCompare(val1);
      };
      return compareValue(a[sortBy], b[sortBy]);
    });

  const selectedProduct = selectedProductId 
    ? mockPendingProducts.find(product => product.id === selectedProductId)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1F1F1F]">Pending Approvals</h2>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <select 
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Development Tools">Development Tools</option>
            <option value="Design Tools">Design Tools</option>
            <option value="Marketing">Marketing</option>
          </select>

          <select 
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Needs Info">Needs Info</option>
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select 
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="name">Sort by Name</option>
              <option value="submittedAt">Sort by Date</option>
              <option value="status">Sort by Status</option>
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
      {selectedProducts.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedProducts.length} products selected
          </span>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200">
              <CheckCircle className="w-4 h-4" />
              <span>Approve</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
              <MessageSquare className="w-4 h-4" />
              <span>Request Info</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
              <XCircle className="w-4 h-4" />
              <span>Reject</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Table */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === mockPendingProducts.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Flags
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr 
                  key={product.id} 
                  className={`hover:bg-gray-50 cursor-pointer ${selectedProductId === product.id ? 'bg-gray-50' : ''}`}
                  onClick={() => setSelectedProductId(product.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {product.flags.map((flag, index) => (
                        <span 
                          key={index}
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getFlagColor(flag.type)}`}
                          title={`${flag.type}: ${flag.count}`}
                        >
                          {flag.count}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(product.submittedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-900" onClick={e => e.stopPropagation()}>
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Product Details Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {selectedProduct ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#1F1F1F]">Product Details</h3>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-6">
                {/* Submitter Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Submitted By</h4>
                  <div className="flex items-center">
                    <img 
                      src={selectedProduct.submittedBy.avatar} 
                      alt={selectedProduct.submittedBy.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{selectedProduct.submittedBy.name}</p>
                      <p className="text-sm text-gray-500">{selectedProduct.submittedBy.email}</p>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Product Information</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-900">{selectedProduct.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Category:</span>
                      <span className="text-sm text-gray-900">{selectedProduct.category}</span>
                    </div>
                  </div>
                </div>

                {/* Flags */}
                {selectedProduct.flags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Flags</h4>
                    <div className="space-y-2">
                      {selectedProduct.flags.map((flag, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Flag className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{flag.type}</span>
                          <span className="text-sm text-gray-500">({flag.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selectedProduct.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                    <p className="text-sm text-gray-600">{selectedProduct.notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200">
                    <MessageSquare className="w-4 h-4" />
                    <span>Request Info</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Select a product to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}