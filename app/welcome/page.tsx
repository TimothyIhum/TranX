import React from 'react';

const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white p-4">
      <h1 className="text-6xl font-bold mb-4 text-center">Welcome to TranX</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">Your privacy-first secure vault for all your sensitive information.</p>
      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
        Get Started
      </button>
    </div>
  );
};

export default Welcome;
