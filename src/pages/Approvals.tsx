import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, XCircle, AlertCircle, X } from 'lucide-react';

const mockApprovals = [
  {
    id: 1,
    title: 'Purchase new lab equipment',
    requester: 'Prof. Davis (Physics)',
    stage: 'PRINCIPAL_STAGE',
    status: 'APPROVED_BY_HOD',
    hodComment: 'Budget is available, recommended for approval.',
    principalComment: null,
    date: '2026-07-30',
  },
  {
    id: 2,
    title: 'Organize Guest Lecture in CS Dept',
    requester: 'Prof. Smith (CS)',
    stage: 'HOD_STAGE',
    status: 'PENDING',
    hodComment: null,
    principalComment: null,
    date: '2026-07-29',
  },
  {
    id: 3,
    title: 'Change exam schedule for Year 2',
    requester: 'Dr. Johnson (Math)',
    stage: 'COMPLETED',
    status: 'REJECTED',
    hodComment: 'Does not align with university guidelines.',
    principalComment: null,
    date: '2026-07-28',
  }
];

const StatusIcon = ({ status }: { status: string }) => {
  if (status.includes('APPROVED')) return <CheckCircle className="text-emerald-400" size={20} />;
  if (status === 'REJECTED') return <XCircle className="text-red-400" size={20} />;
  return <Clock className="text-orange-400" size={20} />;
};

const StageBadge = ({ stage }: { stage: string }) => {
  const colors: Record<string, string> = {
    'HOD_STAGE': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'PRINCIPAL_STAGE': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'COMPLETED': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[stage]}`}>
      {stage.replace('_', ' ')}
    </span>
  );
};

export default function Approvals() {
  const [approvals, setApprovals] = useState(mockApprovals);
  const [selectedApproval, setSelectedApproval] = useState<any>(null);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 p-6 flex flex-col">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-8">
          CampusFlow
        </h2>
        <nav className="flex flex-col gap-4 flex-1">
          <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
          <Link to="/tasks" className="text-gray-400 hover:text-white transition-colors">Tasks Kanban</Link>
          <Link to="/calendar" className="text-gray-400 hover:text-white transition-colors">Smart Calendar</Link>
          <Link to="/approvals" className="text-blue-400 font-medium bg-blue-500/10 px-4 py-2 rounded-lg">Approvals</Link>
        </nav>
      </div>

      <main className="flex-1 p-8 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <AlertCircle className="text-purple-400" />
                Approval Workflows
              </h1>
              <p className="text-gray-400 text-sm mt-1">Multi-stage tracking: Teacher → HOD → Principal</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium cursor-pointer shadow-lg shadow-blue-500/20">
              + New Request
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {approvals.map((approval) => (
              <motion.div 
                key={approval.id}
                whileHover={{ scale: 1.01 }}
                className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex items-center justify-between cursor-pointer hover:border-purple-500/50 transition-all"
                onClick={() => setSelectedApproval(approval)}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <StatusIcon status={approval.status} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-100">{approval.title}</h3>
                    <p className="text-sm text-gray-400">Requested by {approval.requester} • {approval.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StageBadge stage={approval.stage} />
                  <button className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                    Review
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedApproval && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-8 w-full max-w-lg shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedApproval(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-2 text-white">Approval Details</h2>
              <p className="text-gray-400 mb-6">{selectedApproval.title}</p>
              
              <div className="space-y-6">
                {/* Timeline */}
                <div className="relative border-l-2 border-gray-700 ml-3 space-y-6">
                  {/* HOD Step */}
                  <div className="relative pl-6">
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-gray-800 ${selectedApproval.hodComment ? 'bg-emerald-500' : 'bg-gray-600'}`}></div>
                    <h4 className="font-bold text-gray-200">HOD Review</h4>
                    <p className="text-sm text-gray-400 mt-1">{selectedApproval.hodComment || 'Pending review...'}</p>
                  </div>
                  {/* Principal Step */}
                  <div className="relative pl-6">
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-gray-800 ${selectedApproval.principalComment ? 'bg-emerald-500' : selectedApproval.stage === 'PRINCIPAL_STAGE' ? 'bg-orange-500' : 'bg-gray-600'}`}></div>
                    <h4 className="font-bold text-gray-200">Principal Review</h4>
                    <p className="text-sm text-gray-400 mt-1">{selectedApproval.principalComment || 'Pending review...'}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700 flex gap-3">
                  <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer">
                    Approve
                  </button>
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer">
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
