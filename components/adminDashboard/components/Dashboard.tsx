import React from 'react';
import { 
  Users, 
  Package, 
  ThumbsUp, 
  MessageSquare,
  DollarSign,
  TrendingUp,
  UserCheck,
  Rocket,
  Clock,
  XCircle,
  MessageCircle
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Chart data and options
const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [30000, 35000, 32000, 40000, 38000, 42000],
      borderColor: '#AF583B',
      tension: 0.4,
    }
  ]
};

const userGrowthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Users',
      data: [100, 150, 200, 250, 300, 350],
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
    },
    x: {
      type: 'category' as const,
    }
  }
};

// StatCard Component
function StatCard({ icon, title, value, trend, isPositive }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-[#F5F5F5] rounded-lg">
          {icon}
        </div>
        <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">{trend}</span>
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-[#1F1F1F]">{value}</p>
    </div>
  );
}

// ActivityItem Component
function ActivityItem({ avatar, name, action, product, time }) {
  return (
    <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <p className="text-sm text-gray-900">
          <span className="font-medium">{name}</span>
          {' '}{action}{' '}
          <span className="font-medium">{product}</span>
        </p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
      <MessageCircle className="w-5 h-5 text-gray-400 hover:text-[#AF583B] cursor-pointer" />
    </div>
  );
}

// QuickActionButton Component
function QuickActionButton({ icon, label }) {
  return (
    <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-[#F5F5F5] transition-colors">
      <div className="text-[#AF583B] mb-2">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
  );
}

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Dashboard Overview</h2>
        <div className="flex space-x-4">
          <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm">
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Custom Range</option>
          </select>
          <button className="bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730] transition-colors">
            Export Report
          </button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users className="w-6 h-6 text-[#AF583B]" />}
          title="Total Users"
          value="239"
          trend="+12.5%"
          isPositive={true}
        />
        <StatCard
          icon={<UserCheck className="w-6 h-6 text-[#198E49]" />}
          title="Premium Users"
          value="42"
          trend="+8.2%"
          isPositive={true}
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6 text-[#AF583B]" />}
          title="Total Revenue"
          value="$42,045.00"
          trend="-2.4%"
          isPositive={false}
        />
        <StatCard
          icon={<Rocket className="w-6 h-6 text-[#198E49]" />}
          title="Active Products"
          value="31"
          trend="+15.3%"
          isPositive={true}
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-[#AF583B]" />}
          title="Pending Products"
          value="12"
          trend="+4.8%"
          isPositive={true}
        />
        <StatCard
          icon={<XCircle className="w-6 h-6 text-red-500" />}
          title="Rejected Products"
          value="3"
          trend="-1.2%"
          isPositive={false}
        />
        <StatCard
          icon={<ThumbsUp className="w-6 h-6 text-[#198E49]" />}
          title="Total Upvotes"
          value="1,284"
          trend="+18.7%"
          isPositive={true}
        />
        <StatCard
          icon={<MessageSquare className="w-6 h-6 text-[#AF583B]" />}
          title="Reviews"
          value="426"
          trend="+9.3%"
          isPositive={true}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1F1F1F]">Revenue Trends</h3>
            <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm">
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-64">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1F1F1F]">User Growth</h3>
            <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm">
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-64">
            <Line data={userGrowthData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1F1F1F]">Recent Activity</h3>
            <button className="text-[#AF583B] text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            <ActivityItem
              avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              name="John Doe"
              action="submitted a new product"
              product="ProductHunt Clone"
              time="2 minutes ago"
            />
            <ActivityItem
              avatar="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              name="Sarah Smith"
              action="left a review on"
              product="Tech Launch Pro"
              time="15 minutes ago"
            />
            <ActivityItem
              avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              name="Mike Johnson"
              action="upvoted"
              product="StartupKit"
              time="1 hour ago"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <QuickActionButton
              icon={<Package className="w-5 h-5" />}
              label="Add Product"
            />
            <QuickActionButton
              icon={<Users className="w-5 h-5" />}
              label="Add User"
            />
            <QuickActionButton
              icon={<ThumbsUp className="w-5 h-5" />}
              label="Reviews"
            />
            <QuickActionButton
              icon={<MessageSquare className="w-5 h-5" />}
              label="Messages"
            />
          </div>
        </div>
      </div>
    </div>
  );
}