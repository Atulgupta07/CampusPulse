import { motion } from 'framer-motion';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileText,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      {/* Header */}
      <header className="px-8 py-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            CampusFlow
          </h1>
          <p className="text-gray-400 text-sm">Welcome back, Professor Smith!</p>
        </div>
        <div className="flex gap-4">
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
              <button className="w-full py-3 px-4 bg-gray-900/50 hover:bg-blue-500/20 hover:text-blue-400 rounded-xl transition-all text-left font-medium border border-transparent hover:border-blue-500/30">
                + Create New Task
              </button>
              <button className="w-full py-3 px-4 bg-gray-900/50 hover:bg-purple-500/20 hover:text-purple-400 rounded-xl transition-all text-left font-medium border border-transparent hover:border-purple-500/30">
                + Schedule Event
              </button>
              <button className="w-full py-3 px-4 bg-gray-900/50 hover:bg-orange-500/20 hover:text-orange-400 rounded-xl transition-all text-left font-medium border border-transparent hover:border-orange-500/30">
                + Request Approval
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
