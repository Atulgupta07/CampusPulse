import { useEffect, useState } from "react";
import { reportsApi } from "../api";
import { DashboardStatsResponse } from "../types";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await reportsApi.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800">Welcome 👋</h1>
      <p className="text-gray-500 mt-2 mb-8">AI-Powered Organizational Workflow Dashboard</p>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-xl">Loading dashboard...</div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {/* Employees */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:scale-105 transition">
            <p className="text-gray-500">Employees</p>
            <h1 className="text-4xl font-bold text-blue-600 mt-2">{stats?.employees_count || 0}</h1>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:scale-105 transition">
            <p className="text-gray-500">Pending Tasks</p>
            <h1 className="text-4xl font-bold text-orange-500 mt-2">{stats?.pending_tasks_count || 0}</h1>
          </div>

          {/* Approvals */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:scale-105 transition">
            <p className="text-gray-500">Approvals</p>
            <h1 className="text-4xl font-bold text-green-600 mt-2">{stats?.approvals_count || 0}</h1>
          </div>

          {/* AI Productivity */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:scale-105 transition">
            <p className="text-gray-500">AI Productivity</p>
            <h1 className="text-4xl font-bold text-purple-600 mt-2">{stats?.ai_productivity || "0%"}</h1>
          </div>
        </div>
      )}
    </div>
  );
}