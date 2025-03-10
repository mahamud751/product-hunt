import React from "react";
import { Line } from "react-chartjs-2";
import {
  DollarSign,
  CreditCard,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface RevenueOverviewProps {
  dateFilter: string;
  onDateFilterChange: (filter: string) => void;
}

const revenueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Subscription Revenue",
      data: [30000, 35000, 32000, 40000, 38000, 42000],
      borderColor: "#AF583B",
      tension: 0.4,
    },
    {
      label: "One-Time Purchases",
      data: [15000, 18000, 16000, 20000, 19000, 21000],
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

export default function RevenueOverview({
  dateFilter,
  onDateFilterChange,
}: RevenueOverviewProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Header with Date Filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Revenue Overview</h2>
        <select
          value={dateFilter}
          onChange={(e) => onDateFilterChange(e.target.value)}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value="$89,325.00"
          trend="+12.5%"
          isPositive={true}
        />
        <StatCard
          icon={Receipt}
          title="Total Fees"
          value="$4,466.25"
          trend="+8.2%"
          isPositive={true}
        />
        <StatCard
          icon={CreditCard}
          title="Transaction Count"
          value="1,284"
          trend="-2.4%"
          isPositive={false}
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1F1F1F]">
            Revenue Breakdown
          </h3>
          <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm">
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        <div className="h-80">
          <Line data={revenueData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
