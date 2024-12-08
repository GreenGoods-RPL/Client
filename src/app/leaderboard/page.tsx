"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leaderboard data from the backend API
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8008/api/leaderboard`);
        if (!response.ok) throw new Error("Failed to fetch leaderboard data");

        const data = await response.json();
        setLeaderboard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  if (error) return <div className="min-h-screen"><Header /><div className="text-red-500 text-center p-6">{error}</div><Footer /></div>;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto bg-white rounded shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Leaderboard - Top 20</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Username</th>
                <th className="py-2 px-4">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{user.username}</td>
                  <td className="py-2 px-4">{user.points}</td>
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
