import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";


export default function MainLayout(){

return(

<div className="flex min-h-screen bg-blue-50">


{/* Sidebar */}

<Sidebar />



{/* Main Content */}

<div className="flex-1">


<Navbar />


<div className="p-6">

<Outlet />

</div>


</div>



</div>

);

}