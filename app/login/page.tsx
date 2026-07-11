"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6">Unlock Your TranX Vault</h2>
        <input
          type="password"
          placeholder="Enter your master password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-3 px-6 rounded-md">
          Unlock Vault
        </button>
      </div>
    </div>
  );
};

export default Login;
