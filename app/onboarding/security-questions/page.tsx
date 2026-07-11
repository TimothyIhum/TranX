"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const securityQuestionsBank = [
  "What was your first pet's name?",
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What was the model of your first car?",
  "What is your favorite book?",
  "What is the name of your childhood best friend?",
  "What is the street name of your first house?",
  "What is your favorite movie?",
];

const SecurityQuestions: React.FC = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    if (new Set(selectedQuestions).size !== 3) {
      setError('Please select three unique security questions.');
      return;
    }
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-4">Set Your Security Questions</h2>
        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-4">
            <select
              value={selectedQuestions[i] || ''}
              onChange={(e) => {
                const q = [...selectedQuestions];
                q[i] = e.target.value;
                setSelectedQuestions(q);
              }}
              className="w-full p-3 border border-gray-300 rounded-md mb-2"
            >
              <option value="">Select a question</option>
              {securityQuestionsBank.map(q => <option key={q} value={q}>{q}</option>)}
            </select>
            <input
              type="text"
              placeholder="Your answer"
              onChange={(e) => setAnswers({...answers, [selectedQuestions[i]]: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        ))}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button onClick={handleRegister} className="w-full bg-blue-600 text-white py-3 px-6 rounded-md">
          Complete Registration
        </button>
      </div>
    </div>
  );
};

export default SecurityQuestions;
