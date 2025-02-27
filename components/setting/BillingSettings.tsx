import React from 'react';
import { CreditCard, Package, Download, AlertCircle, Check } from 'lucide-react';

const plans = [
  {
    name: 'Regular Launch',
    price: 'Free',
    description: 'Free listing with a wait time and limited spots.',
    features: [
      '1+ months of processing time',
      'Unverified launch',
      'Regular Reach',
      'No-follow backlinks',
      'No featured spot',
      'No prominent placement'
    ],
    current: false
  },
  {
    name: 'Pro Launch',
    price: '$25',
    description: 'Get more exposure and flexibility for your launch.',
    features: [
      '24-hour processing time',
      'Verified launch',
      '10x brand visibility',
      'Do-follow link to your website',
      'No prominent placement',
      'Submit to top 50 directories'
    ],
    current: true
  },
  {
    name: 'Featured Launch',
    price: '$150',
    description: 'All Pro Launch + prominent placement.',
    features: [
      '12-hour processing time',
      'Submit to top 50 directories',
      'SEO Audit ($50 Value)',
      '1x Guest Post Included',
      'Featured spot on homepage',
      '30 Days SEO Content Plan'
    ],
    current: false
  }
];

export function BillingSettings() {
  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="bg-[#F5F5F5] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#1F1F1F]">Current Plan: Pro Launch</h3>
            <p className="text-sm text-gray-500 mt-1">Your next billing date is July 1, 2025</p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#198E49] text-white">
            Active
          </span>
        </div>
      </div>

      {/* Available Plans */}
      <div>
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-6 flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Available Plans
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border p-6 ${
                plan.current
                  ? 'border-[#AF583B] bg-[#AF583B]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-[#1F1F1F]">{plan.name}</h4>
                <p className="text-3xl font-bold text-[#1F1F1F] mt-2">{plan.price}</p>
                <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 mr-2 text-[#198E49] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full py-2.5 px-4 rounded-md font-semibold transition-colors ${
                  plan.current
                    ? 'bg-gray-100 text-gray-700 cursor-default'
                    : plan.name === 'Featured Launch'
                    ? 'bg-[#198E49] text-white hover:bg-[#147A3B]'
                    : 'bg-[#AF583B] text-white hover:bg-[#8F4731]'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : plan.price === 'Free' ? 'Get Started' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-6 flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Payment Methods
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
            <div className="flex items-center space-x-4">
              <CreditCard className="w-6 h-6 text-gray-400" />
              <div>
                <p className="font-medium text-[#1F1F1F]">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/25</p>
              </div>
            </div>
            <button className="text-sm text-[#AF583B] hover:text-[#8F4731] font-medium">
              Edit
            </button>
          </div>
          
          <button className="w-full p-4 border-2 border-dashed rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">
            + Add new payment method
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div>
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-6 flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Billing History
        </h3>
        
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { date: 'Jun 1, 2025', amount: '$25.00', status: 'Paid' },
                { date: 'May 1, 2025', amount: '$25.00', status: 'Paid' },
                { date: 'Apr 1, 2025', amount: '$25.00', status: 'Paid' },
              ].map((invoice, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-[#AF583B] hover:text-[#8F4731]">Download</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel Subscription */}
      <div className="pt-6 border-t">
        <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-red-800">Cancel Subscription</h4>
            <p className="mt-1 text-sm text-red-700">
              Canceling your subscription will disable access to premium features at the end of your billing period.
            </p>
            <button className="mt-4 text-sm font-medium text-red-700 hover:text-red-800">
              Cancel subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}