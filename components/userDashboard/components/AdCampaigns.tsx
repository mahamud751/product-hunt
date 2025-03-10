import React, { useState } from 'react';
import {
  Package,
  Edit,
  Pause,
  StopCircle,
  Trash2,
  AlertCircle,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  ChevronDown,
  CreditCard,
  Image as ImageIcon,
} from 'lucide-react';
import clsx from 'clsx';

type Campaign = {
  id: string;
  productName: string;
  headline: string;
  status: 'active' | 'pending';
  startDate: string;
  endDate: string;
  placements: string[];
};

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    productName: 'ProductX',
    headline: 'The next generation of product management',
    status: 'active',
    startDate: '2024-03-15',
    endDate: '2024-04-15',
    placements: ['Spotlight', 'Top of Search'],
  },
  {
    id: '2',
    productName: 'LaunchPro',
    headline: 'Launch your product with confidence',
    status: 'active',
    startDate: '2024-03-10',
    endDate: '2024-04-10',
    placements: ['Sidebar'],
  },
];

const StatusBadge = ({ status }: { status: Campaign['status'] }) => {
  const statusConfig = {
    active: { color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
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

const CreateCampaignModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [selectedPlacements, setSelectedPlacements] = useState<string[]>([]);

  if (!isOpen) return null;

  const placements = [
    {
      id: 'spotlight',
      name: 'Spotlight Ad',
      price: 10,
      description: 'Featured in the spotlight section',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'top-search',
      name: 'Top of Search Ad',
      price: 50,
      description: 'Appear at the top of search results',
      image: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'sidebar',
      name: 'Sidebar Ad',
      price: 20,
      description: 'Display in the sidebar section',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300&h=200',
    },
  ];

  const calculateTotal = () => {
    const days = 20; // Example duration
    return selectedPlacements.reduce((total, placement) => {
      const placementPrice = placements.find(p => p.id === placement)?.price || 0;
      return total + (placementPrice * days);
    }, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Create Ad Campaign</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <AlertCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose A Listing To Advertise
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2">
                    <option>ProductX</option>
                    <option>LaunchPro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Duration (Days)
                  </label>
                  <input
                    type="number"
                    defaultValue={20}
                    min={1}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Placement Options
                  </label>
                  <div className="grid gap-4">
                    {placements.map((placement) => (
                      <div
                        key={placement.id}
                        className={clsx(
                          'border rounded-lg p-4 cursor-pointer transition-all',
                          selectedPlacements.includes(placement.id)
                            ? 'border-[#AF583B] bg-[#AF583B]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                        onClick={() => {
                          setSelectedPlacements(prev =>
                            prev.includes(placement.id)
                              ? prev.filter(id => id !== placement.id)
                              : [...prev, placement.id]
                          );
                        }}
                      >
                        <div className="flex gap-4">
                          <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={placement.image}
                              alt={placement.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{placement.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {placement.description}
                            </p>
                            <p className="text-[#AF583B] font-medium">
                              ${placement.price} per day
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-l border-gray-100 pl-6">
            <div className="sticky top-6">
              <h3 className="font-medium mb-4">Campaign Summary</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Selected Placements</h4>
                  {selectedPlacements.length === 0 ? (
                    <p className="text-sm text-gray-500">No placements selected</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedPlacements.map(id => {
                        const placement = placements.find(p => p.id === id);
                        return (
                          <div key={id} className="flex justify-between text-sm">
                            <span>{placement?.name}</span>
                            <span>${placement?.price} / day</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total Cost (20 days)</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="btn-primary w-full flex items-center justify-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Proceed to Payment
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    By proceeding, you agree that campaigns cannot be canceled/edited without admin approval.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdCampaigns() {
  const [activeTab, setActiveTab] = useState<'active' | 'pending'>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const tabs = [
    { id: 'active' as const, label: 'Active', count: 2 },
    { id: 'pending' as const, label: 'Pending', count: 0 },
  ];

  const filteredCampaigns = MOCK_CAMPAIGNS.filter(
    (campaign) =>
      campaign.status === activeTab &&
      (searchTerm === '' ||
        campaign.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.headline.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Ad Campaigns</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary"
          >
            Boost This Launch
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
                  placeholder="Search campaigns..."
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
                  <th className="text-left p-4 font-medium text-gray-600">Headline</th>
                  <th className="text-left p-4 font-medium text-gray-600">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600">Start Date</th>
                  <th className="text-left p-4 font-medium text-gray-600">End Date</th>
                  <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-100">
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{campaign.productName}</span>
                        <div className="flex gap-1">
                          {campaign.placements.map((placement) => (
                            <span
                              key={placement}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                            >
                              {placement}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{campaign.headline}</td>
                    <td className="p-4">
                      <StatusBadge status={campaign.status} />
                    </td>
                    <td className="p-4">{campaign.startDate}</td>
                    <td className="p-4">{campaign.endDate}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          title="Edit"
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          title="Pause"
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                        >
                          <Pause className="w-4 h-4" />
                        </button>
                        <button
                          title="Stop"
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                        >
                          <StopCircle className="w-4 h-4" />
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
                {filteredCampaigns.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-6 h-6" />
                        <p>No campaigns found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}