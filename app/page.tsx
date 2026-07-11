"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase/client";
import { decryptData } from "../lib/crypto";

const VaultDashboard: React.FC = () => {
  const [vaults, setVaults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/welcome");
        return;
      }

      // Fetch user profile for display name
      const { data: profile } = await supabase
        .from("users")
        .select("display_name")
        .eq("id", user.id)
        .single();

      if (profile) setUserName(profile.display_name);

      const { data, error } = await supabase
        .from("vault_entries")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error fetching vaults:", error);
      } else {
        setVaults(data || []);
      }
      setLoading(false);
    }
    fetchData();
  }, [router]);

  const handleCreate = () => {
    router.push("/vault/create");
  };

  const filteredVaults = vaults.filter(
    (v) =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Hello, {userName || "User"}!</h1>
      <div className="flex justify-between items-center mb-8">
        <input
          type="text"
          placeholder="Search vaults..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Vault
        </button>
      </div>

      {loading ? (
        <p>Loading your secure vault...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVaults.map((vault) => (
            <div
              key={vault.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            >
              <h3 className="font-semibold text-lg mb-2">{vault.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                Category: {vault.category}
              </p>
              <p className="text-sm text-gray-500">
                Last updated: {new Date(vault.updated_at).toLocaleDateString()}
              </p>
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  const pwd = prompt("Enter master password to view content:");
                  if (pwd) {
                    try {
                      const content = await decryptData(
                        vault.encrypted_content,
                        pwd,
                      );
                      alert(`Content for ${vault.title}:\n\n${content}`);
                    } catch (err) {
                      alert("Decryption failed. Incorrect password?");
                    }
                  }
                }}
                className="mt-2 text-xs text-blue-600 hover:underline"
              >
                View Content
              </button>
            </div>
          ))}
          {filteredVaults.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No vault entries found.
            </p>
          )}
        </div>
      )}

      <div className="mt-8 text-right">
        <button className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500">
          Settings
        </button>
      </div>
    </div>
  );
};

export default VaultDashboard;
