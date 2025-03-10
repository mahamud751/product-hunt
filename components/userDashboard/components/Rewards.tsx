import React, { useState } from "react";
import {
  Trophy,
  Gift,
  Users,
  ArrowUp,
  MessageSquare,
  UserPlus,
  Package,
  Clock,
  ChevronDown,
  Search,
  Filter,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Link,
  Copy,
  Bell,
  Star,
  Crown,
  Medal,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import clsx from "clsx";
import Image from "next/image";

type RewardActivity = {
  id: string;
  type: "upvote" | "comment" | "referral" | "product_submit" | "redemption";
  points: number;
  description: string;
  date: string;
};

type Reward = {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  cashValue?: number;
  stock: number;
  image: string;
};

type LeaderboardUser = {
  id: string;
  name: string;
  points: number;
  rank: number;
  avatar: string;
  isFollowing?: boolean;
};

const MOCK_ACTIVITIES: RewardActivity[] = [
  {
    id: "1",
    type: "upvote",
    points: 2,
    description: "Upvoted ProductX",
    date: "2024-03-15T10:30:00Z",
  },
  {
    id: "2",
    type: "comment",
    points: 3,
    description: "Commented on LaunchPro",
    date: "2024-03-15T09:15:00Z",
  },
  {
    id: "3",
    type: "referral",
    points: 100,
    description: "Referred Sarah Johnson",
    date: "2024-03-14T14:20:00Z",
  },
];

const MOCK_REWARDS: Reward[] = [
  {
    id: "1",
    name: "$10 Amazon Gift Card",
    description: "Digital gift card delivered instantly",
    pointsCost: 1000,
    cashValue: 10,
    stock: 50,
    image:
      "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: "2",
    name: "Premium Membership (1 Month)",
    description: "Access exclusive features and benefits",
    pointsCost: 2000,
    cashValue: 20,
    stock: 100,
    image:
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: "3",
    name: "Featured Product Placement",
    description: "24-hour spotlight feature for your product",
    pointsCost: 5000,
    stock: 5,
    image:
      "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=300&h=200",
  },
];

const MOCK_LEADERBOARD: LeaderboardUser[] = [
  {
    id: "1",
    name: "John Smith",
    points: 12500,
    rank: 1,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    points: 10800,
    rank: 2,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
    isFollowing: true,
  },
  {
    id: "3",
    name: "Michael Chen",
    points: 9500,
    rank: 3,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
  },
];

const POINTS_HISTORY = [
  { date: "2024-03-01", points: 120, redeemed: 0 },
  { date: "2024-03-02", points: 80, redeemed: 50 },
  { date: "2024-03-03", points: 200, redeemed: 0 },
  { date: "2024-03-04", points: 160, redeemed: 100 },
  { date: "2024-03-05", points: 240, redeemed: 0 },
  { date: "2024-03-06", points: 100, redeemed: 0 },
  { date: "2024-03-07", points: 180, redeemed: 200 },
];

const MetricCard = ({
  title,
  value,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: { value: string; positive: boolean };
}) => (
  <div className="card">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-600 mb-1">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        {trend && (
          <p
            className={clsx(
              "text-sm mt-1",
              trend.positive ? "text-green-600" : "text-red-600"
            )}
          >
            {trend.value}
          </p>
        )}
      </div>
      <Icon className="w-6 h-6 text-gray-400" />
    </div>
  </div>
);

