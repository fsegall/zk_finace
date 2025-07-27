import React from 'react';

const DevLoginInstructions = () => {
  const isDevelopment = import.meta.env.DEV && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (!isDevelopment) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">🔧</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-900 mb-1">
            Development Mode Active
          </h3>
          <p className="text-sm text-blue-700 mb-2">
            You can use any email and password to login. The system will automatically authenticate you with mock data.
          </p>
          <div className="text-xs text-blue-600 space-y-1">
            <p><strong>Mock User:</strong> dev@zkfinance.com</p>
            <p><strong>Role:</strong> Borrower</p>
            <p><strong>Name:</strong> Developer User</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevLoginInstructions; 