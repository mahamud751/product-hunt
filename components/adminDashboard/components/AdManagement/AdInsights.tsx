import React from 'react';
import { Line } from 'react-chartjs-2';
import { ArrowUpRight, ArrowDownRight, DollarSign, Eye, MousePointer, TrendingUp } from 'lucide-react';

interface AdInsightsProps {
  dateFilter: string;
}

const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Impressions',
      data: [15000, 23000, 18000, 29000, 32000, 25000],
      borderColor: '#AF583B',
      tension: 0.4,
    },
    {
      label: 'Clicks',
      data: [750, 1150, 900, 1450, 1600, 1250],
      borderColor: '#198E49',
      tension: 0.4,
    }
  ]
};

const conversionData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Conversion Rate',
      data: [4.2, 4.3, 4.1, 4.4, 4.5, 4.3],
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

function TopPerformerCard({ rank, name, image, impressions, clicks, ctr, revenue }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-lg object-cover" />
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            rank === 1 ? 'bg-yellow-100 text-yellow-800' :
            rank === 2 ? 'bg-gray-100 text-gray-800' :
            'bg-orange-100 text-orange-800'
          }`}>
            #{rank} Top Performer
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-sm text-gray-500">Impressions</p>
          <p className="text-lg font-semibold text-gray-900">{impressions.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Clicks</p>
          <p className="text-lg font-semibold text-gray-900">{clicks.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">CTR</p>
          <p className="text-lg font-semibold text-green-600">{ctr}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-lg font-semibold text-[#AF583B]">${revenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdInsights({ dateFilter }: AdInsightsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Ad Insights</h2>
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
          icon={Eye}
          title="Total Impressions"
          value="156,420"
          trend="+12.5%"
          isPositive={true}
        />
        <StatCard
          icon={MousePointer}
          title="Total Clicks"
          value="8,543"
          trend="+8.2%"
          isPositive={true}
        />
        <StatCard
          icon={TrendingUp}
          title="Average CTR"
          value="5.46%"
          trend="+15.3%"
          isPositive={true}
        />
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value="$15,280"
          trend="-2.4%"
          isPositive={false}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Performance Metrics</h3>
          <div className="h-80">
            <Line data={performanceData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Conversion Trends</h3>
          <div className="h-80">
            <Line data={conversionData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Top Performing Ads</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TopPerformerCard
            rank={1}
            name="TechLaunch Pro"
            image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
            impressions={32000}
            clicks={1600}
            ctr={5.0}
            revenue={4240}
          />
          <TopPerformerCard
            rank={2}
            name="DesignFlow"
            image="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
            impressions={29000}
            clicks={1450}
            ctr={5.0}
            revenue={3560}
          />
          <TopPerformerCard
            rank={3}
            name="MarketMaster"
            image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
            impressions={25000}
            clicks={1250}
            ctr={5.0}
            revenue={1980}
          />
        </div>
      </div>
    </div>
  );
}