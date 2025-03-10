import React, { useState } from 'react';
import { Save, Plus, Trash2, Clock, Star, Calendar, Gift, AlertTriangle } from 'lucide-react';

interface PointRule {
  id: string;
  action: string;
  points: number;
  description: string;
  userType: 'All' | 'Basic' | 'Premium';
  cooldown: number;
  enabled: boolean;
}

interface SpecialEvent {
  id: string;
  name: string;
  multiplier: number;
  startDate: string;
  endDate: string;
  description: string;
  status: 'Scheduled' | 'Active' | 'Ended';
}

const mockPointRules: PointRule[] = [
  {
    id: '1',
    action: 'Upvote',
    points: 2,
    description: 'Points earned for upvoting a product',
    userType: 'All',
    cooldown: 0,
    enabled: true
  },
  {
    id: '2',
    action: 'Comment',
    points: 5,
    description: 'Points earned for leaving a comment',
    userType: 'All',
    cooldown: 30,
    enabled: true
  },
  {
    id: '3',
    action: 'Product Review',
    points: 20,
    description: 'Points earned for submitting a product review',
    userType: 'All',
    cooldown: 0,
    enabled: true
  },
  {
    id: '4',
    action: 'Referral',
    points: 100,
    description: 'Points earned for referring a new user',
    userType: 'Premium',
    cooldown: 0,
    enabled: true
  }
];

const mockSpecialEvents: SpecialEvent[] = [
  {
    id: '1',
    name: 'Double Points Weekend',
    multiplier: 2,
    startDate: '2024-03-01T00:00:00Z',
    endDate: '2024-03-03T23:59:59Z',
    description: 'Earn double points on all actions during the weekend',
    status: 'Scheduled'
  },
  {
    id: '2',
    name: 'Premium Launch Bonus',
    multiplier: 3,
    startDate: '2024-02-15T00:00:00Z',
    endDate: '2024-02-22T23:59:59Z',
    description: 'Triple points for Premium users during launch week',
    status: 'Active'
  }
];

