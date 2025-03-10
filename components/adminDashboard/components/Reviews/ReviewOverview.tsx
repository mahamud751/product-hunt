import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  ArrowUpRight,
  ArrowDownRight,
  Star,
  MessageSquare,
  Flag,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

interface ReviewOverviewProps {
  dateFilter: string;
  onDateFilterChange: (filter: string) => void;
}

const reviewData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Total Reviews",
      data: [150, 230, 180, 290, 320, 250, 180],
      borderColor: "#AF583B",
      tension: 0.4,
    },
  ],
};

const sentimentData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Positive",
      data: [80, 120, 90, 150, 170, 130, 95],
      borderColor: "#198E49",
      tension: 0.4,
    },
    {
      label: "Negative",
      data: [30, 45, 35, 60, 65, 50, 35],
      borderColor: "#DC2626",
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

function TopReviewCard({
  rank,
  productName,
  rating,
  reviewCount,
  image,
}: {
  rank: number;
  productName: string;
  rating: number;
  reviewCount: number;
  image: string;
}) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex-shrink-0 w-12 h-12">
        <Image
          src={image}
          alt={productName}
          className="w-full h-full rounded-lg object-cover"
          height={48}
          width={48}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {productName}
        </p>
        <div className="flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500">
            {reviewCount} reviews
          </span>
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

export default function ReviewOverview({
  dateFilter,
  onDateFilterChange,
}: ReviewOverviewProps) {
  const [chartPeriod, setChartPeriod] = useState("daily");

  return (
    <div className="space-y-6">
      {/* Header with Date Filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Review Overview</h2>
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
          title="Total Reviews"
          value="1,584"
          trend="+12.5%"
          isPositive={true}
        />
        <StatCard
          icon={Star}
          title="Average Rating"
          value="4.5"
          trend="+0.3"
          isPositive={true}
        />
        <StatCard
          icon={Flag}
          title="Flagged Reviews"
          value="23"
          trend="-2.4%"
          isPositive={false}
        />
        <StatCard
          icon={TrendingUp}
          title="Response Rate"
          value="92%"
          trend="+5.3%"
          isPositive={true}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1F1F1F]">
              Review Volume
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
            <Line data={reviewData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1F1F1F]">
              Sentiment Analysis
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
            <Line data={sentimentData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Top Reviewed Products */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">
          Top Reviewed Products
        </h3>
        <div className="space-y-4">
          <TopReviewCard
            rank={1}
            productName="TechLaunch Pro"
            rating={4.8}
            reviewCount={324}
            image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
          />
          <TopReviewCard
            rank={2}
            productName="DesignFlow"
            rating={4.6}
            reviewCount={256}
            image="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
          />
          <TopReviewCard
            rank={3}
            productName="MarketMaster"
            rating={4.5}
            reviewCount={198}
            image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
          />
        </div>
      </div>
    </div>
  );
}
