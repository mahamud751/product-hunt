import React, { useState } from 'react';
import AffiliateDashboard from './AffiliateDashboard';
import AffiliateConfig from './AffiliateConfig';
import AffiliatePartners from './AffiliatePartners';
import AffiliatePayouts from './AffiliatePayouts';

export default function Affiliates() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'config', label: 'Program Configuration' },
    { id: 'partners', label: 'Partners' },
    { id: 'payouts', label: 'Payouts' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AffiliateDashboard />;
      case 'config':
        return <AffiliateConfig />;
      case 'partners':
        return <AffiliatePartners />;
      case 'payouts':
        return <AffiliatePayouts />;
      default:
        return <AffiliateDashboard />;
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