export default function RewardRules() {
  const [pointRules, setPointRules] = useState<PointRule[]>(mockPointRules);
  const [specialEvents, setSpecialEvents] = useState<SpecialEvent[]>(mockSpecialEvents);
  const [expirationDays, setExpirationDays] = useState(180);
  const [dailyPointLimit, setDailyPointLimit] = useState(1000);
  const [showPreview, setShowPreview] = useState(false);

  const handlePointRuleChange = (id: string, field: keyof PointRule, value: any) => {
    setPointRules(rules =>
      rules.map(rule =>
        rule.id === id ? { ...rule, [field]: value } : rule
      )
    );
  };

  const addPointRule = () => {
    const newRule: PointRule = {
      id: `rule_${Date.now()}`,
      action: 'New Action',
      points: 0,
      description: 'Description',
      userType: 'All',
      cooldown: 0,
      enabled: true
    };
    setPointRules([...pointRules, newRule]);
  };

  const removePointRule = (id: string) => {
    setPointRules(rules => rules.filter(rule => rule.id !== id));
  };

  const addSpecialEvent = () => {
    const newEvent: SpecialEvent = {
      id: `event_${Date.now()}`,
      name: 'New Event',
      multiplier: 2,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Event description',
      status: 'Scheduled'
    };
    setSpecialEvents([...specialEvents, newEvent]);
  };

  const removeSpecialEvent = (id: string) => {
    setSpecialEvents(events => events.filter(event => event.id !== id));
  };

  const handleSaveChanges = () => {
    // Save changes to backend
    console.log('Saving changes:', {
      pointRules,
      specialEvents,
      expirationDays,
      dailyPointLimit
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Reward Rules Configuration</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Preview Impact</span>
          </button>
          <button
            onClick={handleSaveChanges}
            className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730] transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Global Settings */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">Global Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Point Expiration (Days)
            </label>
            <div className="relative">
              <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={expirationDays}
                onChange={(e) => setExpirationDays(parseInt(e.target.value))}
                min="0"
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">Points expire after this many days if unused</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Point Limit
            </label>
            <div className="relative">
              <Star className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={dailyPointLimit}
                onChange={(e) => setDailyPointLimit(parseInt(e.target.value))}
                min="0"
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">Maximum points a user can earn per day</p>
          </div>
        </div>
      </div>

      {/* Point Rules */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#1F1F1F]">Point Rules</h3>
          <button
            onClick={addPointRule}
            className="flex items-center space-x-2 text-sm text-[#AF583B] hover:text-[#8E4730]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Rule</span>
          </button>
        </div>
        <div className="space-y-4">
          {pointRules.map((rule) => (
            <div key={rule.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                  <input
                    type="text"
                    value={rule.action}
                    onChange={(e) => handlePointRuleChange(rule.id, 'action', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                  <input
                    type="number"
                    value={rule.points}
                    onChange={(e) => handlePointRuleChange(rule.id, 'points', parseInt(e.target.value))}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
                  <select
                    value={rule.userType}
                    onChange={(e) => handlePointRuleChange(rule.id, 'userType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                  >
                    <option value="All">All Users</option>
                    <option value="Basic">Basic Users</option>
                    <option value="Premium">Premium Users</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cooldown (sec)</label>
                  <input
                    type="number"
                    value={rule.cooldown}
                    onChange={(e) => handlePointRuleChange(rule.id, 'cooldown', parseInt(e.target.value))}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePointRuleChange(rule.id, 'enabled', !rule.enabled)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    rule.enabled
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {rule.enabled ? 'Enabled' : 'Disabled'}
                </button>
                <button
                  onClick={() => removePointRule(rule.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Events */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#1F1F1F]">Special Events</h3>
          <button
            onClick={addSpecialEvent}
            className="flex items-center space-x-2 text-sm text-[#AF583B] hover:text-[#8E4730]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
        <div className="space-y-4">
          {specialEvents.map((event) => (
            <div key={event.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Gift className="w-5 h-5 text-[#AF583B]" />
                  <input
                    type="text"
                    value={event.name}
                    onChange={(e) => {
                      const updatedEvents = specialEvents.map(ev =>
                        ev.id === event.id ? { ...ev, name: e.target.value } : ev
                      );
                      setSpecialEvents(updatedEvents);
                    }}
                    className="text-lg font-medium text-gray-900 border-none focus:outline-none focus:ring-0"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.status === 'Active' ? 'bg-green-100 text-green-800' :
                    event.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                  <button
                    onClick={() => removeSpecialEvent(event.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Point Multiplier
                  </label>
                  <input
                    type="number"
                    value={event.multiplier}
                    onChange={(e) => {
                      const updatedEvents = specialEvents.map(ev =>
                        ev.id === event.id ? { ...ev, multiplier: parseFloat(e.target.value) } : ev
                      );
                      setSpecialEvents(updatedEvents);
                    }}
                    step="0.1"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={event.description}
                    onChange={(e) => {
                      const updatedEvents = specialEvents.map(ev =>
                        ev.id === event.id ? { ...ev, description: e.target.value } : ev
                      );
                      setSpecialEvents(updatedEvents);
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="datetime-local"
                      value={event.startDate.slice(0, 16)}
                      onChange={(e) => {
                        const updatedEvents = specialEvents.map(ev =>
                          ev.id === event.id ? { ...ev, startDate: new Date(e.target.value).toISOString() } : ev
                        );
                        setSpecialEvents(updatedEvents);
                      }}
                      className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="datetime-local"
                      value={event.endDate.slice(0, 16)}
                      onChange={(e) => {
                        const updatedEvents = specialEvents.map(ev =>
                          ev.id === event.id ? { ...ev, endDate: new Date(e.target.value).toISOString() } : ev
                        );
                        setSpecialEvents(updatedEvents);
                      }}
                      className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Impact */}
      {showPreview && (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Impact Preview</h4>
              <p className="mt-1 text-sm text-yellow-700">
                These changes will affect approximately 1,284 users. The average daily point earning is estimated to
                {' '}{dailyPointLimit > 1000 ? 'increase' : 'decrease'}{' '}
                by {Math.abs(dailyPointLimit - 1000) / 10}%.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}