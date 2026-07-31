import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";


import Notifications from "./pages/Notifications";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Tasks from "./pages/Tasks";
import CalendarPage from "./pages/CalendarPage";
import Approvals from "./pages/Approvals";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import Chatbot from "./components/Chatbot";




// Landing Page

function LandingPage() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-100 text-gray-800 flex flex-col items-center justify-center relative overflow-hidden">


      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30"></div>




      <div className="relative z-10 text-center">



        {/* Title */}


        <h1 className="text-6xl font-extrabold mb-5">


          <span className="text-blue-700">
            HieraSync
          </span>


          <span className="text-indigo-600">
            AI
          </span>


        </h1>





        <p className="text-2xl font-semibold text-gray-700">

          AI-Powered Organizational Workflow Management

        </p>




        <p className="mt-3 text-lg text-gray-500">

          Artificial Intelligence & Machine Learning Department

        </p>



        <p className="text-gray-500">

          SBJIT Nagpur

        </p>







        {/* Feature Cards */}



        <div className="grid grid-cols-3 gap-8 mt-12">





          <div className="bg-white shadow-xl border border-blue-100 p-7 rounded-3xl w-72 hover:-translate-y-2 transition duration-300">


            <div className="text-4xl mb-3">
              👥
            </div>


            <h2 className="text-xl font-bold text-blue-700">

              Faculty Management

            </h2>



            <p className="mt-3 text-gray-600">

              Manage faculty profiles, responsibilities and department activities.

            </p>


          </div>







          <div className="bg-white shadow-xl border border-purple-100 p-7 rounded-3xl w-72 hover:-translate-y-2 transition duration-300">


            <div className="text-4xl mb-3">
              📋
            </div>


            <h2 className="text-xl font-bold text-purple-700">

              Smart Workflow

            </h2>


            <p className="mt-3 text-gray-600">

              Track tasks, approvals, deadlines and workflow progress.

            </p>


          </div>







          <div className="bg-white shadow-xl border border-cyan-100 p-7 rounded-3xl w-72 hover:-translate-y-2 transition duration-300">


            <div className="text-4xl mb-3">
              🤖
            </div>


            <h2 className="text-xl font-bold text-cyan-700">

              AI Assistant

            </h2>


            <p className="mt-3 text-gray-600">

              AI recommendations and productivity insights.

            </p>


          </div>



        </div>






        {/* Button */}



        <Link

          to="/dashboard"

          className="inline-block mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-lg hover:scale-105 transition duration-300"

        >

          🚀 Enter Dashboard

        </Link>





        <p className="mt-8 text-gray-400">

          Smart AI Workflow Solution for AIML Department

        </p>




      </div>



    </div>

  );

}








function App() {


return (

<BrowserRouter>


<Routes>




<Route

path="/"

element={<LandingPage />}

/>





<Route

path="/dashboard"

element={<Dashboard />}

/>





<Route

path="/employees"

element={<Employees />}

/>





<Route

path="/tasks"

element={<Tasks />}

/>





<Route

path="/calendar"

element={<CalendarPage />}

/>





<Route

path="/approvals"

element={<Approvals />}

/>





<Route

path="/reports"

element={<Reports />}

/>





<Route

path="/settings"

element={<Settings />}

/>





<Route

path="/notifications"

element={<Notifications />}

/>





</Routes>




<Chatbot />



</BrowserRouter>


);

}



export default App;