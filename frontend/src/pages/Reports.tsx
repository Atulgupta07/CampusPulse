import { useState, useEffect } from "react";
import { reportsApi, aiApi } from "../api";
import { DepartmentReportSummary, AIReportResponse } from "../types";

export default function Reports() {
  const [summary, setSummary] = useState<DepartmentReportSummary | null>(null);
  const [aiReport, setAiReport] = useState<AIReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await reportsApi.getSummary();
        setSummary(data);
      } catch (err: any) {
        setError(err.message || "Failed to load reports");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const handleGenerateReport = async () => {
    setReportLoading(true);
    try {
      const data = await aiApi.generateReport();
      setAiReport(data);
    } catch (err: any) {
      alert("Failed to generate AI report: " + err.message);
    } finally {
      setReportLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 bg-slate-100 min-h-screen text-center text-gray-500 py-10">Loading reports...</div>;
  }

  const data = [
    {
      title: "Total Tasks",
      value: summary?.total_tasks || "0",
      desc: "Department activities"
    },
    {
      title: "Completed Tasks",
      value: summary?.completed_tasks || "0",
      desc: `${summary?.completion_rate || "0%"} completion rate`
    },
    {
      title: "Faculty Active",
      value: summary?.active_faculty || "0",
      desc: "AIML Department"
    },
    {
      title: "AI Efficiency",
      value: summary?.ai_efficiency || "0%",
      desc: "Workflow optimization"
    }
  ];

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Department Reports</h1>
      <p className="text-gray-600 mb-8">AI generated workflow and performance analysis</p>

      {error && <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-8">{error}</div>}

      {/* Cards */}
      <div className="grid grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-gray-600">{item.title}</h2>
            <h1 className="text-4xl font-bold text-blue-600 mt-3">{item.value}</h1>
            <p className="mt-2 text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Report Section */}
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">📈 Workflow Analysis</h2>
          <ul className="space-y-3">
            <li>✅ {summary?.completed_tasks || 0} tasks completed successfully</li>
            <li>⚡ {(summary?.total_tasks || 0) - (summary?.completed_tasks || 0)} tasks are in progress</li>
            <li>🤖 AI detected improved productivity</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold">🤖 {aiReport?.title || "HieraSync AI Report"}</h2>
          <p className="mt-4">
            {aiReport?.summary || "AI analysis shows AIML department workflow efficiency is high. Priority should be given to pending approvals and upcoming project reviews."}
          </p>

          {aiReport?.recommendations && (
            <ul className="mt-4 list-disc pl-5">
              {aiReport.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
            </ul>
          )}

          <button 
            onClick={handleGenerateReport} 
            disabled={reportLoading}
            className="mt-6 bg-white text-blue-700 px-5 py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {reportLoading ? "Generating..." : "Generate Full Report"}
          </button>
        </div>
      </div>
    </div>
  );
}