import { useState, useEffect } from "react";
import { tasksApi, employeesApi, aiApi } from "../api";
import { TaskResponse, EmployeeResponse } from "../types";

export default function Tasks() {
  const [facultyList, setFacultyList] = useState<EmployeeResponse[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [aiRecommendation, setAiRecommendation] = useState("AI suggests prioritizing high priority tasks, monitoring deadlines and completing pending project reviews before due dates.");

  const [taskForm, setTaskForm] = useState({
    title: "",
    assigned: "",
    deadline: "",
    priority: "High",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksData, facultyData] = await Promise.all([
          tasksApi.getAll(),
          employeesApi.getAll()
        ]);
        setTasks(tasksData);
        setFacultyList(facultyData);
        
        // Attempt to fetch AI recommendations
        try {
           const aiData = await aiApi.getDashboardSummary();
           if(aiData && aiData.insights && aiData.insights.length > 0) {
              setAiRecommendation(aiData.insights.join(' '));
           }
        } catch (aiErr) {
           // ignore ai error
        }

      } catch (err: any) {
        setError(err.message || "Failed to load tasks data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  async function addTask() {
    try {
      const newTask = await tasksApi.create({
        ...taskForm,
        status: "Pending",
        progress: "0%"
      });
      setTasks([...tasks, newTask]);
      setShowForm(false);
      setTaskForm({ title: "", assigned: "", deadline: "", priority: "High" });
    } catch (err: any) {
      alert("Failed to create task: " + err.message);
    }
  }

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Department Task Management
          </h1>
          <p className="text-gray-500 mt-2">
            Manage department activities, deadlines and approvals
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700"
        >
          + Add New Task
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-8">{error}</div>}

      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-5">
            Create New Task
          </h2>
          <input
            placeholder="Enter Task Name"
            className="w-full border p-3 rounded-xl mb-4"
            value={taskForm.title}
            onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
          />
          <select
            className="w-full border p-3 rounded-xl mb-4"
            value={taskForm.assigned}
            onChange={(e) => setTaskForm({ ...taskForm, assigned: e.target.value })}
          >
            <option value="">Select Faculty</option>
            {facultyList.map((faculty) => (
              <option key={faculty.id} value={faculty.name}>
                {faculty.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="w-full border p-3 rounded-xl mb-4"
            value={taskForm.deadline}
            onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })}
          />
          <select
            className="w-full border p-3 rounded-xl mb-5"
            value={taskForm.priority}
            onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button
            onClick={addTask}
            className="bg-green-600 text-white px-8 py-3 rounded-xl"
            disabled={!taskForm.title || !taskForm.assigned || !taskForm.deadline}
          >
            Create Task
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading tasks...</div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {tasks.length === 0 && <div className="col-span-3 text-center text-gray-500">No tasks found.</div>}
          {tasks.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl hover:-translate-y-2 transition"
            >
              <h2 className="text-xl font-bold text-blue-700">
                {item.title}
              </h2>
              <p className="mt-4">
                <b>Assigned To</b>
                <br />
                {item.assigned}
              </p>
              <p className="mt-3">
                <b>Deadline:</b>
                <br />
                {item.deadline}
              </p>
              <p className="mt-3">
                <b>Priority:</b>
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-sm ${
                    item.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : item.priority === "Medium"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.priority}
                </span>
              </p>
              <p className="mt-4">
                <b>Status:</b>
                <span className="ml-2 text-blue-600 font-semibold">
                  {item.status}
                </span>
              </p>
              <div className="mt-5">
                <div className="bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: item.progress || "0%" }}
                  />
                </div>
                <p className="mt-2 font-semibold text-gray-600">
                  {item.progress || "0%"} Completed
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 bg-gradient-to-r from-blue-100 to-cyan-100 border rounded-3xl p-6 shadow">
        <h2 className="text-2xl font-bold text-blue-700">
          🤖 HieraSync AI Recommendation
        </h2>
        <p className="mt-3 text-gray-700">
          {aiRecommendation}
        </p>
      </div>
    </div>
  );
}