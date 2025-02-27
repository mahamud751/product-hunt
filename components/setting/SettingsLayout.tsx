import React from "react";
import { Settings, Bell, CreditCard, User, Lock } from "lucide-react";

type Tab = {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
};

const tabs: Tab[] = [
  {
    id: "profile",
    label: "Profile Settings",
    icon: <User className="w-5 h-5" />,
    description: "Manage your personal information and preferences",
  },
  {
    id: "security",
    label: "Security",
    icon: <Lock className="w-5 h-5" />,
    description: "Update password and security settings",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell className="w-5 h-5" />,
    description: "Configure how you receive updates",
  },
  {
    id: "billing",
    label: "Plans & Billing",
    icon: <CreditCard className="w-5 h-5" />,
    description: "Manage your subscription and payments",
  },
];

interface SettingsLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

export function SettingsLayout({
  activeTab,
  setActiveTab,
  children,
}: SettingsLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-[#1F1F1F] text-3xl font-bold mb-8">
          Settings & Account
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-start p-3 rounded-lg text-left transition-colors
                    ${
                      activeTab === tab.id
                        ? "bg-[#AF583B]/10 text-[#AF583B]"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  <div className="flex-shrink-0 mt-1">{tab.icon}</div>
                  <div className="ml-3">
                    <p
                      className={`font-semibold ${
                        activeTab === tab.id
                          ? "text-[#AF583B]"
                          : "text-[#1F1F1F]"
                      }`}
                    >
                      {tab.label}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {tab.description}
                    </p>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
