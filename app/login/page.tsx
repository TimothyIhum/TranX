"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase/client";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6">Unlock Your TranX Vault</h2>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="password"
          placeholder="Master Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md disabled:opacity-50"
        >
          {loading ? "Unlocking..." : "Unlock Vault"}
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Don't have a vault?{" "}
          <button
            onClick={() => router.push("/welcome")}
            className="text-blue-600 hover:underline"
          >
            Get Started
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
