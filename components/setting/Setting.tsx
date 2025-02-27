"use client";
import React, { useState } from "react";

import { BillingSettings } from "@/components/setting/BillingSettings";
import { NotificationSettings } from "@/components/setting/NotificationSettings";
import { ProfileSettings } from "@/components/setting/ProfileSettings";
import { SecuritySettings } from "@/components/setting/SecuritySettings";
import { SettingsLayout } from "@/components/setting/SettingsLayout";

interface AvatarProps {
  user: any;
}

const Setting: React.FC<AvatarProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings user={user} />;
      case "security":
        return <SecuritySettings />;
      case "notifications":
        return <NotificationSettings />;
      case "billing":
        return <BillingSettings />;
      default:
        return <ProfileSettings user={user} />;
    }
  };

  return (
    <SettingsLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </SettingsLayout>
  );
};

export default Setting;
