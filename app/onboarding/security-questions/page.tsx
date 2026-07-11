"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase/client";

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
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (new Set(selectedQuestions.filter((q) => q)).size !== 3) {
      setError("Please select three unique security questions.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const email = sessionStorage.getItem("tranx_email");
      const password = sessionStorage.getItem("tranx_password");
      const displayName = sessionStorage.getItem("tranx_display_name");

      if (!email || !password || !displayName) {
        throw new Error(
          "Missing registration data. Please restart the process.",
        );
      }

      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Registration failed.");

      // 2. Create user profile
      const { error: profileError } = await supabase
        .from("users")
        .insert([{ id: authData.user.id, display_name: displayName }]);

      if (profileError) throw profileError;

      // 3. Save security questions
      const { error: questionsError } = await supabase
        .from("security_questions")
        .insert([
          {
            user_id: authData.user.id,
            question1_id: selectedQuestions[0],
            question2_id: selectedQuestions[1],
            question3_id: selectedQuestions[2],
            answer1_hash: answers[selectedQuestions[0]], // In real app, hash this!
            answer2_hash: answers[selectedQuestions[1]],
            answer3_hash: answers[selectedQuestions[2]],
          },
        ]);

      if (questionsError) throw questionsError;

      // 4. Initialize login security
      await supabase
        .from("login_security")
        .insert([{ user_id: authData.user.id }]);

      // Clear session storage
      sessionStorage.clear();

      alert("Registration successful! Please log in.");
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-4">Set Your Security Questions</h2>
        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-4">
            <select
              value={selectedQuestions[i] || ""}
              onChange={(e) => {
                const q = [...selectedQuestions];
                q[i] = e.target.value;
                setSelectedQuestions(q);
              }}
              className="w-full p-3 border border-gray-300 rounded-md mb-2"
            >
              <option value="">Select a question</option>
              {securityQuestionsBank.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Your answer"
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  [selectedQuestions[i]]: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        ))}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md disabled:opacity-50"
        >
          {loading ? "Registering..." : "Complete Registration"}
        </button>
      </div>
    </div>
  );
};

export default SecurityQuestions;
