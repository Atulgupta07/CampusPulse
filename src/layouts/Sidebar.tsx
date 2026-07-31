import {
  FaHome,
  FaTasks,
  FaCalendarAlt,
  FaClipboardCheck,
  FaChartBar,
  FaRobot,
  FaUsers,
  FaCog,
  FaBell
} from "react-icons/fa";


import { NavLink } from "react-router-dom";



export default function Sidebar(){


const menu=[

{
name:"Dashboard",
path:"/dashboard",
icon:<FaHome/>
},

{
name:"AI Assistant",
path:"/ai",
icon:<FaRobot/>
},

{
name:"Employees",
path:"/employees",
icon:<FaUsers/>
},


{
name:"Tasks",
path:"/tasks",
icon:<FaTasks/>
},


{
name:"Notifications",
path:"/notifications",
icon:<FaBell/>
},


{
name:"Calendar",
path:"/calendar",
icon:<FaCalendarAlt/>
},


{
name:"Approvals",
path:"/approvals",
icon:<FaClipboardCheck/>
},


{
name:"Reports",
path:"/reports",
icon:<FaChartBar/>
},


{
name:"Settings",
path:"/settings",
icon:<FaCog/>
}



];




return(


<div className="w-72 min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-100 p-6 shadow-xl border-r">



<h1 className="text-3xl font-bold text-blue-700">

HieraSync

</h1>


<p className="text-gray-500 mb-10">

AIML Department Portal

</p>




<ul className="space-y-3">


{

menu.map((item,index)=>(


<li key={index}>


<NavLink

to={item.path}

className={({isActive})=>

`flex items-center gap-4 px-5 py-3 rounded-xl transition

${
isActive
?
"bg-blue-600 text-white shadow-lg"
:
"text-gray-600 hover:bg-blue-100 hover:text-blue-600"
}

`

}


>


<span className="text-xl">

{item.icon}

</span>


<span className="font-semibold">

{item.name}

</span>


</NavLink>



</li>


))


}



</ul>





</div>



)


}