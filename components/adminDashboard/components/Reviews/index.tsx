import React, { useState } from 'react';
import ReviewOverview from './ReviewOverview';
import ReviewList from './ReviewList';
import FlaggedReviews from './FlaggedReviews';
import ReviewAnalytics from './ReviewAnalytics';

export default function Reviews() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateFilter, setDateFilter] = useState('7d');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'list', label: 'Review List' },
    { id: 'flagged', label: 'Flagged Reviews' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ReviewOverview dateFilter={dateFilter} onDateFilterChange={setDateFilter} />;
      case 'list':
        return <ReviewList dateFilter={dateFilter} />;
      case 'flagged':
        return <FlaggedReviews dateFilter={dateFilter} />;
      case 'analytics':
        return <ReviewAnalytics dateFilter={dateFilter} />;
      default:
        return <ReviewOverview dateFilter={dateFilter} onDateFilterChange={setDateFilter} />;
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