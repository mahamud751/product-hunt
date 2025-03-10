import React, { useState } from 'react';
import { Search, Filter, Plus, Trash2, Edit3, DollarSign, Tag, Clock } from 'lucide-react';

interface Discount {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  amount: number;
  plan: 'regular' | 'pro' | 'featured' | 'all';
  validUntil: string;
  maxRedemptions: number;
  maxRedemptionsPerUser: number;
  isRecurring: boolean;
  isActive: boolean;
  redemptionCount: number;
  createdAt: string;
}

const mockDiscounts: Discount[] = [
  {
    id: '1',
    name: 'Early Bird Pro',
    type: 'percentage',
    amount: 20,
    plan: 'pro',
    validUntil: '2024-03-31T23:59:59Z',
    maxRedemptions: 100,
    maxRedemptionsPerUser: 1,
    isRecurring: false,
    isActive: true,
    redemptionCount: 45,
    createdAt: '2024-02-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Featured Launch Special',
    type: 'fixed',
    amount: 50,
    plan: 'featured',
    validUntil: '2024-04-15T23:59:59Z',
    maxRedemptions: 50,
    maxRedemptionsPerUser: 1,
    isRecurring: false,
    isActive: true,
    redemptionCount: 12,
    createdAt: '2024-02-14T15:30:00Z'
  },
  {
    id: '3',
    name: 'Bulk Launch Discount',
    type: 'percentage',
    amount: 15,
    plan: 'all',
    validUntil: '2024-05-01T23:59:59Z',
    maxRedemptions: 200,
    maxRedemptionsPerUser: 3,
    isRecurring: true,
    isActive: true,
    redemptionCount: 78,
    createdAt: '2024-02-13T09:15:00Z'
  }
];

