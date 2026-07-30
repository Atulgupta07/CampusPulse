import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileText,
  Users,
  X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationCenter from '../components/NotificationCenter';

const StatCard = ({ title, value, icon: Icon, color, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className={`p-6 rounded-2xl bg-gray-800 border border-gray-700 shadow-xl flex items-center justify-between hover:border-${color}-500 transition-colors`}
  >
    <div>
      <p className="text-gray-400 text-sm font-medium">{title}</p>
      <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
    </div>
    <div className={`p-4 rounded-xl bg-${color}-500/10 text-${color}-400`}>
      <Icon size={24} />
    </div>
  </motion.div>
);

export default function Dashboard() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white font-sans flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="px-8 py-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            CampusFlow
          </h1>
          <p className="text-gray-400 text-sm">Welcome back, Professor Smith!</p>
        </div>
        <div className="flex gap-4 items-center">
          <NotificationCenter />
          <Link to="/" className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
            Logout
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Pending Tasks" value="12" icon={Clock} color="orange" delay={0.1} />
          <StatCard title="Upcoming Events" value="3" icon={Calendar} color="blue" delay={0.2} />
          <StatCard title="Pending Approvals" value="5" icon={AlertCircle} color="red" delay={0.3} />
          <StatCard title="Completed" value="28" icon={CheckCircle} color="emerald" delay={0.4} />
        </div>

        {/* Charts Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold mb-4 text-white">Task Completion Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { name: 'Mon', completed: 4 },
                { name: 'Tue', completed: 7 },
                { name: 'Wed', completed: 5 },
                { name: 'Thu', completed: 10 },
                { name: 'Fri', completed: 12 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Line type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="text-blue-400" size={20} />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-900/50 hover:bg-gray-700/50 transition-colors">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-400" />
                  <div>
                    <h4 className="font-medium text-gray-200">Department Meeting Scheduled</h4>
                    <p className="text-sm text-gray-400 mt-1">HOD approved the request for the Seminar Hall.</p>
                    <span className="text-xs text-gray-500 mt-2 block">2 hours ago</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="text-emerald-400" size={20} />
              Quick Actions
            </h2>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setIsTaskModalOpen(true)}
                className="w-full py-3 px-4 bg-gray-900/50 hover:bg-blue-500/20 text-gray-300 hover:text-blue-400 rounded-xl transition-all text-left font-medium border border-transparent hover:border-blue-500/30 cursor-pointer"
              >
                + Create New Task
              </button>
              <button 
                onClick={() => navigate('/calendar')}
                className="w-full py-3 px-4 bg-gray-900/50 hover:bg-purple-500/20 text-gray-300 hover:text-purple-400 rounded-xl transition-all text-left font-medium border border-transparent hover:border-purple-500/30 cursor-pointer"
              >
                + Schedule Event
              </button>
              <button 
                className="w-full py-3 px-4 bg-gray-900/50 hover:bg-orange-500/20 text-gray-300 hover:text-orange-400 rounded-xl transition-all text-left font-medium border border-transparent hover:border-orange-500/30 cursor-pointer"
              >
                + Request Approval
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Create Task Modal */}
      <AnimatePresence>
        {isTaskModalOpen && (
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
              className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <button 
                onClick={() => setIsTaskModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-white">Create New Task</h2>
              <form className="space-y-4 flex flex-col" onSubmit={(e) => { e.preventDefault(); setIsTaskModalOpen(false); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Task Title</label>
                  <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="Enter task title" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Assignee</label>
                  <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                    <option>Student Group A</option>
                    <option>HOD Mathematics</option>
                    <option>Admin</option>
                  </select>
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors shadow-lg shadow-blue-600/20">
                    Create Task
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
