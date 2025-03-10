import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Download, Plus, CheckCircle, XCircle, MessageSquare, Flag, Trash2, Pin } from 'lucide-react';

interface Thread {
  id: string;
  title: string;
  content: string;
  category: string;
  status: 'Published' | 'Pending' | 'Locked';
  isPinned: boolean;
  replies: number;
  views: number;
  lastActivity: string;
  author: {
    name: string;
    email: string;
    avatar: string;
    reputation: number;
  };
}

const mockThreads: Thread[] = [
  {
    id: '1',
    title: 'Best practices for launching a SaaS product',
    content: 'Looking for advice on launching a new SaaS product. What are the key things to consider?',
    category: 'Product Launch',
    status: 'Published',
    isPinned: true,
    replies: 45,
    views: 1240,
    lastActivity: '2024-02-15T10:00:00Z',
    author: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://i.pravatar.cc/40?u=1',
      reputation: 856
    }
  },
  {
    id: '2',
    title: 'How to effectively use social media for marketing',
    content: 'Share your experiences and strategies for social media marketing.',
    category: 'Marketing',
    status: 'Pending',
    isPinned: false,
    replies: 38,
    views: 980,
    lastActivity: '2024-02-14T15:30:00Z',
    author: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://i.pravatar.cc/40?u=2',
      reputation: 642
    }
  },
  {
    id: '3',
    title: 'Tips for building a strong developer community',
    content: 'What are the essential elements for fostering an engaged developer community?',
    category: 'Community',
    status: 'Locked',
    isPinned: false,
    replies: 32,
    views: 856,
    lastActivity: '2024-02-13T09:15:00Z',
    author: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: 'https://i.pravatar.cc/40?u=3',
      reputation: 428
    }
  }
];

export default function ThreadList({ status, dateFilter }: { status: string; dateFilter: string }) {
  const [selectedThreads, setSelectedThreads] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'replies' | 'views' | 'lastActivity'>('lastActivity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedThreads(mockThreads.map(thread => thread.id));
    } else {
      setSelectedThreads([]);
    }
  };

  const handleSelectThread = (threadId: string) => {
    if (selectedThreads.includes(threadId)) {
      setSelectedThreads(selectedThreads.filter(id => id !== threadId));
    } else {
      setSelectedThreads([...selectedThreads, threadId]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Locked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredThreads = mockThreads
    .filter(thread => 
      (thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       thread.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
       thread.author.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (categoryFilter === 'All' || thread.category === categoryFilter) &&
      (status === 'all' || thread.status.toLowerCase() === status)
    )
    .sort((a, b) => {
      if (sortBy === 'replies' || sortBy === 'views') {
        return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
      }
      return sortOrder === 'asc' ? 
        a[sortBy].localeCompare(b[sortBy]) : 
        b[sortBy].localeCompare(a[sortBy]);
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1F1F1F]">
          {status === 'all' ? 'All Discussions' : 
           status === 'pending' ? 'Pending Approvals' : 
           'Discussions'}
        </h2>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Export Threads</span>
          </button>
          <button className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730] transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Thread</span>
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
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <select 
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Product Launch">Product Launch</option>
            <option value="Marketing">Marketing</option>
            <option value="Community">Community</option>
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select 
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="replies">Sort by Replies</option>
              <option value="views">Sort by Views</option>
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
      {selectedThreads.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedThreads.length} threads selected
          </span>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200">
              <CheckCircle className="w-4 h-4" />
              <span>Approve</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
              <Pin className="w-4 h-4" />
              <span>Pin</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
              <XCircle className="w-4 h-4" />
              <span>Lock</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}

      {/* Threads Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedThreads.length === mockThreads.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thread
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Engagement
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
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
            {filteredThreads.map((thread) => (
              <tr key={thread.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedThreads.includes(thread.id)}
                    onChange={() => handleSelectThread(thread.id)}
                    className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {thread.isPinned && (
                      <Pin className="w-4 h-4 text-[#AF583B] mr-2" />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{thread.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{thread.content}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {thread.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(thread.status)}`}>
                    {thread.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {thread.replies}
                    </div>
                    <div className="flex items-center">
                      <Flag className="w-4 h-4 mr-1" />
                      {thread.views}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <img className="h-8 w-8 rounded-full" src={thread.author.avatar} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{thread.author.name}</div>
                      <div className="text-sm text-gray-500">Rep: {thread.author.reputation}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(thread.lastActivity).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-900">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}