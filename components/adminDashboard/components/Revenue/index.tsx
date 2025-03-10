import React, { useState } from 'react';
import RevenueOverview from './RevenueOverview';
import Orders from './Orders';
import Subscriptions from './Subscriptions';
import Transactions from './Transactions';
import PricingPlans from './PricingPlans';
import DiscountManagement from './DiscountManagement';

export default function Revenue() {
  const [activeTab, setActiveTab] = useState('orders');
  const [dateFilter, setDateFilter] = useState('7d');

  const tabs = [
    { id: 'orders', label: 'Orders' },
    { id: 'subscriptions', label: 'Subscriptions' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'pricing', label: 'Pricing Plans' },
    { id: 'discounts', label: 'Discounts' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <Orders dateFilter={dateFilter} />;
      case 'subscriptions':
        return <Subscriptions dateFilter={dateFilter} />;
      case 'transactions':
        return <Transactions dateFilter={dateFilter} />;
      case 'pricing':
        return <PricingPlans />;
      case 'discounts':
        return <DiscountManagement />;
      default:
        return <Orders dateFilter={dateFilter} />;
    }
  };

  return (
    <div className="p-8">
      {/* Revenue Overview Section */}
      <RevenueOverview dateFilter={dateFilter} onDateFilterChange={setDateFilter} />

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