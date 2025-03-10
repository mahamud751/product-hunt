import React, { useState } from 'react';
import AdOverview from './AdOverview';
import ActiveCampaigns from './ActiveCampaigns';
import ExpiredCampaigns from './ExpiredCampaigns';
import AdInsights from './AdInsights';

export default function AdManagement() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateFilter, setDateFilter] = useState('7d');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'active', label: 'Active Campaigns' },
    { id: 'expired', label: 'Expired Campaigns' },
    { id: 'insights', label: 'Insights' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdOverview dateFilter={dateFilter} onDateFilterChange={setDateFilter} />;
      case 'active':
        return <ActiveCampaigns dateFilter={dateFilter} />;
      case 'expired':
        return <ExpiredCampaigns dateFilter={dateFilter} />;
      case 'insights':
        return <AdInsights dateFilter={dateFilter} />;
      default:
        return <AdOverview dateFilter={dateFilter} onDateFilterChange={setDateFilter} />;
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