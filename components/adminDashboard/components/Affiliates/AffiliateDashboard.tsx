import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { DollarSign, Users, MousePointer, TrendingUp } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const earningsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Total Earnings',
      data: [3000, 3500, 4200, 4800, 5100, 5600],
      borderColor: '#AF583B',
      tension: 0.4,
    }
  ]
};

const conversionData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Conversion Rate',
      data: [2.1, 2.3, 2.8, 3.2, 3.5, 3.8],
      borderColor: '#198E49',
      tension: 0.4,
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    }
  }
};

// StatCard Component
function StatCard({ icon: Icon, title, value, trend, isPositive }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-[#F5F5F5] rounded-lg">
          <Icon className="w-6 h-6 text-[#AF583B]" />
        </div>
        <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">{trend}</span>
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-[#1F1F1F]">{value}</p>
    </div>
  );
}

export default function AffiliateDashboard() {
  return (
    <div className="space-y-6">
      {/* Header with Date Filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Affiliate Dashboard</h2>
        <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]">
          <option>Last 7 Days</option>
          <option>Last Month</option>
          <option>This Year</option>
          <option>Custom Range</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          title="Total Affiliate Earnings"
          value="$15,280"
          trend="+12.5%"
          isPositive={true}
        />
        <StatCard
          icon={Users}
          title="Active Affiliates"
          value="142"
          trend="+8.2%"
          isPositive={true}
        />
        <StatCard
          icon={MousePointer}
          title="Total Clicks"
          value="8,543"
          trend="+15.3%"
          isPositive={true}
        />
        <StatCard
          icon={TrendingUp}
          title="Conversion Rate"
          value="3.8%"
          trend="+0.5%"
          isPositive={true}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Earnings Overview</h3>
          <div className="h-64">
            <Line data={earningsData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Conversion Trends</h3>
          <div className="h-64">
            <Line data={conversionData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Top Affiliates */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Top Performing Affiliates</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Affiliate
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Earnings
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: 'Sarah Johnson', email: 'sarah@example.com', earnings: '$2,450', conversions: 45, rate: '4.2%' },
                { name: 'Michael Chen', email: 'michael@example.com', earnings: '$1,890', conversions: 38, rate: '3.9%' },
                { name: 'Emma Davis', email: 'emma@example.com', earnings: '$1,670', conversions: 32, rate: '3.7%' },
              ].map((affiliate, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://i.pravatar.cc/40?img=${idx + 1}`}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{affiliate.name}</div>
                        <div className="text-sm text-gray-500">{affiliate.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {affiliate.earnings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {affiliate.conversions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {affiliate.rate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}