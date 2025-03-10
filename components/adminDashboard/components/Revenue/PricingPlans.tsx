import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit3, Clock, Star, DollarSign, Check } from 'lucide-react';

interface PricingFeature {
  id: string;
  name: string;
  includedIn: ('free' | 'pro' | 'featured')[];
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  processingTime: string;
  features: string[];
  isPopular?: boolean;
}

const defaultPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Regular Launch',
    price: 0,
    processingTime: '1+ months of processing time',
    features: [
      'Unverified launch',
      'Regular Reach',
      'No-follow backlinks',
      'No featured spot',
      'No prominent placement'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Launch',
    price: 25,
    processingTime: '24-hour processing time',
    features: [
      'Verified launch',
      '10x brand visibility',
      'Do-follow link to your website',
      'No featured spot',
      'No prominent placement'
    ],
    isPopular: true
  },
  {
    id: 'featured',
    name: 'Featured Launch',
    price: 150,
    processingTime: '12-hour processing time',
    features: [
      'Submit to top 50 directories',
      'SEO Audit ($50 Value)',
      '1x Guest Post Included',
      'Featured spot on homepage',
      '30 Days SEO Content Plan',
      'All prominent placement'
    ]
  }
];

export default function PricingPlans() {
  const [plans, setPlans] = useState<PricingPlan[]>(defaultPlans);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [showAddFeature, setShowAddFeature] = useState(false);
  const [newFeature, setNewFeature] = useState('');

  const handleSave = () => {
    console.log('Saving pricing plans:', plans);
  };

  const handleEditPlan = (plan: PricingPlan) => {
    setEditingPlan({ ...plan });
  };

  const handleUpdatePlan = () => {
    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
      setEditingPlan(null);
    }
  };

  const handleAddFeature = () => {
    if (editingPlan && newFeature.trim()) {
      setEditingPlan({
        ...editingPlan,
        features: [...editingPlan.features, newFeature.trim()]
      });
      setNewFeature('');
      setShowAddFeature(false);
    }
  };

  const handleRemoveFeature = (index: number) => {
    if (editingPlan) {
      setEditingPlan({
        ...editingPlan,
        features: editingPlan.features.filter((_, i) => i !== index)
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Pricing Plans</h2>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730] transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-lg border ${
              plan.isPopular ? 'border-[#AF583B] ring-2 ring-[#AF583B]' : 'border-gray-200'
            } overflow-hidden`}
          >
            {plan.isPopular && (
              <div className="bg-[#AF583B] text-white text-center py-1 text-sm font-medium">
                Most Popular
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                    {plan.price > 0 && (
                      <span className="ml-1 text-gray-500">/launch</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleEditPlan(plan)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-6">
                <Clock className="w-4 h-4 mr-2" />
                {plan.processingTime}
              </div>

              <ul className="space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-[#AF583B] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Plan Modal */}
      {editingPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Edit Plan</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <div className="relative">
                  <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="number"
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                    min="0"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Processing Time
                </label>
                <input
                  type="text"
                  value={editingPlan.processingTime}
                  onChange={(e) => setEditingPlan({ ...editingPlan, processingTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Features
                  </label>
                  <button
                    onClick={() => setShowAddFeature(true)}
                    className="text-[#AF583B] hover:text-[#8E4730] text-sm flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Feature</span>
                  </button>
                </div>
                <ul className="space-y-2">
                  {editingPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                      <span className="text-sm text-gray-700">{feature}</span>
                      <button
                        onClick={() => handleRemoveFeature(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                {showAddFeature && (
                  <div className="mt-2 flex items-center space-x-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Enter new feature"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                    />
                    <button
                      onClick={handleAddFeature}
                      className="bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730]"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isPopular"
                  checked={editingPlan.isPopular || false}
                  onChange={(e) => setEditingPlan({ ...editingPlan, isPopular: e.target.checked })}
                  className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                />
                <label htmlFor="isPopular" className="text-sm text-gray-700">
                  Mark as most popular plan
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setEditingPlan(null)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePlan}
                className="bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}