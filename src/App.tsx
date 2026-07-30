import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';

function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center font-sans">
      <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
        CampusFlow
      </h1>
      <p className="text-lg text-gray-400">
        Smart College Workflow & Event Management System
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/dashboard" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105">
          Login to Dashboard
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
