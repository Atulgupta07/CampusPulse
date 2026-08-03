import { useState, useEffect } from "react";
import { eventsApi, aiApi, employeesApi } from "../api";
import { EventResponse, EmployeeResponse } from "../types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function CalendarPage() {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [aiInsights, setAiInsights] = useState("AI predicts upcoming deadlines and recommends scheduling project reviews before important activities.");
  const [facultyList, setFacultyList] = useState<EmployeeResponse[]>([]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    type: "Academic",
    person: "",
  });

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const [eventsData, facultyData] = await Promise.all([
          eventsApi.getAll(),
          employeesApi.getAll(),
        ]);
        setEvents(eventsData);
        setFacultyList(facultyData);

        try {
          const insights = await aiApi.getCalendarInsights();
          if (insights && insights.message) {
            setAiInsights(insights.message);
          }
        } catch (e) {}

      } catch (err: any) {
        setError(err.message || "Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchCalendarData();
  }, []);

  const handleAddEvent = async () => {
    try {
      const created = await eventsApi.create(newEvent);
      setEvents([...events, created]);
      setShowForm(false);
      setNewEvent({ title: "", date: "", type: "Academic", person: "" });
    } catch (err: any) {
      alert("Failed to create event: " + err.message);
    }
  };

  const calendarEvents = events.map(e => ({
    title: e.title,
    date: e.date, // assuming YYYY-MM-DD
    extendedProps: {
      type: e.type,
      person: e.person
    }
  }));

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            AIML Department Calendar
          </h1>
          <p className="text-gray-600 mb-8">
            Manage meetings, events and important deadlines
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700"
        >
          + Add Event
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-8">{error}</div>}

      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-5">
            Create New Event
          </h2>
          <input
            placeholder="Event Title"
            className="w-full border p-3 rounded-xl mb-4"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <input
            type="date"
            className="w-full border p-3 rounded-xl mb-4"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <select
            className="w-full border p-3 rounded-xl mb-4"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
          >
            <option>Academic</option>
            <option>Meeting</option>
            <option>Workshop</option>
            <option>Department Activity</option>
            <option>Research</option>
          </select>
          <select
            className="w-full border p-3 rounded-xl mb-4"
            value={newEvent.person}
            onChange={(e) => setNewEvent({ ...newEvent, person: e.target.value })}
          >
            <option value="">Select Responsible Person</option>
            {facultyList.map(f => (
              <option key={f.id} value={f.name}>{f.name}</option>
            ))}
          </select>
          <button
            onClick={handleAddEvent}
            className="bg-green-600 text-white px-8 py-3 rounded-xl"
            disabled={!newEvent.title || !newEvent.date || !newEvent.person}
          >
            Create Event
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading calendar...</div>
      ) : (
        <>
          {/* FullCalendar Integration */}
          <div className="bg-white p-6 rounded-2xl shadow mb-8">
            <FullCalendar
              // @ts-expect-error FullCalendar plugin types mismatch with current typescript configuration
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              initialView="dayGridMonth"
              events={calendarEvents}
              height="600px"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            {events.length === 0 && <div className="col-span-3 text-center text-gray-500 py-5">No upcoming events.</div>}
            {events.map((event, index) => (
              <div
                key={event.id || index}
                className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
              >
                <h2 className="text-xl font-bold text-blue-700">
                  {event.title}
                </h2>
                <div className="mt-4 space-y-2">
                  <p>📅 <b>Date:</b> {event.date}</p>
                  <p>📌 <b>Type:</b> {event.type}</p>
                  <p>
                    👤 <b>Responsible:</b>
                    <br />
                    {event.person}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold">
          🤖 HieraSync AI Calendar Assistant
        </h2>
        <p className="mt-3">
          {aiInsights}
        </p>
      </div>
    </div>
  );
}