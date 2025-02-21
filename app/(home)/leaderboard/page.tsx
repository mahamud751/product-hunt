"use client";
import React, { useState } from "react";
import {
  Trophy,
  Medal,
  Award,
  ChevronUp,
  Search,
  Crown,
  ChevronDown,
} from "lucide-react";
import clsx from "clsx";

type TimeFrame = "weekly" | "monthly" | "allTime";
type User = {
  id: number;
  rank: number;
  username: string;
  points: number;
  avatar: string;
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
};

type TierInfo = {
  name: string;
  icon: typeof Medal;
  color: string;
  pointsRange: string;
  perks: string[];
};

const tiers = {
  bronze: { icon: Medal, color: "text-amber-600" },
  silver: { icon: Medal, color: "text-gray-400" },
  gold: { icon: Crown, color: "text-yellow-400" },
  platinum: { icon: Trophy, color: "text-blue-400" },
  diamond: { icon: Award, color: "text-purple-400" },
};

const tierDetails: TierInfo[] = [
  {
    name: "Bronze",
    icon: Medal,
    color: "text-amber-600",
    pointsRange: "0 - 199 points",
    perks: [
      "Bronze profile badge",
      "Access to basic site features",
      "Eligible for monthly random giveaways (small chance)",
    ],
  },
  {
    name: "Silver",
    icon: Medal,
    color: "text-gray-400",
    pointsRange: "200 - 499 points",
    perks: [
      "Silver badge",
      "5% discount on next product launch fee",
      "5% discount on platform's ad placement",
      "Priority email support",
    ],
  },
  {
    name: "Gold",
    icon: Crown,
    color: "text-yellow-400",
    pointsRange: "500 - 999 points",
    perks: [
      "Gold badge",
      "10% discount on next product launch fee",
      "10% discount on ad placement",
      "1x Skip-the-Queue pass per quarter",
    ],
  },
  {
    name: "Platinum",
    icon: Trophy,
    color: "text-blue-400",
    pointsRange: "1000 - 2499 points",
    perks: [
      "Platinum badge",
      "15% discount on next product launch fee",
      "15% discount on ad placement",
      "2x Skip-the-Queue passes per quarter",
    ],
  },
  {
    name: "Diamond",
    icon: Award,
    color: "text-purple-400",
    pointsRange: "2500+ points",
    perks: [
      "Diamond badge",
      "20% discount on next product launch fee",
      "20% discount on ad placement",
      "3x Skip-the-Queue passes per quarter",
      "Invitation to exclusive beta testing & VIP events",
    ],
  },
];

const mockUsers: User[] = [
  {
    id: 1,
    rank: 1,
    username: "Sarah_Dev",
    points: 2500,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    tier: "diamond",
  },
  {
    id: 2,
    rank: 2,
    username: "Alex_Coder",
    points: 2350,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    tier: "platinum",
  },
  {
    id: 3,
    rank: 3,
    username: "TechNinja",
    points: 2200,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    tier: "platinum",
  },
  {
    id: 4,
    rank: 4,
    username: "CodeMaster",
    points: 1900,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    tier: "gold",
  },
  {
    id: 5,
    rank: 5,
    username: "WebWizard",
    points: 1750,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    tier: "gold",
  },
];

const currentUser = {
  rank: 12,
  username: "YourUsername",
  points: 950,
  pointsToNext: 100,
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
  tier: "silver" as const,
};

const Page = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("weekly");
  const [searchQuery, setSearchQuery] = useState("");
  const [showTierInfo, setShowTierInfo] = useState(false);

  const filteredUsers = mockUsers.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pb-32">
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1F1F1F]">Leaderboards</h1>
          <p className="mt-2 text-gray-600 text-lg">
            The most active community members
          </p>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-4">
            {(["weekly", "monthly", "allTime"] as const).map((frame) => (
              <button
                key={frame}
                onClick={() => setTimeFrame(frame)}
                className={clsx(
                  "px-6 py-2 rounded-lg font-medium transition-colors duration-200",
                  timeFrame === frame ? "tab-active" : "tab-inactive"
                )}
              >
                {frame.charAt(0).toUpperCase() +
                  frame.slice(1).replace("Time", " Time")}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {filteredUsers.map((user) => {
            const TierIcon = tiers[user.tier].icon;
            return (
              <div
                key={user.id}
                className="rank-card bg-[#F5F5F5] p-4 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-lg text-[#1F1F1F] w-8">
                    #{user.rank}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-[#1F1F1F]">
                        {user.username}
                      </span>
                      <TierIcon
                        className={clsx("h-5 w-5", tiers[user.tier].color)}
                      />
                    </div>
                    <span className="text-sm text-gray-600">
                      {user.points} points
                    </span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#AF583B] text-white rounded-lg hover:bg-[#8F4731] transition-colors duration-200">
                  View Profile
                </button>
              </div>
            );
          })}
        </div>

        {/* Tier Benefits Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <button
            onClick={() => setShowTierInfo(!showTierInfo)}
            className="w-full px-6 py-4 flex items-center justify-between text-[#1F1F1F] hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-[#AF583B]" />
              <span className="font-semibold">Tier Levels & Benefits</span>
            </div>
            {showTierInfo ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {showTierInfo && (
            <div className="px-6 pb-6">
              <p className="text-gray-600 mb-6">
                Users accumulate points over their lifetime to move up tier
                levels. Each tier unlocks progressively more valuable perks,
                particularly relevant to product creators who want to launch,
                advertise, or purchase services.
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tierDetails.map((tier) => {
                  const TierIcon = tier.icon;
                  return (
                    <div
                      key={tier.name}
                      className="bg-[#F5F5F5] p-4 rounded-lg space-y-3"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <TierIcon className={clsx("h-5 w-5", tier.color)} />
                        <h3 className="font-semibold text-[#1F1F1F]">
                          {tier.name}
                        </h3>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {tier.pointsRange}
                      </div>
                      <ul className="space-y-2">
                        {tier.perks.map((perk, index) => (
                          <li
                            key={index}
                            className="text-sm flex items-start space-x-2"
                          >
                            <span className="text-[#198E49]">•</span>
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Skip-the-Queue Benefit
                </h4>
                <p className="text-blue-600 text-sm">
                  Lets a product maker launch on a prime slot or front page
                  faster without waiting for the standard review or scheduling.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="bg-[#F5F5F5] p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-bold text-lg text-[#1F1F1F]">
                  #{currentUser.rank}
                </span>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-[#1F1F1F]">
                      {currentUser.username}
                    </span>
                    <Medal
                      className={clsx("h-5 w-5", tiers[currentUser.tier].color)}
                    />
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{currentUser.points} points</span>
                    <ChevronUp className="h-4 w-4 text-[#198E49]" />
                    <span className="text-[#198E49]">
                      {currentUser.pointsToNext} to next rank
                    </span>
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 bg-[#198E49] text-white rounded-lg hover:bg-[#147A3E] transition-colors duration-200 flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Earn More Points</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
