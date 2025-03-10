import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Save, Globe, FileText } from 'lucide-react';

interface SEOData {
  id: string;
  type: 'product' | 'category' | 'alternative';
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  schemaMarkup: string;
  lastUpdated: string;
}

const mockSEOData: SEOData[] = [
  {
    id: '1',
    type: 'product',
    name: 'TechLaunch Pro',
    slug: 'techlaunch-pro',
    metaTitle: 'TechLaunch Pro | Launch Your Product with Confidence',
    metaDescription: 'TechLaunch Pro helps you launch your tech product successfully with comprehensive tools and analytics.',
    schemaMarkup: '{"@type": "Product", "name": "TechLaunch Pro"}',
    lastUpdated: '2024-02-15T10:00:00Z'
  },
  {
    id: '2',
    type: 'category',
    name: 'Development Tools',
    slug: 'development-tools',
    metaTitle: 'Best Development Tools | LaunchPad',
    metaDescription: 'Discover the best development tools for your next project. Compare features, pricing, and user reviews.',
    schemaMarkup: '{"@type": "ItemList", "name": "Development Tools"}',
    lastUpdated: '2024-02-14T15:30:00Z'
  },
  {
    id: '3',
    type: 'alternative',
    name: 'DesignPro',
    slug: 'designpro',
    metaTitle: 'DesignPro - Alternative to Figma | LaunchPad',
    metaDescription: 'Looking for a Figma alternative? Try DesignPro, the professional design tool with advanced features.',
    schemaMarkup: '{"@type": "Product", "name": "DesignPro"}',
    lastUpdated: '2024-02-13T09:15:00Z'
  }
];

export default function SEOManagement({ dateFilter }: { dateFilter: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'lastUpdated'>('lastUpdated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<SEOData>>({});

  const handleEdit = (data: SEOData) => {
    setIsEditing(data.id);
    setEditForm(data);
  };

  const handleSave = () => {
    // Save changes to backend
    setIsEditing(null);
    setEditForm({});
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product':
        return 'bg-blue-100 text-blue-800';
      case 'category':
        return 'bg-green-100 text-green-800';
      case 'alternative':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = mockSEOData
    .filter(data => 
      (data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       data.metaTitle.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (typeFilter === 'All' || data.type === typeFilter)
    )
    .sort((a, b) => {
      const compareValue = (val1: string, val2: string) => {
        return sortOrder === 'asc' ? val1.localeCompare(val2) : val2.localeCompare(val1);
      };
      return compareValue(a[sortBy], b[sortBy]);
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1F1F1F]">SEO & Metadata Management</h2>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or meta title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <select 
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="product">Products</option>
            <option value="category">Categories</option>
            <option value="alternative">Alternatives</option>
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select 
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="name">Sort by Name</option>
              <option value="type">Sort by Type</option>
              <option value="lastUpdated">Sort by Updated</option>
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

      {/* SEO Data Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Meta Title & Description
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
            {filteredData.map((data) => (
              <tr key={data.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  {isEditing === data.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                      />
                      <div className="flex items-center text-sm text-gray-500">
                        <Globe className="w-4 h-4 mr-1" />
                        <input
                          type="text"
                          value={editForm.slug || ''}
                          onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                          className="flex-1 px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm font-medium text-gray-900">{data.name}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Globe className="w-4 h-4 mr-1" />
                        /{data.slug}
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(data.type)}`}>
                    {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {isEditing === data.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editForm.metaTitle || ''}
                        onChange={(e) => setEditForm({ ...editForm, metaTitle: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                        placeholder="Meta Title"
                      />
                      <textarea
                        value={editForm.metaDescription || ''}
                        onChange={(e) => setEditForm({ ...editForm, metaDescription: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                        rows={2}
                        placeholder="Meta Description"
                      />
                      <div className="flex items-center text-sm text-gray-500">
                        <FileText className="w-4 h-4 mr-1" />
                        <textarea
                          value={editForm.schemaMarkup || ''}
                          onChange={(e) => setEditForm({ ...editForm, schemaMarkup: e.target.value })}
                          className="flex-1 px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                          rows={2}
                          placeholder="Schema Markup"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm font-medium text-gray-900">{data.metaTitle}</div>
                      <div className="text-sm text-gray-500">{data.metaDescription}</div>
                      <div className="flex items-center text-sm text-gray-400 mt-1">
                        <FileText className="w-4 h-4 mr-1" />
                        Schema Markup
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(data.lastUpdated).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {isEditing === data.id ? (
                      <button
                        onClick={handleSave}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(data)}
                          className="text-[#AF583B] hover:text-[#8E4730]"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}