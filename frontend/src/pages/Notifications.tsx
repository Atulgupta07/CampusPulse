import { useState, useEffect } from "react";
import { notificationsApi, aiApi } from "../api";
import { NotificationResponse } from "../types";

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [aiSummary, setAiSummary] = useState("AI analyzes department activities and highlights important tasks, approvals and upcoming deadlines.");
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await notificationsApi.getAll();
      setNotifications(data);
    } catch (err: any) {
      setError(err.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationsApi.markAsRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true, status: "Read" } : n));
    } catch (err: any) {
      alert("Failed to mark notification as read");
    }
  };

  const handleGenerateSummary = async () => {
    setSummaryLoading(true);
    try {
      const res = await aiApi.getNotificationSummary();
      if (res && res.message) {
        setAiSummary(res.message);
      }
    } catch (err: any) {
      alert("Failed to generate AI summary");
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Notifications</h1>
          <p className="text-gray-500 mt-2">Department alerts and AI powered updates</p>
        </div>
        <button 
          onClick={async () => {
            try {
              await notificationsApi.markAllAsRead();
              fetchNotifications();
            } catch (e) {
              alert("Failed to mark all as read");
            }
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Mark all as read
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-8">{error}</div>}

      <div className="space-y-5">
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No new notifications.</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleMarkAsRead(notification.id)}
              className={`bg-white rounded-3xl shadow-md p-6 flex justify-between items-center hover:shadow-xl hover:-translate-y-1 transition cursor-pointer ${notification.is_read ? 'opacity-60' : ''}`}
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-4xl">
                  {notification.icon || "🔔"}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-blue-700">{notification.title}</h2>
                    <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                      {notification.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{notification.message}</p>
                  <p className="text-sm text-gray-400 mt-2">{notification.time}</p>
                </div>
              </div>
              <span
                className={`px-4 py-2 rounded-full font-semibold ${
                  notification.type === "AI" ? "bg-blue-100 text-blue-700" :
                  notification.type === "Approval" ? "bg-green-100 text-green-700" :
                  notification.type === "Reminder" ? "bg-orange-100 text-orange-700" :
                  notification.type === "Faculty" ? "bg-purple-100 text-purple-700" :
                  "bg-cyan-100 text-cyan-700"
                }`}
              >
                {notification.type}
              </span>
            </div>
          ))
        )}
      </div>

      {/* AI Assistant */}
      <div className="mt-10 bg-gradient-to-r from-blue-100 to-cyan-100 border rounded-3xl shadow p-6">
        <h2 className="text-2xl font-bold text-blue-700">🤖 HieraSync AI Notification Assistant</h2>
        <p className="mt-3 text-gray-700">{aiSummary}</p>
        <button
          onClick={handleGenerateSummary}
          disabled={summaryLoading}
          className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          {summaryLoading ? "Generating..." : "Generate AI Summary"}
        </button>
      </div>
    </div>
  );
}