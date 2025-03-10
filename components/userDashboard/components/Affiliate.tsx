import React, { useState } from 'react';
import { DollarSign, Users, Wallet, Clock, Copy, Trash2, Link, AlertCircle, Search, Filter, ChevronDown, GoalIcon as PaypalIcon, CreditCard, ArrowRightLeft, CheckCircle2, Plus, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';

type AffiliateLink = {
  id: string;
  url: string;
  revenue: number;
  conversions: number;
  createdAt: string;
};

type Withdrawal = {
  id: string;
  date: string;
  amount: number;
  paymentMethod: 'paypal' | 'payoneer' | 'wise';
  paymentEmail: string;
  status: 'pending' | 'completed';
};

const MOCK_PERFORMANCE_DATA = [
  { date: '2024-03-01', revenue: 120, conversions: 3 },
  { date: '2024-03-02', revenue: 80, conversions: 2 },
  { date: '2024-03-03', revenue: 200, conversions: 5 },
  { date: '2024-03-04', revenue: 160, conversions: 4 },
  { date: '2024-03-05', revenue: 240, conversions: 6 },
  { date: '2024-03-06', revenue: 100, conversions: 2 },
  { date: '2024-03-07', revenue: 180, conversions: 4 },
];

const MOCK_AFFILIATE_LINKS: AffiliateLink[] = [
  {
    id: '1',
    url: 'https://launchap.com/?ref=john123',
    revenue: 450,
    conversions: 12,
    createdAt: '2024-03-01',
  },
  {
    id: '2',
    url: 'https://launchap.com/deals?ref=john123',
    revenue: 280,
    conversions: 7,
    createdAt: '2024-03-05',
  },
];

const MOCK_WITHDRAWALS: Withdrawal[] = [
  {
    id: '1',
    date: '2024-03-15',
    amount: 450,
    paymentMethod: 'paypal',
    paymentEmail: 'john@example.com',
    status: 'completed',
  },
  {
    id: '2',
    date: '2024-03-20',
    amount: 280,
    paymentMethod: 'wise',
    paymentEmail: 'john@example.com',
    status: 'pending',
  },
];

const MetricCard = ({ title, value, icon: Icon, trend }: {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: { value: string; positive: boolean };
}) => (
  <div className="card">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-600 mb-1">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        {trend && (
          <p className={clsx(
            'text-sm mt-1',
            trend.positive ? 'text-green-600' : 'text-red-600'
          )}>
            {trend.value}
          </p>
        )}
      </div>
      <Icon className="w-6 h-6 text-gray-400" />
    </div>
  </div>
);

const CreateLinkModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Create Affiliate Link</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <AlertCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target URL
            </label>
            <select className="w-full border border-gray-200 rounded-lg px-4 py-2">
              <option value="homepage">Homepage</option>
              <option value="deals">Deals Page</option>
              <option value="products">Products Page</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Campaign (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., summer2024"
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="btn-primary">
              Create Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('week');

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          title="Revenue Earned"
          value="$1,280.00"
          icon={DollarSign}
          trend={{ value: '+12.5% from last month', positive: true }}
        />
        <MetricCard
          title="Total Conversions"
          value="32"
          icon={Users}
          trend={{ value: '+8.2% from last month', positive: true }}
        />
        <MetricCard
          title="Withdrawable Balance"
          value="$730.00"
          icon={Wallet}
        />
        <MetricCard
          title="Pending Balance"
          value="$550.00"
          icon={Clock}
        />
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Performance Overview</h2>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_PERFORMANCE_DATA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar
                yAxisId="left"
                dataKey="revenue"
                fill="#AF583B"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="conversions"
                fill="#198E49"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const LinkManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-md relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Link
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left p-4 font-medium text-gray-600">Link</th>
              <th className="text-left p-4 font-medium text-gray-600">Revenue</th>
              <th className="text-left p-4 font-medium text-gray-600">Conversions</th>
              <th className="text-right p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_AFFILIATE_LINKS.map((link) => (
              <tr key={link.id} className="border-b border-gray-100">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate max-w-md">{link.url}</span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </td>
                <td className="p-4">${link.revenue.toFixed(2)}</td>
                <td className="p-4">{link.conversions}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => copyToClipboard(link.url)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                      title="Copy Link"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateLinkModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState<'paypal' | 'payoneer' | 'wise'>('paypal');
  const [email, setEmail] = useState('');

  const paymentMethods = [
    { id: 'paypal' as const, name: 'PayPal', icon: PaypalIcon },
    { id: 'payoneer' as const, name: 'Payoneer', icon: CreditCard },
    { id: 'wise' as const, name: 'Wise', icon: ArrowRightLeft },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Payment Method</h2>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={clsx(
                  'w-full p-4 rounded-lg border transition-all flex items-center gap-3',
                  selectedMethod === method.id
                    ? 'border-[#AF583B] bg-[#AF583B]/5'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <method.icon className="w-5 h-5" />
                <span className="font-medium">{method.name}</span>
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your payment email"
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
            />
          </div>

          <button className="btn-primary w-full">
            Save Payment Details
          </button>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Withdraw Funds</h2>
          
          <div className="card bg-gray-50 border-none">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Available Balance</span>
              <span className="text-2xl font-bold text-green-600">$730.00</span>
            </div>
            <button className="btn-primary w-full">
              Withdraw Funds
            </button>
            <div className="mt-4 text-sm text-gray-500 space-y-2">
              <p>✅ Minimum withdrawal: $50.00</p>
              <p>⏳ Conversions become withdrawable after 30 days</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Withdrawal History</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left p-4 font-medium text-gray-600">Date</th>
                  <th className="text-left p-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left p-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_WITHDRAWALS.map((withdrawal) => (
                  <tr key={withdrawal.id} className="border-b border-gray-100">
                    <td className="p-4">
                      {new Date(withdrawal.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="p-4">${withdrawal.amount.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={clsx(
                        'px-3 py-1 rounded-full text-sm flex items-center gap-1 w-fit',
                        withdrawal.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      )}>
                        {withdrawal.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                        <span className="capitalize">{withdrawal.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Affiliate() {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'links' | 'payments'>('dashboard');

  const sections = [
    { id: 'dashboard' as const, label: 'Dashboard' },
    { id: 'links' as const, label: 'Link Management' },
    { id: 'payments' as const, label: 'Payment & Withdrawals' },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Affiliate Program</h1>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-100">
            <div className="flex gap-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={clsx(
                    'px-4 py-2 -mb-px font-medium',
                    activeSection === section.id
                      ? 'text-[#AF583B] border-b-2 border-[#AF583B]'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {activeSection === 'dashboard' && <Dashboard />}
        {activeSection === 'links' && <LinkManagement />}
        {activeSection === 'payments' && <PaymentMethods />}
      </div>
    </div>
  );
}