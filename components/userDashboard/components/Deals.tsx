import React, { useState } from 'react';
import {
  Package,
  Edit,
  Trash2,
  AlertCircle,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  ChevronDown,
  XCircle,
  Calendar,
  DollarSign,
  Link,
  Percent,
} from 'lucide-react';
import clsx from 'clsx';

type Deal = {
  id: string;
  productName: string;
  dealName: string;
  status: 'draft' | 'submitted' | 'active' | 'expired';
  startDate: string;
  endDate: string;
  discountAmount: number;
  originalPrice: number;
  discountedPrice: number;
  discountCode?: string;
};

const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    productName: 'ProductX',
    dealName: '40% OFF ProductX Pro Plan',
    status: 'active',
    startDate: '2024-03-15',
    endDate: '2024-04-15',
    discountAmount: 40,
    originalPrice: 99,
    discountedPrice: 59.40,
    discountCode: 'PRODUCTX40',
  },
  {
    id: '2',
    productName: 'LaunchPro',
    dealName: 'Spring Sale - 25% OFF',
    status: 'draft',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    discountAmount: 25,
    originalPrice: 79,
    discountedPrice: 59.25,
  },
];

const StatusBadge = ({ status }: { status: Deal['status'] }) => {
  const statusConfig = {
    draft: { color: 'bg-gray-100 text-gray-800', icon: Clock },
    submitted: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    active: { color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
    expired: { color: 'bg-red-100 text-red-800', icon: XCircle },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={clsx('px-3 py-1 rounded-full flex items-center gap-1 w-fit', config.color)}>
      <Icon className="w-4 h-4" />
      <span className="capitalize">{status}</span>
    </span>
  );
};

const CreateDealModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [discountAmount, setDiscountAmount] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);

  if (!isOpen) return null;

  const calculateDiscountedPrice = () => {
    return originalPrice - (originalPrice * discountAmount) / 100;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Create New Deal</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <AlertCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Product
            </label>
            <select className="w-full border border-gray-200 rounded-lg px-4 py-2">
              <option>ProductX</option>
              <option>LaunchPro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deal Title
            </label>
            <input
              type="text"
              placeholder="e.g., 40% OFF My Product"
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deal URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://example.com/deal"
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2"
              />
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Link className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price ($)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Amount (%)
              </label>
              <div className="relative">
                <Percent className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(Number(e.target.value))}
                  max={100}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discounted Price
            </label>
            <div className="bg-gray-50 px-4 py-2 rounded-lg text-lg font-medium">
              ${calculateDiscountedPrice().toFixed(2)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Code (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., SUMMER2024"
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="btn-primary">
              Create Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Deals() {
  const [activeTab, setActiveTab] = useState<Deal['status']>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const tabs = [
    { id: 'draft' as const, label: 'Draft', count: 1 },
    { id: 'submitted' as const, label: 'Submitted', count: 0 },
    { id: 'active' as const, label: 'Active', count: 1 },
    { id: 'expired' as const, label: 'Expired', count: 0 },
  ];

  const filteredDeals = MOCK_DEALS.filter(
    (deal) =>
      deal.status === activeTab &&
      (searchTerm === '' ||
        deal.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.dealName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Deals</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary"
          >
            Create New Deal
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100">
            <div className="flex p-4 gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'px-4 py-2 rounded-lg flex items-center gap-2',
                    activeTab === tab.id
                      ? 'bg-gray-50 text-gray-900 font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  {tab.label}
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-sm">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-b border-gray-100">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search deals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
                />
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left p-4 font-medium text-gray-600">Product Name</th>
                  <th className="text-left p-4 font-medium text-gray-600">Deal Name</th>
                  <th className="text-left p-4 font-medium text-gray-600">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600">Start Date</th>
                  <th className="text-left p-4 font-medium text-gray-600">End Date</th>
                  <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeals.map((deal) => (
                  <tr key={deal.id} className="border-b border-gray-100">
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{deal.productName}</span>
                        {deal.discountCode && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full w-fit">
                            {deal.discountCode}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">{deal.dealName}</td>
                    <td className="p-4">
                      <StatusBadge status={deal.status} />
                    </td>
                    <td className="p-4">{deal.startDate}</td>
                    <td className="p-4">{deal.endDate}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          title="Edit"
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          title="Delete"
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredDeals.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-6 h-6" />
                        <p>No deals found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CreateDealModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}