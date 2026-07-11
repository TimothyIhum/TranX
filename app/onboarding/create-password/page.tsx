"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreatePassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validatePassword = (pwd: string): boolean => {
    if (pwd.length < 12) return false;
    if (!/[A-Z]/.test(pwd)) return false;
    if (!/[a-z]/.test(pwd)) return false;
    if (!/[0-9]/.test(pwd)) return false;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return false;
    return true;
  };

  const handleNext = () => {
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 12 characters long and include uppercase, lowercase, number, and symbol.",
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    sessionStorage.setItem("tranx_password", password);
    router.push("/onboarding/security-questions");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4">Create Your Master Password</h2>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
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

export default CreatePassword;
