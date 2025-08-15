'use client'

import { useAuth } from '@/contexts/AuthContext';

export default function UserProfile() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">User Profile</h2>
      
      <div className="flex items-center space-x-4 mb-6">
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            className="w-16 h-16 rounded-full"
          />
        )}
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {user.displayName || 'Anonymous User'}
          </h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <span className="font-medium text-gray-700">Member since: </span>
          <span className="text-gray-600">
            {user.createdAt?.toLocaleDateString() || 'Recently'}
          </span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Last login: </span>
          <span className="text-gray-600">
            {user.lastLoginAt?.toLocaleDateString() || 'Today'}
          </span>
        </div>
      </div>
    </div>
  );
}