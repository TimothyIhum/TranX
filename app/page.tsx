import React from 'react';

const VaultDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Hello, [User Name]!</h1>
      <div className="flex justify-between items-center mb-8">
        <input
          type="text"
          placeholder="Search vaults..."
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Create Vault
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
          <h3 className="font-semibold text-lg mb-2">Example Vault Title</h3>
          <p className="text-sm text-gray-600 mb-1">Category: Passwords</p>
          <p className="text-sm text-gray-500">Last updated: 2023-10-27</p>
        </div>
      </div>

      <div className="mt-8 text-right">
        <button className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500">
          Settings
        </button>
      </div>
    </div>
  );
};

export default VaultDashboard;
