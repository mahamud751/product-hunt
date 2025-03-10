import React, { useState } from 'react';
import ApplicationSettings from './ApplicationSettings';
import PaymentSettings from './PaymentSettings';
import EmailSettings from './EmailSettings';
import VerificationSettings from './VerificationSettings';
import AnalyticsSettings from './AnalyticsSettings';
import SecuritySettings from './SecuritySettings';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('application');

  const tabs = [
    { id: 'application', label: 'Application' },
    { id: 'payment', label: 'Payment' },
    { id: 'email', label: 'Email' },
    { id: 'verification', label: 'Verification' },
    { id: 'analytics', label: 'Analytics & Cookies' },
    { id: 'security', label: 'Security' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'application':
        return <ApplicationSettings />;
      case 'payment':
        return <PaymentSettings />;
      case 'email':
        return <EmailSettings />;
      case 'verification':
        return <VerificationSettings />;
      case 'analytics':
        return <AnalyticsSettings />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <ApplicationSettings />;
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