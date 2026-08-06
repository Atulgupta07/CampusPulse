import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";


import { lazy, Suspense } from "react";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Chatbot from "./components/Chatbot";

const Notifications = lazy(() => import("./pages/Notifications"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Employees = lazy(() => import("./pages/Employees"));
const Tasks = lazy(() => import("./pages/Tasks"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const Approvals = lazy(() => import("./pages/Approvals"));
const Reports = lazy(() => import("./pages/Reports"));
const Settings = lazy(() => import("./pages/Settings"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const JoinDepartment = lazy(() => import("./pages/JoinDepartment"));
const CreateDepartment = lazy(() => import("./pages/CreateDepartment"));
// Landing Page

function LandingPage(){

return(

<div className="
min-h-screen
bg-gradient-to-br
from-sky-50
via-white
to-indigo-100
flex
items-center
justify-center
relative
overflow-hidden
">


<div className="
absolute
top-0
left-0
w-96
h-96
bg-blue-300
rounded-full
blur-3xl
opacity-30
">
</div>


<div className="
absolute
bottom-0
right-0
w-96
h-96
bg-purple-300
rounded-full
blur-3xl
opacity-30
">
</div>



<div className="
relative
text-center
">


<h1 className="
text-6xl
font-extrabold
mb-5
">


<span className="text-blue-700">
HieraSync
</span>


<span className="text-indigo-600">
AI
</span>


</h1>



<p className="
text-2xl
font-semibold
text-gray-700
">

AI-Powered Organizational Workflow Management

</p>



<p className="
mt-3
text-lg
text-gray-500
">

Artificial Intelligence & Machine Learning Department

</p>



<p className="text-gray-500">

SBJIT Nagpur

</p>





<div className="
grid
grid-cols-3
gap-8
mt-12
">



<div className="
bg-white
shadow-xl
p-7
rounded-3xl
w-72
hover:scale-105
transition
">


<div className="text-4xl">
👥
</div>


<h2 className="
text-xl
font-bold
text-blue-700
mt-3
">

Faculty Management

</h2>


<p className="text-gray-600 mt-3">

Manage faculty profiles and activities.

</p>


</div>





<div className="
bg-white
shadow-xl
p-7
rounded-3xl
w-72
hover:scale-105
transition
">


<div className="text-4xl">
📋
</div>


<h2 className="
text-xl
font-bold
text-purple-700
mt-3
">

Smart Workflow

</h2>


<p className="text-gray-600 mt-3">

Track tasks, approvals and deadlines.

</p>


</div>





<div className="
bg-white
shadow-xl
p-7
rounded-3xl
w-72
hover:scale-105
transition
">


<div className="text-4xl">
🤖
</div>


<h2 className="
text-xl
font-bold
text-cyan-700
mt-3
">

AI Assistant

</h2>


<p className="text-gray-600 mt-3">

AI based workflow support.

</p>


</div>


</div>





<Link

to="/login"

className="
inline-block
mt-12
bg-gradient-to-r
from-blue-600
to-indigo-600
text-white
px-10
py-4
rounded-2xl
font-bold
shadow-lg
hover:scale-105
transition
"

>

🔐 Login Portal

</Link>



</div>


</div>

);

}







function App(){

  return(
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={
          <div className="flex h-screen w-screen items-center justify-center bg-blue-50">
            <div className="w-10 h-10 border-4 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            {/* Landing */}
            <Route path="/" element={<LandingPage/>} />
            
            {/* Login & Register */}
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            
            {/* Main Application */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout/>}>
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/employees" element={<Employees/>} />
                <Route path="/tasks" element={<Tasks/>} />
                <Route path="/calendar" element={<CalendarPage/>} />
                <Route path="/approvals" element={<Approvals/>} />
                <Route path="/reports" element={<Reports/>} />
                <Route path="/settings" element={<Settings/>} />
                <Route path="/notifications" element={<Notifications/>} />
                <Route path="/join-department" element={<JoinDepartment/>} />
                <Route path="/create-department" element={<CreateDepartment/>} />
              </Route>
            </Route>
          </Routes>
          <Chatbot/>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );

}



export default App;