export default function DiscountManagement() {
  const [discounts, setDiscounts] = useState<Discount[]>(mockDiscounts);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'amount' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedDiscounts(discounts.map(discount => discount.id));
    } else {
      setSelectedDiscounts([]);
    }
  };

  const handleSelectDiscount = (discountId: string) => {
    if (selectedDiscounts.includes(discountId)) {
      setSelectedDiscounts(selectedDiscounts.filter(id => id !== discountId));
    } else {
      setSelectedDiscounts([...selectedDiscounts, discountId]);
    }
  };

  const handleToggleActive = (discountId: string) => {
    setDiscounts(discounts.map(discount =>
      discount.id === discountId
        ? { ...discount, isActive: !discount.isActive }
        : discount
    ));
  };

  const handleEditDiscount = (discount: Discount) => {
    setEditingDiscount({ ...discount });
  };

  const handleUpdateDiscount = () => {
    if (editingDiscount) {
      setDiscounts(discounts.map(d => d.id === editingDiscount.id ? editingDiscount : d));
      setEditingDiscount(null);
    }
  };

  const handleDeleteSelected = () => {
    setDiscounts(discounts.filter(discount => !selectedDiscounts.includes(discount.id)));
    setSelectedDiscounts([]);
  };

  const filteredDiscounts = discounts
    .filter(discount =>
      discount.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (planFilter === 'all' || discount.plan === planFilter) &&
      (typeFilter === 'all' || discount.type === typeFilter)
    )
    .sort((a, b) => {
      if (sortBy === 'amount') {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
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
        <h2 className="text-xl font-semibold text-[#1F1F1F]">Discount Management</h2>
        <button
          onClick={() => setEditingDiscount({
            id: `new-${Date.now()}`,
            name: '',
            type: 'percentage',
            amount: 0,
            plan: 'all',
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            maxRedemptions: 0,
            maxRedemptionsPerUser: 1,
            isRecurring: false,
            isActive: true,
            redemptionCount: 0,
            createdAt: new Date().toISOString()
          })}
          className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Discount</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search discounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <select 
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
          >
            <option value="all">All Plans</option>
            <option value="regular">Regular Launch</option>
            <option value="pro">Pro Launch</option>
            <option value="featured">Featured Launch</option>
          </select>

          <select 
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select 
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="name">Sort by Name</option>
              <option value="amount">Sort by Amount</option>
              <option value="createdAt">Sort by Date</option>
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
      {selectedDiscounts.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedDiscounts.length} discounts selected
          </span>
          <div className="flex space-x-3">
            <button
              onClick={handleDeleteSelected}
              className="flex items-center space-x-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Selected</span>
            </button>
          </div>
        </div>
      )}

      {/* Discounts Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedDiscounts.length === discounts.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valid Until
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDiscounts.map((discount) => (
              <tr key={discount.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedDiscounts.includes(discount.id)}
                    onChange={() => handleSelectDiscount(discount.id)}
                    className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{discount.name}</div>
                  <div className="text-sm text-gray-500">
                    {discount.isRecurring ? 'Recurring' : 'One-time'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    discount.type === 'percentage' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {discount.type === 'percentage' ? 'Percentage' : 'Fixed'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {discount.type === 'percentage' ? `${discount.amount}%` : `$${discount.amount}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    discount.plan === 'featured' ? 'bg-purple-100 text-purple-800' :
                    discount.plan === 'pro' ? 'bg-blue-100 text-blue-800' :
                    discount.plan === 'regular' ? 'bg-gray-100 text-gray-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {discount.plan === 'all' ? 'All Plans' : `${discount.plan.charAt(0).toUpperCase()}${discount.plan.slice(1)} Launch`}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {discount.redemptionCount} / {discount.maxRedemptions || '∞'}
                  </div>
                  <div className="text-sm text-gray-500">
                    Max {discount.maxRedemptionsPerUser || '∞'} per user
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(discount.validUntil).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={discount.isActive}
                      onChange={() => handleToggleActive(discount.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#AF583B]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#AF583B]"></div>
                  </label>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditDiscount(discount)}
                    className="text-[#AF583B] hover:text-[#8E4730]"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Discount Modal */}
      {editingDiscount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {editingDiscount.id.startsWith('new-') ? 'Create Discount' : 'Edit Discount'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Name
                </label>
                <input
                  type="text"
                  value={editingDiscount.name}
                  onChange={(e) => setEditingDiscount({ ...editingDiscount, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Type
                  </label>
                  <select
                    value={editingDiscount.type}
                    onChange={(e) => setEditingDiscount({ ...editingDiscount, type: e.target.value as 'percentage' | 'fixed' })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    {editingDiscount.type === 'fixed' ? (
                      <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    ) : (
                      <Tag className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    )}
                    <input
                      type="number"
                      value={editingDiscount.amount}
                      onChange={(e) => setEditingDiscount({ ...editingDiscount, amount: Number(e.target.value) })}
                      min="0"
                      max={editingDiscount.type === 'percentage' ? 100 : undefined}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Applicable Plan
                </label>
                <select
                  value={editingDiscount.plan}
                  onChange={(e) => setEditingDiscount({ ...editingDiscount, plan: e.target.value as 'regular' | 'pro' | 'featured' | 'all' })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                >
                  <option value="all">All Plans</option>
                  <option value="regular">Regular Launch</option>
                  <option value="pro">Pro Launch</option>
                  <option value="featured">Featured Launch</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid Until
                  </label>
                  <div className="relative">
                    <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="datetime-local"
                      value={editingDiscount.validUntil.slice(0, 16)}
                      onChange={(e) => setEditingDiscount({ ...editingDiscount, validUntil: new Date(e.target.value).toISOString() })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Redemptions
                  </label>
                  <input
                    type="number"
                    value={editingDiscount.maxRedemptions}
                    onChange={(e) => setEditingDiscount({ ...editingDiscount, maxRedemptions: Number(e.target.value) })}
                    min="0"
                    placeholder="0 for unlimited"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Redemptions Per User
                </label>
                <input
                  type="number"
                  value={editingDiscount.maxRedemptionsPerUser}
                  onChange={(e) => setEditingDiscount({ ...editingDiscount, maxRedemptionsPerUser: Number(e.target.value) })}
                  min="0"
                  placeholder="0 for unlimited"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isRecurring"
                  checked={editingDiscount.isRecurring}
                  onChange={(e) => setEditingDiscount({ ...editingDiscount, isRecurring: e.target.checked })}
                  className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                />
                <label htmlFor="isRecurring" className="text-sm text-gray-700">
                  Apply discount to recurring payments
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={editingDiscount.isActive}
                  onChange={(e) => setEditingDiscount({ ...editingDiscount, isActive: e.target.checked })}
                  className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700">
                  Discount is active
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setEditingDiscount(null)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateDiscount}
                className="bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730]"
              >
                {editingDiscount.id.startsWith('new-') ? 'Create Discount' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}