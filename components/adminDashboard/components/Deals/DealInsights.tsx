import React from 'react';
import { Line } from 'react-chartjs-2';
import { ArrowUpRight, ArrowDownRight, Gift, Clock, CheckCircle, XCircle } from 'lucide-react';

interface DealInsightsProps {
  dateFilter: string;
}

const dealTrendsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Approved Deals',
      data: [45, 52, 49, 60, 55, 65],
      borderColor: '#AF583B',
      tension: 0.4,
    },
    {
      label: 'Rejected Deals',
      data: [10, 15, 12, 8, 9, 11],
      borderColor: '#DC2626',
      tension: 0.4,
    }
  ]
};

const redemptionData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Deal Redemptions',
      data: [150, 230, 180, 290, 320, 250],
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
      type: 'linear' as const,
    }
  }
};

function StatCard({ icon: Icon, title, value, trend, isPositive }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-[#F5F5F5] rounded-lg">
          <Icon className="w-6 h-6 text-[#AF583B]" />
        </div>
        <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span className="text-sm font-medium">{trend}</span>
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-[#1F1F1F]">{value}</p>
    </div>
  );
}

function ModeratorCard({ name, email, avatar, approvals, rejections, avgResponseTime }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center mb-4">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Approvals</p>
          <p className="text-lg font-semibold text-green-600">{approvals}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Rejections</p>
          <p className="text-lg font-semibold text-red-600">{rejections}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Avg. Response</p>
          <p className="text-lg font-semibold text-blue-600">{avgResponseTime}</p>
        </div>
      </div>
    </div>
  );
}

export default function DealInsights({ dateFilter }: DealInsightsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Deal Insights</h2>
        <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]">
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Gift}
          title="Total Deals"
          value="156"
          trend="+12.5%"
          isPositive={true}
        />
        <StatCard
          icon={CheckCircle}
          title="Approval Rate"
          value="85%"
          trend="+8.2%"
          isPositive={true}
        />
        <StatCard
          icon={Clock}
          title="Avg. Response Time"
          value="2.4h"
          trend="-15.3%"
          isPositive={true}
        />
        <StatCard
          icon={XCircle}
          title="Rejection Rate"
          value="15%"
          trend="+2.4%"
          isPositive={false}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Deal Approval Trends</h3>
          <div className="h-80">
            <Line data={dealTrendsData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Redemption Trends</h3>
          <div className="h-80">
            <Line data={redemptionData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Moderator Performance */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Moderator Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModeratorCard
            name="John Doe"
            email="john@example.com"
            avatar="https://i.pravatar.cc/150?u=1"
            approvals={124}
            rejections={18}
            avgResponseTime="1.8h"
          />
          <ModeratorCard
            name="Jane Smith"
            email="jane@example.com"
            avatar="https://i.pravatar.cc/150?u=2"
            approvals={98}
            rejections={12}
            avgResponseTime="2.2h"
          />
          <ModeratorCard
            name="Mike Johnson"
            email="mike@example.com"
            avatar="https://i.pravatar.cc/150?u=3"
            approvals={156}
            rejections={24}
            avgResponseTime="1.5h"
          />
        </div>
      </div>
    </div>
  );
}