import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Plus, Edit3, Trash2, Upload, Download, ExternalLink } from 'lucide-react';
import CreateAlternativeModal from './CreateAlternativeModal';

interface Alternative {
  id: string;
  name: string;
  description: string;
  slug: string;
  mainProduct: {
    id: string;
    name: string;
  };
  engagement: {
    clicks: number;
    upvotes: number;
    reports: number;
  };
  createdAt: string;
  updatedAt: string;
}

const mockAlternatives: Alternative[] = [
  {
    id: '1',
    name: 'DesignPro',
    description: 'A professional design tool alternative',
    slug: 'designpro',
    mainProduct: {
      id: 'prod_1',
      name: 'Figma'
    },
    engagement: {
      clicks: 1240,
      upvotes: 156,
      reports: 2
    },
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'CodeFlow',
    description: 'Alternative code editor with advanced features',
    slug: 'codeflow',
    mainProduct: {
      id: 'prod_2',
      name: 'VS Code'
    },
    engagement: {
      clicks: 980,
      upvotes: 98,
      reports: 1
    },
    createdAt: '2024-02-14T15:30:00Z',
    updatedAt: '2024-02-14T15:30:00Z'
  },
  {
    id: '3',
    name: 'MarketPro',
    description: 'Marketing automation alternative',
    slug: 'marketpro',
    mainProduct: {
      id: 'prod_3',
      name: 'HubSpot'
    },
    engagement: {
      clicks: 756,
      upvotes: 45,
      reports: 0
    },
    createdAt: '2024-02-13T09:15:00Z',
    updatedAt: '2024-02-13T09:15:00Z'
  }
];

export default function AlternativesManagement({ dateFilter }: { dateFilter: string }) {
  const [selectedAlternatives, setSelectedAlternatives] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'clicks' | 'upvotes'>('clicks');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Alternative>>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedAlternatives(mockAlternatives.map(alt => alt.id));
    } else {
      setSelectedAlternatives([]);
    }
  };

  const handleSelectAlternative = (altId: string) => {
    if (selectedAlternatives.includes(altId)) {
      setSelectedAlternatives(selectedAlternatives.filter(id => id !== altId));
    } else {
      setSelectedAlternatives([...selectedAlternatives, altId]);
    }
  };

  const handleEdit = (alternative: Alternative) => {
    setIsEditing(alternative.id);
    setEditForm(alternative);
  };

  const handleSave = () => {
    // Save changes to backend
    setIsEditing(null);
    setEditForm({});
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleCreateAlternative = (alternative: {
    name: string;
    description: string;
    slug: string;
    mainProduct: {
      id: string;
      name: string;
    };
  }) => {
    // Here you would normally make an API call to create the alternative
    console.log('Creating alternative:', alternative);
  };

  const filteredAlternatives = mockAlternatives
    .filter(alt => 
      alt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alt.mainProduct.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'clicks' || sortBy === 'upvotes') {
        const aValue = a.engagement[sortBy];
        const bValue = b.engagement[sortBy];
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      const compareValue = (val1: string, val2: string) => {
        return sortOrder === 'asc' ? val1.localeCompare(val2) : val2.localeCompare(val1);
      };
      return compareValue(a[sortBy], b[sortBy]);
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1F1F1F]">Alternatives Management</h2>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Upload className="w-4 h-4" />
            <span>Import CSV</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Alternative</span>
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
              placeholder="Search alternatives..."
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
            <option value="name">Sort by Name</option>
            <option value="clicks">Sort by Clicks</option>
            <option value="upvotes">Sort by Upvotes</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedAlternatives.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedAlternatives.length} alternatives selected
          </span>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}

      {/* Alternatives Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedAlternatives.length === mockAlternatives.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alternative
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Main Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Engagement
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAlternatives.map((alternative) => (
              <tr key={alternative.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedAlternatives.includes(alternative.id)}
                    onChange={() => handleSelectAlternative(alternative.id)}
                    className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                  />
                </td>
                <td className="px-6 py-4">
                  {isEditing === alternative.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                      />
                      <textarea
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                        rows={2}
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm font-medium text-gray-900">{alternative.name}</div>
                      <div className="text-sm text-gray-500">{alternative.description}</div>
                      <div className="text-xs text-gray-400 mt-1">/{alternative.slug}</div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900">{alternative.mainProduct.name}</span>
                    <ExternalLink className="w-4 h-4 ml-2 text-gray-400" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-20">Clicks:</span>
                      <span className="font-medium text-gray-900">{alternative.engagement.clicks}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-20">Upvotes:</span>
                      <span className="font-medium text-gray-900">{alternative.engagement.upvotes}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-20">Reports:</span>
                      <span className="font-medium text-gray-900">{alternative.engagement.reports}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(alternative.updatedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(alternative)}
                      className="text-[#AF583B] hover:text-[#8E4730]"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-900">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateAlternativeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateAlternative}
      />
    </div>
  );
}