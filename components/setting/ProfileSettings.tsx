import React, { useState } from "react";
import { Camera, Shield, History, Link } from "lucide-react";

interface User {
  name: string;
  username: string;
  email: string;
  phone: string;
}

export function ProfileSettings({ user }: { user: User }) {
  const [profile, setProfile] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
  });

  return (
    <div className="space-y-8">
      {/* Profile Picture Section */}
      <div className="flex items-start space-x-6">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 p-1.5 bg-[#AF583B] rounded-full text-white hover:bg-[#8F4731] transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#1F1F1F]">
            Profile Picture
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Upload a photo to make your profile stand out
          </p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-[#1F1F1F] flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#AF583B] focus:ring focus:ring-[#AF583B] focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#AF583B] focus:ring focus:ring-[#AF583B] focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#AF583B] focus:ring focus:ring-[#AF583B] focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#AF583B] focus:ring focus:ring-[#AF583B] focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Login History */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1F1F1F] flex items-center">
          <History className="w-5 h-5 mr-2" />
          Recent Login Activity
        </h3>

        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          {[
            {
              device: "MacBook Pro",
              location: "San Francisco, CA",
              time: "2 hours ago",
            },
            {
              device: "iPhone 13",
              location: "San Francisco, CA",
              time: "1 day ago",
            },
          ].map((login, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-[#1F1F1F]">{login.device}</p>
                <p className="text-sm text-gray-500">{login.location}</p>
              </div>
              <span className="text-sm text-gray-500">{login.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1F1F1F] flex items-center">
          <Link className="w-5 h-5 mr-2" />
          Connected Accounts
        </h3>

        <div className="space-y-4">
          {[
            { name: "Google", connected: true },
            { name: "Twitter", connected: false },
            { name: "GitHub", connected: true },
          ].map((account, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-[#1F1F1F]">{account.name}</p>
                <p className="text-sm text-gray-500">
                  {account.connected ? "Connected" : "Not connected"}
                </p>
              </div>
              <button
                className={`px-4 py-2 rounded-md text-sm font-semibold ${
                  account.connected
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-[#AF583B] text-white hover:bg-[#8F4731]"
                }`}
              >
                {account.connected ? "Disconnect" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-6 border-t">
        <button className="w-full md:w-auto px-6 py-2 bg-[#AF583B] text-white rounded-md font-semibold hover:bg-[#8F4731] transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
