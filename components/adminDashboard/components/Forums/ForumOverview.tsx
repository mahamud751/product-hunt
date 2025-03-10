import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { ArrowUpRight, ArrowDownRight, MessageSquare, Users, Flag, TrendingUp } from 'lucide-react';

interface ForumOverviewProps {
  dateFilter: string;
  onDateFilterChange: (filter: string) => void;
}

const threadData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Total Threads',
      data: [150, 230, 180, 290, 320, 250, 180],
      borderColor: '#AF583B',
      tension: 0.4,
    }
  ]
};

const engagementData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Comments',
      data: [450, 680, 540, 870, 960, 750, 540],
      borderColor: '#198E49',
      tension: 0.4,
    },
    {
      label: 'Active Users',
      data: [120, 180, 150, 220, 240, 200, 160],
      borderColor: '#4B5563',
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

function TopThreadCard({ rank, title, author, category, replies, views }) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex-shrink-0 w-12 h-12">
        <div className={`w-full h-full rounded-lg flex items-center justify-center ${
          rank === 1 ? 'bg-yellow-100' :
          rank === 2 ? 'bg-gray-100' :
          'bg-orange-100'
        }`}>
          <span className={`text-lg font-bold ${
            rank === 1 ? 'text-yellow-800' :
            rank === 2 ? 'text-gray-800' :
            'text-orange-800'
          }`}>#{rank}</span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>{author}</span>
          <span className="mx-2">•</span>
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">{category}</span>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <div>
          <span className="font-medium">{replies}</span> replies
        </div>
        <div>
          <span className="font-medium">{views}</span> views
        </div>
      </div>
    </div>
  );
}

export default function ForumOverview({ dateFilter, onDateFilterChange }: ForumOverviewProps) {
  const [chartPeriod, setChartPeriod] = useState('daily');

  return (
    <div className="space-y-6">
      {/* Header with Date Filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Forum Overview</h2>
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
          icon={MessageSquare}
          title="Total Threads"
          value="1,584"
          trend="+12.5%"
          isPositive={true}
        />
        <StatCard
          icon={Users}
          title="Active Users"
          value="324"
          trend="+8.2%"
          isPositive={true}
        />
        <StatCard
          icon={Flag}
          title="Reported Content"
          value="23"
          trend="-2.4%"
          isPositive={false}
        />
        <StatCard
          icon={TrendingUp}
          title="Engagement Rate"
          value="92%"
          trend="+5.3%"
          isPositive={true}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1F1F1F]">Thread Activity</h3>
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
            <Line data={threadData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1F1F1F]">User Engagement</h3>
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
            <Line data={engagementData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Top Threads */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Trending Discussions</h3>
        <div className="space-y-4">
          <TopThreadCard
            rank={1}
            title="Best practices for launching a SaaS product"
            author="John Doe"
            category="Product Launch"
            replies={45}
            views={1250}
          />
          <TopThreadCard
            rank={2}
            title="How to effectively use social media for marketing"
            author="Jane Smith"
            category="Marketing"
            replies={38}
            views={980}
          />
          <TopThreadCard
            rank={3}
            title="Building a strong community around your product"
            author="Mike Johnson"
            category="Community"
            replies={32}
            views={845}
          />
        </div>
      </div>
    </div>
  );
}