import React from 'react';
import { Bell, Mail, MessageSquare, Shield, Award } from 'lucide-react';

interface NotificationToggleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function NotificationToggle({ title, description, icon, enabled, onChange }: NotificationToggleProps) {
  return (
    <div className="flex items-start space-x-4 py-4">
      <div className="flex-shrink-0 pt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-[#1F1F1F]">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:ring-offset-2 ${
          enabled ? 'bg-[#198E49]' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

export function NotificationSettings() {
  const [notifications, setNotifications] = React.useState({
    inApp: true,
    email: true,
    sms: false,
    security: true,
    rewards: true,
    comments: true,
    followers: false,
  });

  const updateNotification = (key: keyof typeof notifications, value: boolean) => {
    setNotifications({ ...notifications, [key]: value });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-6">Notification Preferences</h3>
        
        <div className="space-y-2 divide-y divide-gray-200">
          <NotificationToggle
            title="In-app Notifications"
            description="Receive notifications within the application"
            icon={<Bell className="w-5 h-5 text-[#AF583B]" />}
            enabled={notifications.inApp}
            onChange={(value) => updateNotification('inApp', value)}
          />
          
          <NotificationToggle
            title="Email Notifications"
            description="Get important updates via email"
            icon={<Mail className="w-5 h-5 text-[#AF583B]" />}
            enabled={notifications.email}
            onChange={(value) => updateNotification('email', value)}
          />
          
          <NotificationToggle
            title="SMS Notifications"
            description="Receive time-sensitive alerts via SMS"
            icon={<MessageSquare className="w-5 h-5 text-[#AF583B]" />}
            enabled={notifications.sms}
            onChange={(value) => updateNotification('sms', value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#1F1F1F] mb-6">Activity Notifications</h3>
        
        <div className="space-y-2 divide-y divide-gray-200">
          <NotificationToggle
            title="Security Alerts"
            description="Get notified about important security events"
            icon={<Shield className="w-5 h-5 text-[#AF583B]" />}
            enabled={notifications.security}
            onChange={(value) => updateNotification('security', value)}
          />
          
          <NotificationToggle
            title="Rewards & Points"
            description="Updates about earned points and rewards"
            icon={<Award className="w-5 h-5 text-[#AF583B]" />}
            enabled={notifications.rewards}
            onChange={(value) => updateNotification('rewards', value)}
          />
          
          <NotificationToggle
            title="Comments & Replies"
            description="Notifications for comments on your posts"
            icon={<MessageSquare className="w-5 h-5 text-[#AF583B]" />}
            enabled={notifications.comments}
            onChange={(value) => updateNotification('comments', value)}
          />
        </div>
      </div>

      <div className="pt-6 border-t">
        <button className="w-full md:w-auto px-6 py-2 bg-[#AF583B] text-white rounded-md font-semibold hover:bg-[#8F4731] transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );
}