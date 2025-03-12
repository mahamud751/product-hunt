"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Star,
  Flag,
  Download,
} from "lucide-react";
import Image from "next/image";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getProducts,
  getTopUpvotedProducts,
  getFilteredProducts,
  getTotalUpvotes,
} from "@/lib/server-actions"; // Adjust path as needed

// Register Chart.js components
ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsProps {
  dateFilter: string; // "7d", "30d", "90d", or "custom"
}

interface StatData {
  totalViews: number;
  totalUpvotes: number;
  approvalRate: number;
  engagementRate: number;
  viewsTrend: string;
  upvotesTrend: string;
}

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
    x: {
      type: "category" as const,
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
  value: number;
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

function TopProductCard({
  rank,
  name,
  metric,
  value,
  image,
}: {
  rank: number;
  name: string;
  metric: string;
  value: number;
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
        <p className="text-sm text-gray-500">
          {metric}: {value}
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

export default function ProductAnalytics({ dateFilter }: AnalyticsProps) {
  const [chartPeriod, setChartPeriod] = useState<"day" | "week" | "month">(
    "month"
  );
  const [viewsData, setViewsData] = useState<any>(null);
  const [upvotesData, setUpvotesData] = useState<any>(null);
  const [topViewedProducts, setTopViewedProducts] = useState<any[]>([]);
  const [topUpvotedProducts, setTopUpvotedProducts] = useState<any[]>([]);
  const [stats, setStats] = useState<StatData>({
    totalViews: 0,
    totalUpvotes: 0,
    approvalRate: 0,
    engagementRate: 0,
    viewsTrend: "0%",
    upvotesTrend: "0%",
  });
  const [loading, setLoading] = useState(true);

  // Map dateFilter to chartPeriod-compatible filter
  const getFilterForPeriod = () => {
    switch (dateFilter) {
      case "7d":
        return "week";
      case "30d":
      case "90d":
        return "month";
      case "custom":
        return chartPeriod; // Use manual selection for custom
      default:
        return "month";
    }
  };

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      try {
        const filter = getFilterForPeriod();

        // Fetch all active products
        const { products } = await getProducts(0, 1000, "ACTIVE"); // Adjust pagination as needed

        // Fetch filtered products for trends
        const filteredProducts = await getFilteredProducts(filter);
        const prevFilter =
          filter === "day" ? "day" : filter === "week" ? "week" : "month";
        const prevProducts = await getFilteredProducts(prevFilter); // Simplified; adjust for previous period

        // Aggregate total views and upvotes
        const totalViews = products.reduce((sum, p) => sum + p.views, 0);
        const totalUpvotes = await getTotalUpvotes();
        const approvalRate = products.length
          ? (products.filter((p) => p.status === "ACTIVE").length /
              products.length) *
            100
          : 0;
        const engagementRate =
          totalViews > 0 ? (totalUpvotes / totalViews) * 100 : 0;

        // Calculate trends (simplified)
        const prevViews = prevProducts.reduce((sum, p) => sum + p.views, 0);
        const prevUpvotes = prevProducts.reduce(
          (sum, p) => sum + p.upvotes.length,
          0
        );
        const viewsTrend = prevViews
          ? (((totalViews - prevViews) / prevViews) * 100).toFixed(1) + "%"
          : "0%";
        const upvotesTrend = prevUpvotes
          ? (((totalUpvotes - prevUpvotes) / prevUpvotes) * 100).toFixed(1) +
            "%"
          : "0%";

        setStats({
          totalViews,
          totalUpvotes,
          approvalRate: Number(approvalRate.toFixed(1)),
          engagementRate: Number(engagementRate.toFixed(2)),
          viewsTrend,
          upvotesTrend,
        });

        // Prepare chart data
        const labels =
          filter === "day"
            ? Array.from({ length: 24 }, (_, i) => `${i}:00`)
            : filter === "week"
            ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            : [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];

        const viewsByPeriod = filteredProducts.reduce((acc, p) => {
          const date = new Date(p.createdAt);
          const key =
            filter === "day"
              ? date.getHours()
              : filter === "week"
              ? date.getDay()
              : date.getMonth();
          acc[key] = (acc[key] || 0) + p.views;
          return acc;
        }, {} as Record<number, number>);

        const upvotesByPeriod = filteredProducts.reduce((acc, p) => {
          const date = new Date(p.createdAt);
          const key =
            filter === "day"
              ? date.getHours()
              : filter === "week"
              ? date.getDay()
              : date.getMonth();
          acc[key] = (acc[key] || 0) + p.upvotes.length;
          return acc;
        }, {} as Record<number, number>);

        setViewsData({
          labels,
          datasets: [
            {
              label: "Product Views",
              data: labels.map((_, i) => viewsByPeriod[i] || 0),
              borderColor: "#AF583B",
              tension: 0.4,
            },
          ],
        });

        setUpvotesData({
          labels,
          datasets: [
            {
              label: "Product Upvotes",
              data: labels.map((_, i) => upvotesByPeriod[i] || 0),
              borderColor: "#198E49",
              tension: 0.4,
            },
          ],
        });

        // Top products
        const sortedByViews = [...products]
          .sort((a, b) => b.views - a.views)
          .slice(0, 3);
        const topUpvoted = await getTopUpvotedProducts(filter);

        setTopViewedProducts(
          sortedByViews.map((p, i) => ({
            rank: i + 1,
            name: p.name,
            metric: "Views",
            value: p.views,
            image: p.logo || "https://via.placeholder.com/48", // Fallback image
          }))
        );

        setTopUpvotedProducts(
          topUpvoted.slice(0, 3).map((p, i) => ({
            rank: i + 1,
            name: p.name,
            metric: "Upvotes",
            value: p.upvotes.length,
            image: p.logo || "https://via.placeholder.com/48",
          }))
        );
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [dateFilter, chartPeriod]);

  if (loading) {
    return <div>Loading analytics data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Product Analytics</h2>
        <div className="flex space-x-4">
          <select
            value={dateFilter}
            onChange={(e) => {
              /* Handled via prop change */
            }}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={TrendingUp}
          title="Total Views"
          value={stats.totalViews}
          trend={stats.viewsTrend}
          isPositive={stats.viewsTrend.startsWith("+")}
        />
        <StatCard
          icon={Star}
          title="Total Upvotes"
          value={stats.totalUpvotes}
          trend={stats.upvotesTrend}
          isPositive={stats.upvotesTrend.startsWith("+")}
        />
        <StatCard
          icon={Flag}
          title="Approval Rate"
          value={stats.approvalRate}
          trend="+15.3%" // Static for now; calculate if needed
          isPositive={true}
        />
        <StatCard
          icon={TrendingUp}
          title="Engagement Rate"
          value={stats.engagementRate}
          trend="-2.4%" // Static for now; calculate if needed
          isPositive={false}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1F1F1F]">
              Product Views
            </h3>
            <select
              className="border border-gray-200 rounded-lg px-3 py-1 text-sm"
              value={chartPeriod}
              onChange={(e) =>
                setChartPeriod(e.target.value as "day" | "week" | "month")
              }
            >
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
            </select>
          </div>
          <div className="h-80">
            {viewsData && <Line data={viewsData} options={chartOptions} />}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1F1F1F]">
              Product Upvotes
            </h3>
            <select
              className="border border-gray-200 rounded-lg px-3 py-1 text-sm"
              value={chartPeriod}
              onChange={(e) =>
                setChartPeriod(e.target.value as "day" | "week" | "month")
              }
            >
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
            </select>
          </div>
          <div className="h-80">
            {upvotesData && <Line data={upvotesData} options={chartOptions} />}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">
            Most Viewed Products
          </h3>
          <div className="space-y-4">
            {topViewedProducts.map((product) => (
              <TopProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">
            Most Upvoted Products
          </h3>
          <div className="space-y-4">
            {topUpvotedProducts.map((product) => (
              <TopProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
