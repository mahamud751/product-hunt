import React, { useState } from 'react';
import UpvoteOverview from './UpvoteOverview';
import UpvoteList from './UpvoteList';
import UserHistory from './UserHistory';
import FraudDetection from './FraudDetection';
import BadgeManagement from './BadgeManagement';

export default function Upvotes() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateFilter, setDateFilter] = useState('7d');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'list', label: 'Upvote List' },
    { id: 'history', label: 'User History' },
    { id: 'fraud', label: 'Fraud Detection' },
    { id: 'badges', label: 'Badge Management' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <UpvoteOverview dateFilter={dateFilter} onDateFilterChange={setDateFilter} />;
      case 'list':
        return <UpvoteList dateFilter={dateFilter} />;
      case 'history':
        return <UserHistory dateFilter={dateFilter} />;
      case 'fraud':
        return <FraudDetection dateFilter={dateFilter} />;
      case 'badges':
        return <BadgeManagement dateFilter={dateFilter} />;
      default:
        return <UpvoteOverview dateFilter={dateFilter} onDateFilterChange={setDateFilter} />;
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