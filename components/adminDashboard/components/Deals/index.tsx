import React, { useState } from 'react';
import DealOverview from './DealOverview';
import DealList from './DealList';
import DealModeration from './DealModeration';
import DealInsights from './DealInsights';

export default function Deals() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateFilter, setDateFilter] = useState('7d');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'draft', label: 'Draft' },
    { id: 'submitted', label: 'Submitted' },
    { id: 'active', label: 'Active' },
    { id: 'expired', label: 'Expired' },
    { id: 'moderation', label: 'Moderation' },
    { id: 'insights', label: 'Insights' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DealOverview dateFilter={dateFilter} onDateFilterChange={setDateFilter} />;
      case 'draft':
      case 'submitted':
      case 'active':
      case 'expired':
        return <DealList status={activeTab} dateFilter={dateFilter} />;
      case 'moderation':
        return <DealModeration dateFilter={dateFilter} />;
      case 'insights':
        return <DealInsights dateFilter={dateFilter} />;
      default:
        return <DealOverview dateFilter={dateFilter} onDateFilterChange={setDateFilter} />;
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