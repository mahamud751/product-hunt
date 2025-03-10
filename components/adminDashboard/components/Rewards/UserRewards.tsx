import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Plus, Minus, Download, Award, History } from 'lucide-react';

interface UserReward {
  id: string;
  userId: string;
  userName: string;
  email: string;
  totalPoints: number;
  availablePoints: number;
  lastActivity: string;
  activityLog: {
    action: 'earned' | 'redeemed' | 'expired' | 'adjusted';
    points: number;
    source: string;
    timestamp: string;
  }[];
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

const mockUserRewards: UserReward[] = [
  {
    id: '1',
    userId: 'user_1',
    userName: 'John Doe',
    email: 'john@example.com',
    totalPoints: 15420,
    availablePoints: 12350,
    lastActivity: '2024-02-15T10:00:00Z',
    tier: 'Gold',
    activityLog: [
      {
        action: 'earned',
        points: 50,
        source: 'Product Review',
        timestamp: '2024-02-15T10:00:00Z'
      },
      {
        action: 'redeemed',
        points: -500,
        source: 'Gift Card Redemption',
        timestamp: '2024-02-14T15:30:00Z'
      }
    ]
  },
  {
    id: '2',
    userId: 'user_2',
    userName: 'Jane Smith',
    email: 'jane@example.com',
    totalPoints: 8750,
    availablePoints: 7200,
    lastActivity: '2024-02-14T15:30:00Z',
    tier: 'Silver',
    activityLog: [
      {
        action: 'earned',
        points: 100,
        source: 'Referral Bonus',
        timestamp: '2024-02-14T15:30:00Z'
      }
    ]
  },
  {
    id: '3',
    userId: 'user_3',
    userName: 'Mike Johnson',
    email: 'mike@example.com',
    totalPoints: 3200,
    availablePoints: 3200,
    lastActivity: '2024-02-13T09:15:00Z',
    tier: 'Bronze',
    activityLog: [
      {
        action: 'earned',
        points: 25,
        source: 'Daily Login',
        timestamp: '2024-02-13T09:15:00Z'
      }
    ]
  }
];

export default function UserRewards({ dateFilter }: { dateFilter: string }) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'userName' | 'totalPoints' | 'lastActivity'>('totalPoints');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUsers(mockUserRewards.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'bg-purple-100 text-purple-800';
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Silver':
        return 'bg-gray-100 text-gray-800';
      case 'Bronze':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'earned':
        return 'text-green-600';
      case 'redeemed':
        return 'text-red-600';
      case 'expired':
        return 'text-orange-600';
      case 'adjusted':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredUsers = mockUserRewards
    .filter(user => 
      (user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
       user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (tierFilter === 'All' || user.tier === tierFilter)
    )
    .sort((a, b) => {
      if (sortBy === 'totalPoints') {
        return sortOrder === 'asc' ? a.totalPoints - b.totalPoints : b.totalPoints - a.totalPoints;
      }
      const compareValue = (val1: string, val2: string) => {
        return sortOrder === 'asc' ? val1.localeCompare(val2) : val2.localeCompare(val1);
      };
      return compareValue(a[sortBy], b[sortBy]);
    });

  const selectedUserDetails = selectedUserId 
    ? mockUserRewards.find(user => user.id === selectedUserId)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1F1F1F]">User Rewards</h2>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
          <button className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730] transition-colors">
            <Award className="w-4 h-4" />
            <span>Bulk Award</span>
          </button>
        </div>
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
        
        <div className="flex items-center space-x-4">
          <select 
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
          >
            <option value="All">All Tiers</option>
            <option value="Platinum">Platinum</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select 
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="userName">Sort by Name</option>
              <option value="totalPoints">Sort by Points</option>
              <option value="lastActivity">Sort by Activity</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedUsers.length} users selected
          </span>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200">
              <Plus className="w-4 h-4" />
              <span>Add Points</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
              <Minus className="w-4 h-4" />
              <span>Deduct Points</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users Table */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === mockUserRewards.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tier
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
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
                  <td className="px-6 py-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://i.pravatar.cc/40?u=${user.userId}`}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.userName}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.totalPoints.toLocaleString()} total</div>
                    <div className="text-sm text-gray-500">{user.availablePoints.toLocaleString()} available</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTierColor(user.tier)}`}>
                      {user.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastActivity).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-900" onClick={e => e.stopPropagation()}>
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity Log Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {selectedUserDetails ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#1F1F1F]">Activity Log</h3>
                <History className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {selectedUserDetails.activityLog.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`mt-1 ${getActionColor(activity.action)}`}>
                      {activity.action === 'earned' ? <Plus className="w-4 h-4" /> : 
                       activity.action === 'redeemed' ? <Minus className="w-4 h-4" /> :
                       <History className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action === 'earned' ? 'Earned' :
                           activity.action === 'redeemed' ? 'Redeemed' :
                           activity.action === 'expired' ? 'Expired' : 'Adjusted'}
                        </p>
                        <span className={`text-sm font-medium ${getActionColor(activity.action)}`}>
                          {activity.points > 0 ? '+' : ''}{activity.points}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{activity.source}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Select a user to view their activity log
            </div>
          )}
        </div>
      </div>
    </div>
  );
}