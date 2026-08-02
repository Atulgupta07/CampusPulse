import {
  FaSearch,
  FaBell,
  FaUserCircle
} from "react-icons/fa";

import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Navbar() {


const navigate = useNavigate();


const [search,setSearch] = useState("");



const suggestions = [

"AI Lab Maintenance",
"Final Year Project Review",
"Student Research Tracking",
"Machine Learning Workshop",
"Cyber Security Seminar",
"Faculty Profile",
"Notifications"

];



const filtered = suggestions.filter((item)=>

item.toLowerCase().includes(search.toLowerCase())

);





return (


<div className="h-20 bg-gradient-to-r from-blue-50 via-white to-indigo-50 shadow-md flex items-center justify-between px-8 border-b">





{/* Search */}


<div className="relative">


<div className="flex items-center bg-white border border-blue-100 shadow-sm rounded-xl px-4 py-3 w-96">


<FaSearch className="text-blue-500"/>



<input


type="text"


value={search}


onChange={(e)=>setSearch(e.target.value)}


placeholder="Search tasks, faculty, notification..."


className="outline-none ml-3 w-full text-gray-700"



/>



</div>





{/* Search Suggestion */}



{

search && (


<div className="absolute top-14 left-0 w-96 bg-white rounded-xl shadow-xl border z-50">


{

filtered.length > 0 ?


filtered.map((item,index)=>(


<div

key={index}

onClick={()=>setSearch(item)}

className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-gray-700"

>

{item}

</div>


))


:


<div className="p-4 text-gray-500">

No Result Found

</div>



}



</div>



)


}



</div>








{/* Right Side */}


<div className="flex items-center gap-7">






{/* Department */}


<div className="text-right">


<h3 className="font-bold text-blue-700">

AIML Department

</h3>


<p className="text-sm text-gray-500">

SBJIT Nagpur

</p>


</div>









{/* Notification */}



<button


onClick={()=>navigate("/notifications")}


className="relative bg-white p-3 rounded-xl shadow hover:bg-blue-50 transition"



>


<FaBell className="text-xl text-blue-600"/>



<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">

3

</span>



</button>








{/* Profile */}



<div className="flex items-center gap-3 bg-white shadow-sm px-4 py-2 rounded-xl">



<FaUserCircle className="text-4xl text-blue-600"/>




<div>


<h3 className="font-bold text-gray-700">

Tanvi

</h3>



<p className="text-sm text-gray-500">

Admin

</p>



</div>



</div>





</div>





</div>


);


}