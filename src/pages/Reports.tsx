import React from 'react';
import { motion } from 'framer-motion';

export default function Reports() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-800 p-8 rounded-2xl w-full max-w-4xl border border-gray-700 text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Analytics & Reports</h1>
        <p className="text-gray-400 mb-8">Generate and export system analytics.</p>
        <div className="grid grid-cols-2 gap-4">
          <button className="p-6 bg-gray-900 hover:bg-blue-500/10 border border-gray-700 hover:border-blue-500/30 rounded-xl transition-all">
            <h3 className="text-xl font-semibold text-blue-400 mb-2">Export to PDF</h3>
            <p className="text-sm text-gray-500">Download a consolidated PDF report of all activities.</p>
          </button>
          <button className="p-6 bg-gray-900 hover:bg-emerald-500/10 border border-gray-700 hover:border-emerald-500/30 rounded-xl transition-all">
            <h3 className="text-xl font-semibold text-emerald-400 mb-2">Export to Excel</h3>
            <p className="text-sm text-gray-500">Download a spreadsheet of raw data for analysis.</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