const RedeemModal = ({
  isOpen,
  onClose,
  reward,
}: {
  isOpen: boolean;
  onClose: () => void;
  reward: Reward;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Redeem Reward</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <AlertCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-32 h-24 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={reward.image}
                alt={reward.name}
                className="w-full h-full object-cover"
                loading="lazy"
                height={100}
                width={150}
              />
            </div>
            <div>
              <h3 className="font-medium">{reward.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
              <p className="text-[#AF583B] font-medium">
                {reward.pointsCost} Points
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Your Balance</span>
              <span className="font-medium">2,500 Points</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reward Cost</span>
              <span className="font-medium">-{reward.pointsCost} Points</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between">
              <span className="text-gray-600">Remaining Balance</span>
              <span className="font-medium">
                {2500 - reward.pointsCost} Points
              </span>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="btn-primary">Confirm Redemption</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("week");

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          title="Total Points"
          value="2,500"
          icon={Trophy}
          trend={{ value: "+350 points this month", positive: true }}
        />
        <MetricCard
          title="Available Points"
          value="1,800"
          icon={Gift}
          trend={{ value: "-200 points from redemptions", positive: false }}
        />
        <MetricCard
          title="Referral Points"
          value="700"
          icon={Users}
          trend={{ value: "+100 from last referral", positive: true }}
        />
        <MetricCard
          title="Current Rank"
          value="#42"
          icon={Crown}
          trend={{ value: "Top 5% of users", positive: true }}
        />
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Points History</h2>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={POINTS_HISTORY}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="points"
                fill="#AF583B"
                name="Points Earned"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="redeemed"
                fill="#198E49"
                name="Points Redeemed"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const Activities = () => {
  const pointsGuide = [
    { action: "Upvote a product", points: 2, icon: ArrowUp },
    { action: "Write a comment", points: 3, icon: MessageSquare },
    { action: "Refer a friend", points: 100, icon: UserPlus },
    { action: "Submit a new product", points: 500, icon: Package },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-lg font-semibold mb-6">How to Earn Points</h2>
          <div className="space-y-4">
            {pointsGuide.map((item) => (
              <div
                key={item.action}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#AF583B] bg-opacity-10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#AF583B]" />
                  </div>
                  <span>{item.action}</span>
                </div>
                <span className="font-medium text-[#AF583B]">
                  +{item.points} Points
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {MOCK_ACTIVITIES.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full bg-[#AF583B] bg-opacity-10 flex items-center justify-center">
                  {activity.type === "upvote" && (
                    <ArrowUp className="w-5 h-5 text-[#AF583B]" />
                  )}
                  {activity.type === "comment" && (
                    <MessageSquare className="w-5 h-5 text-[#AF583B]" />
                  )}
                  {activity.type === "referral" && (
                    <UserPlus className="w-5 h-5 text-[#AF583B]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{activity.description}</p>
                    <span className="text-[#AF583B] font-medium">
                      +{activity.points} Points
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(activity.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Rewards = () => {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"cost" | "popularity" | "newest">(
    "cost"
  );

  const filteredRewards = MOCK_REWARDS.filter(
    (reward) =>
      searchTerm === "" ||
      reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search rewards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "cost" | "popularity" | "newest")
          }
          className="border border-gray-200 rounded-lg px-4 py-2"
        >
          <option value="cost">Sort by Cost</option>
          <option value="popularity">Sort by Popularity</option>
          <option value="newest">Sort by Newest</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredRewards.map((reward) => (
          <div key={reward.id} className="card">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Image
                src={reward.image}
                alt={reward.name}
                className="w-full h-full object-cover"
                height={200}
                width={300}
              />
            </div>
            <h3 className="font-medium mb-2">{reward.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-[#AF583B] font-medium">
                {reward.pointsCost} Points
              </span>
              <button
                onClick={() => {
                  setSelectedReward(reward);
                  setIsRedeemModalOpen(true);
                }}
                className="btn-primary"
              >
                Redeem Now
              </button>
            </div>
            {reward.stock < 10 && (
              <p className="text-sm text-red-600 mt-2">
                Only {reward.stock} left in stock!
              </p>
            )}
          </div>
        ))}
      </div>

      {selectedReward && (
        <RedeemModal
          isOpen={isRedeemModalOpen}
          onClose={() => {
            setIsRedeemModalOpen(false);
            setSelectedReward(null);
          }}
          reward={selectedReward}
        />
      )}
    </div>
  );
};

const Leaderboard = () => {
  const [timeRange, setTimeRange] = useState<"7days" | "30days" | "allTime">(
    "7days"
  );
  const [showFollowing, setShowFollowing] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <select
          value={timeRange}
          onChange={(e) =>
            setTimeRange(e.target.value as "7days" | "30days" | "allTime")
          }
          className="border border-gray-200 rounded-lg px-4 py-2"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="allTime">All Time</option>
        </select>
        <button
          onClick={() => setShowFollowing(!showFollowing)}
          className={clsx(
            "px-4 py-2 rounded-lg border transition-all",
            showFollowing
              ? "border-[#AF583B] bg-[#AF583B]/5 text-[#AF583B]"
              : "border-gray-200 hover:border-gray-300"
          )}
        >
          Following Only
        </button>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-6">Top Point Earners</h2>
        <div className="space-y-4">
          {MOCK_LEADERBOARD.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 relative">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                    height={48}
                    width={48}
                  />
                  {index < 3 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-white">
                      {index === 0 && <Crown className="w-4 h-4" />}
                      {index === 1 && <Medal className="w-4 h-4" />}
                      {index === 2 && <Star className="w-4 h-4" />}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{user.name}</span>
                    {user.isFollowing && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        Following
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {user.points.toLocaleString()} Points
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#AF583B]">
                  #{user.rank}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function RewardsTab() {
  const [activeSection, setActiveSection] = useState<
    "dashboard" | "activities" | "rewards" | "leaderboard"
  >("dashboard");

  const sections = [
    { id: "dashboard" as const, label: "Dashboard" },
    { id: "activities" as const, label: "Activities" },
    { id: "rewards" as const, label: "Rewards" },
    { id: "leaderboard" as const, label: "Leaderboard" },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Rewards</h1>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-100">
            <div className="flex gap-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={clsx(
                    "px-4 py-2 -mb-px font-medium",
                    activeSection === section.id
                      ? "text-[#AF583B] border-b-2 border-[#AF583B]"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {activeSection === "dashboard" && <Dashboard />}
        {activeSection === "activities" && <Activities />}
        {activeSection === "rewards" && <Rewards />}
        {activeSection === "leaderboard" && <Leaderboard />}
      </div>
    </div>
  );
}
