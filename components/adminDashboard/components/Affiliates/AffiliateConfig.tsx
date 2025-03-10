import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface ConfigState {
  selectedPlans: string[];
  rewardType: 'fixed' | 'percentage';
  commissionPercentage: number;
  maxCommissionsPerCustomer: number;
  maxMonthsToPay: number;
  daysBeforeCommissionDue: number;
  payoutThreshold: number;
  cookieDuration: number;
}

export default function AffiliateConfig() {
  const [config, setConfig] = useState<ConfigState>({
    selectedPlans: ['Pro', 'Enterprise'],
    rewardType: 'percentage',
    commissionPercentage: 39,
    maxCommissionsPerCustomer: 12,
    maxMonthsToPay: 12,
    daysBeforeCommissionDue: 30,
    payoutThreshold: 50,
    cookieDuration: 30
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const plans = checkbox.checked 
        ? [...config.selectedPlans, value]
        : config.selectedPlans.filter(plan => plan !== value);
      setConfig({ ...config, selectedPlans: plans });
    } else {
      setConfig({ ...config, [name]: type === 'number' ? Number(value) : value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle configuration update
    console.log('Updated config:', config);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Affiliate Program Configuration</h2>
        <button
          onClick={handleSubmit}
          className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730] transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Eligible Plans */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Eligible Plans</h3>
          <div className="space-y-2">
            {['Basic', 'Pro', 'Enterprise'].map(plan => (
              <label key={plan} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="selectedPlans"
                  value={plan}
                  checked={config.selectedPlans.includes(plan)}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                />
                <span>{plan}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Commission Settings */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Commission Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reward Type
              </label>
              <select
                name="rewardType"
                value={config.rewardType}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              >
                <option value="fixed">Fixed Amount</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commission Percentage
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="commissionPercentage"
                  value={config.commissionPercentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                />
                <span className="absolute right-3 top-2 text-gray-500">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Commissions Per Customer
              </label>
              <input
                type="number"
                name="maxCommissionsPerCustomer"
                value={config.maxCommissionsPerCustomer}
                onChange={handleChange}
                min="1"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Months to Pay
              </label>
              <input
                type="number"
                name="maxMonthsToPay"
                value={config.maxMonthsToPay}
                onChange={handleChange}
                min="1"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              />
            </div>
          </div>
        </div>

        {/* Payout Settings */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Payout Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Days Before Commission Due
              </label>
              <input
                type="number"
                name="daysBeforeCommissionDue"
                value={config.daysBeforeCommissionDue}
                onChange={handleChange}
                min="0"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payout Threshold ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="payoutThreshold"
                  value={config.payoutThreshold}
                  onChange={handleChange}
                  min="0"
                  className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cookie Duration (days)
              </label>
              <input
                type="number"
                name="cookieDuration"
                value={config.cookieDuration}
                onChange={handleChange}
                min="1"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}