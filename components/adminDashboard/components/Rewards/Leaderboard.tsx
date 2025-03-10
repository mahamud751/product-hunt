import React, { useState } from 'react';
import { Search, Filter, Trophy, Star, Crown, Medal, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Line } from 'react-chartjs-2';

interface LeaderboardUser {
  id: string;
  rank: number;
  userName: string;
  email: string;
  avatar: string;
  totalPoints: number;
  pointsThisPeriod: number;
  trend: number;
  achievements: {
    name: string;
    icon: 'trophy' | 'star' | 'crown' | 'medal';
    date: string;
  }[];
  history: {
    date: string;
    points: number;
  }[];
}

const mockLeaderboard: LeaderboardUser[] = [
  {
    id: '1',
    rank: 1,
    userName: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    totalPoints: 15420,
    pointsThisPeriod: 2450,
    trend: 12.5,
    achievements: [
      { name: 'Top Contributor', icon: 'crown', date: '2024-02-15' },
      { name: 'Point Master', icon: 'trophy', date: '2024-02-10' }
    ],
    history: [
      { date: '2024-02-10', points: 12970 },
      { date: '2024-02-11', points: 13200 },
      { date: '2024-02-12', points: 13600 },
      { date: '2024-02-13', points: 14100 },
      { date: '2024-02-14', points: 14800 },
      { date: '2024-02-15', points: 15420 }
    ]
  },
  {
    id: '2',
    rank: 2,
    userName: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    totalPoints: 12350,
    pointsThisPeriod: 1850,
    trend: 8.2,
    achievements: [
      { name: 'Rising Star', icon: 'star', date: '2024-02-14' }
    ],
    history: [
      { date: '2024-02-10', points: 10500 },
      { date: '2024-02-11', points: 10800 },
      { date: '2024-02-12', points: 11200 },
      { date: '2024-02-13', points: 11600 },
      { date: '2024-02-14', points: 12000 },
      { date: '2024-02-15', points: 12350 }
    ]
  },
  {
    id: '3',
    rank: 3,
    userName: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    totalPoints: 9870,
    pointsThisPeriod: 1520,
    trend: 6.8,
    achievements: [
      { name: 'Consistent Contributor', icon: 'medal', date: '2024-02-13' }
    ],
    history: [
      { date: '2024-02-10', points: 8350 },
      { date: '2024-02-11', points: 8700 },
      { date: '2024-02-12', points: 9100 },
      { date: '2024-02-13', points: 9400 },
      { date: '2024-02-14', points: 9650 },
      { date: '2024-02-15', points: 9870 }
    ]
  }
];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      type: 'linear' as const,
    }
  }
};

function AchievementIcon({ type }: { type: 'trophy' | 'star' | 'crown' | 'medal' }) {
  switch (type) {
    case 'trophy':
      return <Trophy className="w-4 h-4 text-yellow-600" />;
    case 'star':
      return <Star className="w-4 h-4 text-blue-600" />;
    case 'crown':
      return <Crown className="w-4 h-4 text-purple-600" />;
    case 'medal':
      return <Medal className="w-4 h-4 text-green-600" />;
    default:
      return null;
  }
}

export default function Leaderboard({ dateFilter }: { dateFilter: string }) {
  const [timeframe, setTimeframe] = useState('7d');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rank' | 'pointsThisPeriod' | 'trend'>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const filteredUsers = mockLeaderboard
    .filter(user => 
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'rank') {
        return sortOrder === 'asc' ? a.rank - b.rank : b.rank - a.rank;
      }
      if (sortBy === 'pointsThisPeriod' || sortBy === 'trend') {
        return sortOrder === 'asc' ? 
          a[sortBy] - b[sortBy] : 
          b[sortBy] - a[sortBy];
      }
      return 0;
    });

  const selectedUser = selectedUserId 
    ? mockLeaderboard.find(user => user.id === selectedUserId)
    : null;

  const getUserChartData = (user: LeaderboardUser) => ({
    labels: user.history.map(h => new Date(h.date).toLocaleDateString()),
    datasets: [
      {
        data: user.history.map(h => h.points),
        borderColor: '#AF583B',
        tension: 0.4,
        fill: false
      }
    ]
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1F1F1F]">Leaderboard</h2>
        <div className="flex space-x-4">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Export Rankings</span>
          </button>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-6">
        {mockLeaderboard.slice(0, 3).map((user) => (
          <div 
            key={user.id}
            className={`bg-white p-6 rounded-lg border border-gray-200 ${
              user.rank === 1 ? 'ring-2 ring-yellow-400' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.userName}
                  className="w-16 h-16 rounded-full"
                />
                {user.rank === 1 && (
                  <Crown className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{user.userName}</h3>
                <p className="text-sm text-gray-500">{user.totalPoints.toLocaleString()} points</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                +{user.pointsThisPeriod} this period
              </div>
              <div className={`flex items-center space-x-1 ${
                user.trend > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {user.trend > 0 ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{Math.abs(user.trend)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select 
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="rank">Sort by Rank</option>
            <option value="pointsThisPeriod">Sort by Period Points</option>
            <option value="trend">Sort by Trend</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rankings Table */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Achievements
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id}
                  className={`hover:bg-gray-50 cursor-pointer ${selectedUserId === user.id ? 'bg-gray-50' : ''}`}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                        user.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                        user.rank === 2 ? 'bg-gray-100 text-gray-800' :
                        user.rank === 3 ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {user.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.userName}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.totalPoints.toLocaleString()} total</div>
                    <div className="text-sm text-gray-500">+{user.pointsThisPeriod} this period</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center space-x-1 ${
                      user.trend > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {user.trend > 0 ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">{Math.abs(user.trend)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {user.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="relative group"
                          title={achievement.name}
                        >
                          <AchievementIcon type={achievement.icon} />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User Details Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {selectedUser ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#1F1F1F]">User Details</h3>
                <Trophy className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-6">
                {/* Points Chart */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Points History</h4>
                  <div className="h-48">
                    <Line 
                      data={getUserChartData(selectedUser)}
                      options={chartOptions}
                    />
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Achievements</h4>
                  <div className="space-y-3">
                    {selectedUser.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        <AchievementIcon type={achievement.icon} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{achievement.name}</p>
                          <p className="text-xs text-gray-500">
                            Earned on {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Total Points</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedUser.totalPoints.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Period Points</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedUser.pointsThisPeriod.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Select a user to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}