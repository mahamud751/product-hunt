import React, { useState } from 'react';
import { Save, BarChart, Cookie, AlertTriangle } from 'lucide-react';

export default function AnalyticsSettings() {
  const [settings, setSettings] = useState({
    googleAnalytics: {
      enabled: true,
      trackingId: '',
      anonymizeIp: true,
      enhancedLinkAttribution: true
    },
    cookies: {
      necessary: true,
      analytics: true,
      marketing: false,
      preferences: true,
      consentBanner: true,
      consentExpiry: 365,
      privacyPolicy: ''
    },
    customTracking: {
      enabled: false,
      code: ''
    }
  });

  const handleChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving analytics settings:', settings);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Analytics & Cookies</h2>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730] transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Google Analytics */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <BarChart className="w-5 h-5 text-[#AF583B]" />
              <h3 className="text-lg font-semibold text-[#1F1F1F]">Google Analytics</h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.googleAnalytics.enabled}
                onChange={(e) => handleChange('googleAnalytics', 'enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#AF583B]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#AF583B]"></div>
            </label>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tracking ID
              </label>
              <input
                type="text"
                value={settings.googleAnalytics.trackingId}
                onChange={(e) => handleChange('googleAnalytics', 'trackingId', e.target.value)}
                placeholder="UA-XXXXXXXXX-X"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Anonymize IP</h4>
                <p className="text-sm text-gray-500">
                  Anonymize IP addresses before sending to Google
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.googleAnalytics.anonymizeIp}
                  onChange={(e) => handleChange('googleAnalytics', 'anonymizeIp', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#AF583B]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#AF583B]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Enhanced Link Attribution</h4>
                <p className="text-sm text-gray-500">
                  Track which exact link was clicked when multiple links point to the same URL
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.googleAnalytics.enhancedLinkAttribution}
                  onChange={(e) => handleChange('googleAnalytics', 'enhancedLinkAttribution', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#AF583B]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#AF583B]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Cookie Settings */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Cookie className="w-5 h-5 text-[#AF583B]" />
            <h3 className="text-lg font-semibold text-[#1F1F1F]">Cookie Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Necessary Cookies</h4>
                <p className="text-sm text-gray-500">
                  Essential for website functionality
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-not-allowed">
                <input
                  type="checkbox"
                  checked={settings.cookies.necessary}
                  disabled
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#AF583B]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Analytics Cookies</h4>
                <p className="text-sm text-gray-500">
                  Help us understand how visitors interact with the website
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.cookies.analytics}
                  onChange={(e) => handleChange('cookies', 'analytics', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#AF583B]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#AF583B]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Marketing Cookies</h4>
                <p className="text-sm text-gray-500">
                  Used to track visitors across websites for marketing purposes
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.cookies.marketing}
                  onChange={(e) => handleChange('cookies', 'marketing', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#AF583B]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#AF583B]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Preference Cookies</h4>
                <p className="text-sm text-gray-500">
                  Remember user preferences and settings
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.cookies.preferences}
                  onChange={(e) => handleChange('cookies', 'preferences', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#AF583B]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#AF583B]"></div>
              </label>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Cookie Consent Banner</h4>
                  <p className="text-sm text-gray-500">
                    Show cookie consent banner to new visitors
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.cookies.consentBanner}
                    onChange={(e) => handleChange('cookies', 'consentBanner', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#AF583B]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#AF583B]"></div>
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Consent Expiry (days)
                  </label>
                  <input
                    type="number"
                    value={settings.cookies.consentExpiry}
                    onChange={(e) => handleChange('cookies', 'consentExpiry', parseInt(e.target.value))}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Privacy Policy URL
                  </label>
                  <input
                    type="text"
                    value={settings.cookies.privacyPolicy}
                    onChange={(e) => handleChange('cookies', 'privacyPolicy', e.target.value)}
                    placeholder="https://example.com/privacy"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Tracking */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-[#AF583B]" />
              <h3 className="text-lg font-semibold text-[#1F1F1F]">Custom Tracking Code</h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.customTracking.enabled}
                onChange={(e) => handleChange('customTracking', 'enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#AF583B]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#AF583B]"></div>
            </label>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom JavaScript Code
              </label>
              <textarea
                value={settings.customTracking.code}
                onChange={(e) => handleChange('customTracking', 'code', e.target.value)}
                rows={6}
                placeholder="// Add your custom tracking code here"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] font-mono text-sm"
              />
              <p className="mt-2 text-sm text-gray-500">
                Warning: Custom tracking code will be executed on all pages. Use with caution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}