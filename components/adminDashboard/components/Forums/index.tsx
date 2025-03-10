import React, { useState } from 'react';
import ForumOverview from './ForumOverview';
import ThreadList from './ThreadList';
import FlaggedContent from './FlaggedContent';
import CategoryManagement from './CategoryManagement';

export default function Forums() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateFilter, setDateFilter] = useState('7d');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'threads', label: 'All Discussions' },
    { id: 'pending', label: 'Pending Approvals' },
    { id: 'flagged', label: 'Flagged Content' },
    { id: 'categories', label: 'Categories' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ForumOverview dateFilter={dateFilter} onDateFilterChange={setDateFilter} />;
      case 'threads':
        return <ThreadList status="all" dateFilter={dateFilter} />;
      case 'pending':
        return <ThreadList status="pending" dateFilter={dateFilter} />;
      case 'flagged':
        return <FlaggedContent dateFilter={dateFilter} />;
      case 'categories':
        return <CategoryManagement dateFilter={dateFilter} />;
      default:
        return <ForumOverview dateFilter={dateFilter} onDateFilterChange={setDateFilter} />;
    }
  };

  return (
    <div className="p-8">
      {/* Sub Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-[#AF583B] text-[#AF583B]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Dynamic Content */}
      {renderContent()}
    </div>
  );
}