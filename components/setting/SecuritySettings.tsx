import React, { useState } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

export function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change logic here
    console.log('Password change requested');
  };

  const handleAccountDelete = () => {
    // Handle account deletion logic here
    console.log('Account deletion requested');
  };

  return (
    <div className="space-y-8">
      {/* Password Change Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-[#AF583B]" />
          <h3 className="text-lg font-semibold text-[#1F1F1F]">Change Password</h3>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#AF583B] focus:ring focus:ring-[#AF583B] focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#AF583B] focus:ring focus:ring-[#AF583B] focus:ring-opacity-50"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Password must be at least 8 characters long and include numbers and symbols
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#AF583B] focus:ring focus:ring-[#AF583B] focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-[#AF583B] text-white rounded-md font-semibold hover:bg-[#8F4731] transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Account Deletion Section */}
      <div className="pt-8 border-t">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold text-[#1F1F1F]">Delete Account</h3>
          </div>

          <p className="text-sm text-gray-600">
            Once you delete your account, there is no going back. Please be certain.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-md font-semibold hover:bg-red-200 transition-colors"
            >
              Delete Account
            </button>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-4">
              <p className="text-sm text-red-700 font-medium">
                Are you absolutely sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleAccountDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition-colors"
                >
                  Yes, Delete My Account
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}