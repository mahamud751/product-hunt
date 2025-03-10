import React from "react";
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

interface ProductPerformanceCardProps {
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  responseRate: number;
  avgResponseTime: string;
}

interface ReviewAnalyticsProps {
  dateFilter: string;
}

const reviewTrendsData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Total Reviews",
      data: [150, 230, 180, 290, 320, 250],
      borderColor: "#AF583B",
      tension: 0.4,
    },
    {
      label: "Average Rating",
      data: [4.2, 4.3, 4.1, 4.4, 4.5, 4.3],
      borderColor: "#198E49",
      tension: 0.4,
    },
  ],
};

const sentimentData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Positive",
      data: [65, 75, 70, 80, 85, 78],
      borderColor: "#198E49",
      tension: 0.4,
    },
    {
      label: "Neutral",
      data: [25, 20, 22, 15, 12, 18],
      borderColor: "#9CA3AF",
      tension: 0.4,
    },
    {
      label: "Negative",
      data: [10, 5, 8, 5, 3, 4],
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
  icon: any;
  title: any;
  value: any;
  trend: any;
  isPositive: any;
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

function TopKeywordCard({
  keyword,
  count,
  sentiment,
  trend,
}: {
  keyword: any;
  count: any;
  sentiment: any;
  trend: any;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
      <div>
        <h4 className="text-sm font-medium text-gray-900">{keyword}</h4>
        <p className="text-sm text-gray-500">{count} mentions</p>
      </div>
      <div className="flex items-center space-x-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            sentiment === "Positive"
              ? "bg-green-100 text-green-800"
              : sentiment === "Negative"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {sentiment}
        </span>
        <span
          className={`text-sm ${
            trend >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend >= 0 ? "+" : ""}
          {trend}%
        </span>
      </div>
    </div>
  );
}

function ProductPerformanceCard({
  name,
  image,
  rating,
  reviewCount,
  responseRate,
  avgResponseTime,
}: ProductPerformanceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center mb-4">
        <Image
          src={image}
          alt={name}
          className="w-12 h-12 rounded-lg object-cover"
          width={64}
          height={64}
        />
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
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
            <span className="ml-2 text-sm text-gray-500">
              {rating.toFixed(1)} ({reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-sm text-gray-500">Response Rate</p>
          <p className="text-lg font-semibold text-green-600">
            {responseRate}%
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Avg. Response Time</p>
          <p className="text-lg font-semibold text-blue-600">
            {avgResponseTime}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewAnalytics({ dateFilter }: ReviewAnalyticsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Review Analytics</h2>
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
          title="Response Rate"
          value="92%"
          trend="+5.3%"
          isPositive={true}
        />
        <StatCard
          icon={TrendingUp}
          title="Sentiment Score"
          value="8.4"
          trend="+0.6"
          isPositive={true}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">
            Review Trends
          </h3>
          <div className="h-80">
            <Line data={reviewTrendsData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">
            Sentiment Analysis
          </h3>
          <div className="h-80">
            <Line data={sentimentData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Top Keywords */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">
          Top Keywords
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TopKeywordCard
            keyword="User Interface"
            count={156}
            sentiment="Positive"
            trend={12.5}
          />
          <TopKeywordCard
            keyword="Performance"
            count={98}
            sentiment="Positive"
            trend={8.2}
          />
          <TopKeywordCard
            keyword="Customer Support"
            count={76}
            sentiment="Neutral"
            trend={-2.4}
          />
          <TopKeywordCard
            keyword="Features"
            count={124}
            sentiment="Positive"
            trend={15.3}
          />
          <TopKeywordCard
            keyword="Pricing"
            count={45}
            sentiment="Negative"
            trend={-5.8}
          />
          <TopKeywordCard
            keyword="Documentation"
            count={67}
            sentiment="Neutral"
            trend={3.2}
          />
        </div>
      </div>

      {/* Product Performance */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">
          Product Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductPerformanceCard
            name="TechLaunch Pro"
            image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
            rating={4.8}
            reviewCount={324}
            responseRate={95}
            avgResponseTime="2.5h"
          />
          <ProductPerformanceCard
            name="DesignFlow"
            image="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
            rating={4.6}
            reviewCount={256}
            responseRate={88}
            avgResponseTime="3.2h"
          />
          <ProductPerformanceCard
            name="MarketMaster"
            image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
            rating={4.5}
            reviewCount={198}
            responseRate={92}
            avgResponseTime="1.8h"
          />
        </div>
      </div>
    </div>
  );
}
