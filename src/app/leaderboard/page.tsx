"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mockData = [
    { name: "Alice", greenScore: 120 },
    { name: "Bob", greenScore: 100 },
    { name: "Charlie", greenScore: 80 },
  ];

  // Fetch leaderboard data
  useEffect(() => {
    // async function fetchLeaderboard() {
    //   try {
    //     setLoading(true);
    //     const response = await fetch(`https://localhost:8008/api/leaderboard}`);
    //     if (!response.ok) throw new Error("Failed to fetch leaderboard data");

    //     const data = await response.json();
    //     setLeaderboard(data);
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // fetchLeaderboard();
    setLeaderboard(mockData);
    setLoading(false);
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen p-6">
      <Header />
      <div className="max-w-4xl mx-auto bg-white rounded shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">🌱 Green Score Leaderboard</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Green Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr
                  key={user.name}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.greenScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
}
