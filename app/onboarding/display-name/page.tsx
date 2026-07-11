"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DisplayName: React.FC = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleNext = () => {
    if (displayName.trim() && email.trim()) {
      // Save to session storage for the next steps
      sessionStorage.setItem("tranx_display_name", displayName);
      sessionStorage.setItem("tranx_email", email);
      router.push("/onboarding/create-password");
    } else {
      alert("Please enter both display name and email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4">Welcome to TranX</h2>
        <p className="text-gray-600 mb-6">
          Let's get started with your secure vault.
        </p>
        <input
          type="text"
          placeholder="Display Name (e.g., Temitope)"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-6"
        />
        <button
          onClick={handleNext}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DisplayName;
