import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout() {

  return (

    <div className="flex bg-blue-50 min-h-screen">


      <Sidebar />


      <div className="flex-1">


        <Navbar />



        <div className="p-8">





          {/* Heading */}

          <h1 className="text-4xl font-bold text-gray-800">

            Welcome, Tanvi 👋

          </h1>


          <p className="text-gray-500 mt-2 mb-8">

            AI-Powered Organizational Workflow Dashboard

          </p>







          {/* Dashboard Cards */}



          <div className="grid grid-cols-4 gap-6">





            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:scale-105 transition">


              <p className="text-gray-500">
                Employees
              </p>


              <h1 className="text-4xl font-bold text-blue-600 mt-2">
                124
              </h1>


              <p className="text-sm text-gray-500 mt-2">
                +12 This Month
              </p>


            </div>






            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:scale-105 transition">


              <p className="text-gray-500">
                Pending Tasks
              </p>


              <h1 className="text-4xl font-bold text-orange-500 mt-2">
                18
              </h1>


              <p className="text-sm text-gray-500 mt-2">
                5 High Priority
              </p>


            </div>







            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:scale-105 transition">


              <p className="text-gray-500">
                Approvals
              </p>


              <h1 className="text-4xl font-bold text-green-600 mt-2">
                9
              </h1>


              <p className="text-sm text-gray-500 mt-2">
                2 Waiting
              </p>


            </div>







            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:scale-105 transition">


              <p className="text-gray-500">
                AI Productivity
              </p>


              <h1 className="text-4xl font-bold text-purple-600 mt-2">
                92%
              </h1>


              <p className="text-sm text-gray-500 mt-2">
                Excellent
              </p>


            </div>




          </div>









          {/* Recent Activity */}



          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">


            <h2 className="text-2xl font-bold text-gray-800 mb-5">

              Recent Activity

            </h2>



            <div className="space-y-4">


              <div className="bg-blue-50 p-4 rounded-xl">

                ✅ New task assigned to Faculty Member

              </div>



              <div className="bg-purple-50 p-4 rounded-xl">

                📅 Department meeting scheduled at 3:00 PM

              </div>



              <div className="bg-green-50 p-4 rounded-xl">

                🤖 AI suggested priority task completion

              </div>



              <div className="bg-orange-50 p-4 rounded-xl">

                ✔ Approval request completed

              </div>


            </div>


          </div>









          {/* AI Assistant */}



          <div className="mt-8 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl shadow-lg p-6 border">


            <h2 className="text-2xl font-bold text-blue-700">

              🤖 HieraSync AI Assistant

            </h2>



            <p className="mt-3 text-gray-700">

              Good Morning, Tanvi 👋

            </p>




            <div className="mt-5 space-y-3">


              <p>
                ⚡ 2 Tasks may miss deadline
              </p>


              <p>
                📅 Meeting with HOD at 3 PM
              </p>


              <p>
                📈 Productivity Score : 92%
              </p>


              <p>
                ✅ Complete pending approvals first
              </p>



            </div>





            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">

              Generate AI Report

            </button>



          </div>









          {/* Workflow Progress */}



          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">


            <h2 className="text-2xl font-bold mb-5">

              Workflow Progress

            </h2>




            <div className="w-full bg-gray-200 rounded-full h-5">


              <div

                className="bg-blue-600 h-5 rounded-full"

                style={{width:"75%"}}

              >

              </div>



            </div>




            <p className="mt-3 text-gray-600">

              75% Workflow Completed

            </p>



          </div>







        </div>


      </div>


    </div>

  );

}