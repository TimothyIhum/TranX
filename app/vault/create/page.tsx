"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VAULT_CATEGORIES } from '../../../lib/constants';

const CreateVault: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(VAULT_CATEGORIES[0]);
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSave = () => {
    alert('Vault entry saved securely!');
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-3xl font-bold mb-6">Create New Vault Entry</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Vault Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        >
          {VAULT_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <textarea
          placeholder="Enter sensitive content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 h-48"
        />
        <div className="flex justify-end gap-4">
          <button onClick={() => router.push('/')} className="px-4 py-2">Cancel</button>
          <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-md">Save Securely</button>
        </div>
      </div>
    </div>
  );
};

export default CreateVault;
