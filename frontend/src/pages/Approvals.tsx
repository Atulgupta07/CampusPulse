import { useState, useEffect } from "react";
import { approvalsApi, aiApi } from "../api";
import { ApprovalResponse } from "../types";

export default function Approvals() {
  const [approvals, setApprovals] = useState<ApprovalResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [aiInsight, setAiInsight] = useState("AI recommends reviewing high priority project approvals first and completing pending department requests before deadlines.");

  useEffect(() => {
    fetchApprovals();
    
    // Fetch AI suggestion
    aiApi.getApprovalSuggestions().then(res => {
      if(res && res.message) setAiInsight(res.message);
    }).catch(console.error);
  }, []);

  const fetchApprovals = async () => {
    try {
      const data = await approvalsApi.getAll();
      setApprovals(data);
    } catch (err: any) {
      setError(err.message || "Failed to load approvals");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      if (action === 'approve') {
        await approvalsApi.approve(id);
      } else {
        await approvalsApi.reject(id);
      }
      // Update local state
      setApprovals(approvals.map(a => a.id === id ? { ...a, status: action === 'approve' ? 'Approved' : 'Rejected' } : a));
    } catch (err: any) {
      alert(`Failed to ${action} approval`);
    }
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Department Approvals</h1>
      <p className="text-gray-600 mb-8">Manage faculty approvals and department requests</p>

      {error && <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-8">{error}</div>}

      <div className="grid grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 text-center text-gray-500 py-10">Loading approvals...</div>
        ) : approvals.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500 py-10">No pending approvals.</div>
        ) : (
          approvals.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold text-blue-700">{item.title}</h2>
              <p className="mt-4">
                <b>Requested By:</b><br/>{item.requested}
              </p>
              <p className="mt-3">
                <b>Assigned To:</b><br/>{item.assigned}
              </p>
              <p className="mt-3">
                <b>Priority:</b>
                <span className={`ml-2 font-bold ${
                  item.priority === "High" ? "text-red-600" :
                  item.priority === "Medium" ? "text-orange-500" : "text-green-600"
                }`}>
                  {item.priority}
                </span>
              </p>
              <p className="mt-3">
                <b>Status:</b>
                <span className="ml-2 text-blue-600 font-semibold">{item.status}</span>
              </p>
              
              {item.status === 'Pending' && (
                <div className="flex gap-3 mt-5">
                  <button onClick={() => handleAction(item.id, 'approve')} className="bg-green-600 text-white px-4 py-2 rounded-lg">
                    Approve
                  </button>
                  <button onClick={() => handleAction(item.id, 'reject')} className="bg-red-600 text-white px-4 py-2 rounded-lg">
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold">🤖 HieraSync AI Approval Assistant</h2>
        <p className="mt-3">{aiInsight}</p>
      </div>
    </div>
  );
}