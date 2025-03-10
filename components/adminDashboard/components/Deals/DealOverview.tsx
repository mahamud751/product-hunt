import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { ArrowUpRight, ArrowDownRight, Gift, Clock, CheckCircle, XCircle } from 'lucide-react';

interface DealOverviewProps {
  dateFilter: string;
  onDateFilterChange: (filter: string) => void;
}

const dealData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Active Deals',
      data: [15, 23, 18, 29, 32, 25, 18],
      borderColor: '#AF583B',
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

function TopDealCard({ rank, name, discount, image, redemptions }) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex-shrink-0 w-12 h-12">
        <img src={image} alt={name} className="w-full h-full rounded-lg object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <p className="text-sm text-gray-500">{discount} off • {redemptions} redemptions</p>
      </div>
      <div className="flex-shrink-0">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          rank === 1 ? 'bg-yellow-100 text-yellow-800' :
          rank === 2 ? 'bg-gray-100 text-gray-800' :
          'bg-orange-100 text-orange-800'
        }`}>
          #{rank}
        </span>
      </div>
    </div>
  );
}

export default function DealOverview({ dateFilter, onDateFilterChange }: DealOverviewProps) {
  const [chartPeriod, setChartPeriod] = useState('daily');

  return (
    <div className="space-y-6">
      {/* Header with Date Filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Deals Overview</h2>
        <select
          value={dateFilter}
          onChange={(e) => onDateFilterChange?.(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
        >
          <option value="today">Today</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">This Month</option>
          <option value="last-month">Last Month</option>
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
          title="Active Deals"
          value="42"
          trend="+8.2%"
          isPositive={true}
        />
        <StatCard
          icon={Clock}
          title="Pending Approvals"
          value="23"
          trend="-2.4%"
          isPositive={false}
        />
        <StatCard
          icon={XCircle}
          title="Expired Deals"
          value="91"
          trend="+15.3%"
          isPositive={true}
        />
      </div>

      {/* Deal Trends Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1F1F1F]">Deal Trends</h3>
          <select 
            className="border border-gray-200 rounded-lg px-3 py-1 text-sm"
            value={chartPeriod}
            onChange={(e) => setChartPeriod(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="h-80">
          <Line data={dealData} options={chartOptions} />
        </div>
      </div>

      {/* Top Deals */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Top Performing Deals</h3>
        <div className="space-y-4">
          <TopDealCard
            rank={1}
            name="TechLaunch Pro"
            discount="50%"
            redemptions={324}
            image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
          />
          <TopDealCard
            rank={2}
            name="DesignFlow"
            discount="30%"
            redemptions={256}
            image="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
          />
          <TopDealCard
            rank={3}
            name="MarketMaster"
            discount="25%"
            redemptions={198}
            image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
          />
        </div>
      </div>
    </div>
  );
}