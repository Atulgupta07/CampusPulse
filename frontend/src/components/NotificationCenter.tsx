import { useState } from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition relative">
        <Bell size={20} className="text-gray-300" />
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-700 bg-gray-900/50">
              <h3 className="font-semibold text-white">Notifications</h3>
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              <div className="p-3 bg-gray-900/50 rounded-lg mb-2 border-l-4 border-blue-500">
                <p className="text-sm text-gray-200">New Task Assigned: Midterms</p>
                <span className="text-xs text-gray-500">10m ago</span>
              </div>
              <div className="p-3 hover:bg-gray-700 rounded-lg transition">
                <p className="text-sm text-gray-300">Approval Request: Leave</p>
                <span className="text-xs text-gray-500">1h ago</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
