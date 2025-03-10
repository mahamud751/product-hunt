import React, { useState } from 'react';
import RewardOverview from './RewardOverview';
import UserRewards from './UserRewards';
import RewardRules from './RewardRules';
import FraudDetection from './FraudDetection';
import RedemptionRequests from './RedemptionRequests';
import Leaderboard from './Leaderboard';

export default function Rewards() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateFilter, setDateFilter] = useState('7d');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'User Rewards' },
    { id: 'rules', label: 'Rules & Config' },
    { id: 'fraud', label: 'Fraud Detection' },
    { id: 'redemption', label: 'Redemption' },
    { id: 'leaderboard', label: 'Leaderboard' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <RewardOverview dateFilter={dateFilter} onDateFilterChange={setDateFilter} />;
      case 'users':
        return <UserRewards dateFilter={dateFilter} />;
      case 'rules':
        return <RewardRules />;
      case 'fraud':
        return <FraudDetection dateFilter={dateFilter} />;
      case 'redemption':
        return <RedemptionRequests dateFilter={dateFilter} />;
      case 'leaderboard':
        return <Leaderboard dateFilter={dateFilter} />;
      default:
        return <RewardOverview dateFilter={dateFilter} onDateFilterChange={setDateFilter} />;
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