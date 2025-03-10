import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Eye,
  MousePointer,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

interface AdOverviewProps {
  dateFilter: string;
  onDateFilterChange: (filter: string) => void;
}

const revenueData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Ad Revenue",
      data: [1500, 2300, 1800, 2900, 3200, 2500, 1800],
      borderColor: "#AF583B",
      tension: 0.4,
    },
  ],
};

const performanceData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Impressions",
      data: [15000, 23000, 18000, 29000, 32000, 25000, 18000],
      borderColor: "#198E49",
      tension: 0.4,
    },
    {
      label: "Clicks",
      data: [750, 1150, 900, 1450, 1600, 1250, 900],
      borderColor: "#4B5563",
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      type: "linear" as const,
    },
  },
};

function StatCard({
  icon: Icon,
  title,
  value,
  trend,
  isPositive,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
}) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-[#F5F5F5] rounded-lg">
          <Icon className="w-6 h-6 text-[#AF583B]" />
        </div>
        <div
          className={`flex items-center space-x-1 ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowDownRight className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{trend}</span>
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-[#1F1F1F]">{value}</p>
    </div>
  );
}

function TopCampaignCard({
  rank,
  name,
  impressions,
  clicks,
  ctr,
  image,
}: {
  rank: number;
  name: string;
  impressions: number;
  clicks: number;
  ctr: number;
  image: string;
}) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex-shrink-0 w-12 h-12">
        <Image
          src={image}
          alt={name}
          className="w-full h-full rounded-lg object-cover"
          height={48}
          width={48}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>{impressions} impressions</span>
          <span className="mx-2">•</span>
          <span>{clicks} clicks</span>
          <span className="mx-2">•</span>
          <span>{ctr}% CTR</span>
        </div>
      </div>
      <div className="flex-shrink-0">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            rank === 1
              ? "bg-yellow-100 text-yellow-800"
              : rank === 2
              ? "bg-gray-100 text-gray-800"
              : "bg-orange-100 text-orange-800"
          }`}
        >
          #{rank}
        </span>
      </div>
    </div>
  );
}

export default function AdOverview({
  dateFilter,
  onDateFilterChange,
}: AdOverviewProps) {
  const [chartPeriod, setChartPeriod] = useState("daily");

  return (
    <div className="space-y-6">
      {/* Header with Date Filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Ad Overview</h2>
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
          icon={DollarSign}
          title="Total Revenue"
          value="$15,280"
          trend="+12.5%"
          isPositive={true}
        />
        <StatCard
          icon={Eye}
          title="Total Impressions"
          value="156,420"
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
          title="Average CTR"
          value="5.46%"
          trend="+0.8%"
          isPositive={true}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1F1F1F]">
              Revenue Trends
            </h3>
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
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1F1F1F]">
              Performance Metrics
            </h3>
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
            <Line data={performanceData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Top Performing Campaigns */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">
          Top Performing Campaigns
        </h3>
        <div className="space-y-4">
          <TopCampaignCard
            rank={1}
            name="TechLaunch Pro - Spotlight"
            impressions={15.4}
            clicks={770}
            ctr={5.0}
            image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
          />
          <TopCampaignCard
            rank={2}
            name="DesignFlow - Top of Search"
            impressions={12.2}
            clicks={610}
            ctr={5.0}
            image="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
          />
          <TopCampaignCard
            rank={3}
            name="MarketMaster - Sidebar"
            impressions={parseInt("8.8K")}
            clicks={396}
            ctr={4.5}
            image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
          />
        </div>
      </div>
    </div>
  );
}
