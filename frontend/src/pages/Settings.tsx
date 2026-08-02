import { useState } from "react";


export default function Settings() {


  const [aiRecommendation, setAiRecommendation] = useState(true);
  const [taskAnalysis, setTaskAnalysis] = useState(true);
  const [deadlineAlert, setDeadlineAlert] = useState(true);



  return (

    <div className="p-8 bg-blue-50 min-h-screen">


      <h1 className="text-4xl font-bold text-gray-800">
        System Settings
      </h1>


      <p className="text-gray-500 mt-2 mb-8">
        Manage HieraSync AIML Department preferences
      </p>





      {/* Profile Section */}

      <div className="bg-white rounded-3xl shadow p-6 mb-8">


        <h2 className="text-2xl font-bold text-blue-700 mb-5">
          👤 User Profile
        </h2>



        <div className="flex items-center gap-5">


          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
            T
          </div>



          <div>

            <h3 className="text-xl font-bold">
              Tanvi
            </h3>


            <p className="text-gray-500">
              Admin
            </p>


            <p className="text-gray-500">
              AIML Department | SBJIT Nagpur
            </p>

          </div>


        </div>


      </div>








      <div className="grid grid-cols-2 gap-6">





        {/* Department Profile */}


        <div className="bg-white rounded-3xl shadow p-6">


          <h2 className="text-2xl font-bold text-blue-700 mb-5">
            🏢 Department Profile
          </h2>



          <div className="space-y-4 text-gray-700">


            <p>
              <b>Department:</b>
              <br />
              Artificial Intelligence & Machine Learning
            </p>



            <p>
              <b>Institute:</b>
              <br />
              SBJIT Nagpur
            </p>



            <p>
              <b>Platform:</b>
              <br />
              HieraSync AI
            </p>



            <p>
              <b>Purpose:</b>
              <br />
              Organizational Workflow Management
            </p>



          </div>



        </div>









        {/* AI Settings */}



        <div className="bg-white rounded-3xl shadow p-6">


          <h2 className="text-2xl font-bold text-blue-700 mb-5">
            🤖 AI Assistant Settings
          </h2>





          <div className="space-y-6">



            <div className="flex justify-between items-center">

              <span>
                AI Recommendations
              </span>


              <input
                type="checkbox"
                checked={aiRecommendation}
                onChange={() =>
                  setAiRecommendation(!aiRecommendation)
                }
                className="w-5 h-5"
              />


            </div>





            <div className="flex justify-between items-center">

              <span>
                Task Priority Analysis
              </span>


              <input
                type="checkbox"
                checked={taskAnalysis}
                onChange={() =>
                  setTaskAnalysis(!taskAnalysis)
                }
                className="w-5 h-5"
              />


            </div>







            <div className="flex justify-between items-center">


              <span>
                Deadline Alerts
              </span>



              <input
                type="checkbox"
                checked={deadlineAlert}
                onChange={() =>
                  setDeadlineAlert(!deadlineAlert)
                }
                className="w-5 h-5"
              />



            </div>




          </div>



        </div>








        {/* Notification Settings */}



        <div className="bg-white rounded-3xl shadow p-6">


          <h2 className="text-2xl font-bold text-blue-700 mb-5">
            🔔 Notification Preferences
          </h2>




          <div className="space-y-3">


            <div className="bg-blue-50 p-4 rounded-xl">
              ✅ Task Assignment Alerts
            </div>



            <div className="bg-green-50 p-4 rounded-xl">
              ✅ Approval Updates
            </div>



            <div className="bg-purple-50 p-4 rounded-xl">
              ✅ Upcoming Deadline Reminder
            </div>



          </div>



        </div>









        {/* System Information */}



        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 border rounded-3xl shadow p-6">


          <h2 className="text-2xl font-bold text-blue-700">
            ⚡ HieraSync System
          </h2>



          <p className="mt-4 text-gray-700">
            AI Powered Organizational Workflow Management Platform
          </p>



          <p className="mt-3 text-gray-600">
            Version: 1.0
          </p>



          <p className="mt-3 text-gray-600">
            Status: Active
          </p>



        </div>




      </div>



    </div>

  );


}