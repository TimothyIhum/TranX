"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const DisplayName: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const router = useRouter();

  const handleNext = () => {
    if (displayName.trim()) {
      router.push('/onboarding/create-password');
    } else {
      alert('Please enter a display name.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4">Create Your Display Name</h2>
        <input
          type="text"
          placeholder="Enter your display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        />
        <button onClick={handleNext} className="w-full bg-blue-600 text-white py-3 px-6 rounded-md">
          Next
        </button>
      </div>
    </div>
  );
};

export default DisplayName;
