import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export default function CalendarPage() {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState([
    { id: '1', title: 'Department Meeting', start: new Date().toISOString().split('T')[0] + 'T10:00:00', end: new Date().toISOString().split('T')[0] + 'T11:30:00' },
    { id: '2', title: 'Student Evaluation', start: new Date().toISOString().split('T')[0] + 'T14:00:00', end: new Date().toISOString().split('T')[0] + 'T16:00:00' }
  ]);

  const handleEventDrop = (info: any) => {
    // Magnetic snap / Anti-gravity placeholder logic
    console.log(`Event dropped at: ${info.event.start.toISOString()}`);
    // Simulate updating backend
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar Placeholder */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 p-6 flex flex-col">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-8">
          CampusFlow
        </h2>
        <nav className="flex flex-col gap-4 flex-1">
          <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
          <Link to="/tasks" className="text-gray-400 hover:text-white transition-colors">Tasks Kanban</Link>
          <Link to="/calendar" className="text-blue-400 font-medium bg-blue-500/10 px-4 py-2 rounded-lg">Smart Calendar</Link>
        </nav>
      </div>

      {/* Main Calendar View */}
      <main className="flex-1 p-8 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700"
        >
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Smart Calendar</h1>
              <p className="text-gray-400 text-sm">Drag and drop events. Magnetic snap enabled.</p>
            </div>
            <button 
              onClick={() => setIsEventModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium cursor-pointer"
            >
              + New Event
            </button>
          </div>
          
          <div className="fullcalendar-custom-theme">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              events={events}
              eventDrop={handleEventDrop}
              slotDuration="00:15:00"
              snapDuration="00:15:00"
              height="75vh"
            />
          </div>
        </motion.div>
      </main>

      {/* Create Event Modal */}
      <AnimatePresence>
        {isEventModalOpen && (
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
                onClick={() => setIsEventModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-white">Schedule New Event</h2>
              <form className="space-y-4 flex flex-col" onSubmit={(e) => { e.preventDefault(); setIsEventModalOpen(false); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Event Title</label>
                  <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="Enter event title" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                    <input type="date" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
                    <input type="time" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" required />
                  </div>
                </div>
                <div className="pt-4">
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors shadow-lg shadow-blue-600/20 cursor-pointer">
                    Create Event
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
