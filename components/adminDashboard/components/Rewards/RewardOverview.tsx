import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  ArrowUpRight,
  ArrowDownRight,
  Award,
  Star,
  Gift,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

interface RewardOverviewProps {
  dateFilter: string;
  onDateFilterChange: (filter: string) => void;
}

const rewardData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Points Earned",
      data: [1500, 2300, 1800, 2900, 3200, 2500, 1800],
      borderColor: "#AF583B",
      tension: 0.4,
    },
    {
      label: "Points Redeemed",
      data: [800, 1200, 900, 1500, 1700, 1300, 950],
      borderColor: "#198E49",
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
  icon: any;
  title: string;
  value: any;
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

function TopUserCard({
  rank,
  name,
  points,
  image,
}: {
  rank: number;
  name: string;
  points: number;
  image: string;
}) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex-shrink-0 w-12 h-12">
        <Image
          src={image}
          alt={name}
          className="w-full h-full rounded-full object-cover"
          width={48}
          height={48}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <p className="text-sm text-gray-500">
          {points.toLocaleString()} points
        </p>
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

export default function RewardOverview({
  dateFilter,
  onDateFilterChange,
}: RewardOverviewProps) {
  const [chartPeriod, setChartPeriod] = useState("daily");

  return (
    <div className="space-y-6">
      {/* Header with Date Filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Reward Overview</h2>
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
          icon={Award}
          title="Total Points Earned"
          value="156,420"
          trend="+12.5%"
          isPositive={true}
        />
        <StatCard
          icon={Gift}
          title="Points Redeemed"
          value="85,230"
          trend="+8.2%"
          isPositive={true}
        />
        <StatCard
          icon={Star}
          title="Active Users"
          value="1,284"
          trend="+15.3%"
          isPositive={true}
        />
        <StatCard
          icon={TrendingUp}
          title="Avg. Daily Points"
          value="5,214"
          trend="+5.8%"
          isPositive={true}
        />
      </div>

      {/* Charts Grid */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1F1F1F]">
            Points Activity
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
          <Line data={rewardData} options={chartOptions} />
        </div>
      </div>

      {/* Top Users */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">
          Top Point Earners
        </h3>
        <div className="space-y-4">
          <TopUserCard
            rank={1}
            name="John Doe"
            points={15420}
            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
          <TopUserCard
            rank={2}
            name="Jane Smith"
            points={12350}
            image="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
          <TopUserCard
            rank={3}
            name="Mike Johnson"
            points={9870}
            image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          />
        </div>
      </div>
    </div>
  );
}
