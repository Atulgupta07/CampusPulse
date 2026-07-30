import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion } from 'framer-motion';

export default function CalendarPage() {
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
          <a href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</a>
          <a href="/calendar" className="text-blue-400 font-medium bg-blue-500/10 px-4 py-2 rounded-lg">Smart Calendar</a>
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
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium">
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
    </div>
  );
}
