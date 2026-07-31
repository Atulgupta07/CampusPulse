import { useState } from "react";


export default function Tasks() {


const facultyList=[

"Dr. Animesh Tayal",
"Mr. Ravindra R. Rasekar",
"Dr. Bhushan Mahendra Manjre",
"Ms. Suchita Surendra Mesakar",
"Ms. Sweta Arun Bokade",
"Mr. Nitesh Lileshwar Hatwar",
"Mr. Nikhil Sakhare",
"Mrs. Neha Gurnani",
"Mrs. Mayuri Getme",
"Ms. Sujata D. Sardare",
"Ms. Swati Kamalsingh Thakur",
"Mrs. Snehal Pawar",
"Mr. Viveksingh Chauhan",
"Ms. Harshika Dehariya"

];



const [showForm,setShowForm]=useState(false);



const [tasks,setTasks]=useState([


{
title:"AI Lab Maintenance",
assigned:"Mrs. Neha Gurnani",
deadline:"05 August 2026",
priority:"High",
status:"In Progress",
progress:"75%"
},


{
title:"Final Year Project Review",
assigned:"Dr. Animesh Tayal",
deadline:"10 August 2026",
priority:"Medium",
status:"Pending Approval",
progress:"50%"
},


{
title:"Student Research Tracking",
assigned:"Dr. Bhushan Mahendra Manjre",
deadline:"15 August 2026",
priority:"Low",
status:"Completed",
progress:"100%"
}


]);





const [task,setTask]=useState({

title:"",
assigned:"",
deadline:"",
priority:"High"

});






function addTask(){


setTasks([

...tasks,

{

title:task.title,
assigned:task.assigned,
deadline:task.deadline,
priority:task.priority,
status:"Pending",
progress:"0%"

}

]);


setShowForm(false);


}







return(


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

onClick={()=>setShowForm(!showForm)}

className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700"

>

+ Add New Task

</button>



</div>








{
showForm &&


<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">


<h2 className="text-2xl font-bold text-blue-700 mb-5">

Create New Task

</h2>




<input

placeholder="Enter Task Name"

className="w-full border p-3 rounded-xl mb-4"

onChange={(e)=>setTask({...task,title:e.target.value})}

/>







<select

className="w-full border p-3 rounded-xl mb-4"

onChange={(e)=>setTask({...task,assigned:e.target.value})}

>


<option>Select Faculty</option>


{

facultyList.map((faculty)=>(

<option key={faculty}>

{faculty}

</option>


))


}



</select>






<input

type="date"

className="w-full border p-3 rounded-xl mb-4"

onChange={(e)=>setTask({...task,deadline:e.target.value})}

/>






<select

className="w-full border p-3 rounded-xl mb-5"

onChange={(e)=>setTask({...task,priority:e.target.value})}

>


<option>High</option>

<option>Medium</option>

<option>Low</option>


</select>






<button

onClick={addTask}

className="bg-green-600 text-white px-8 py-3 rounded-xl"

>

Create Task

</button>



</div>


}








<div className="grid grid-cols-3 gap-6">



{

tasks.map((item,index)=>(


<div

key={index}

className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl hover:-translate-y-2 transition"

>




<h2 className="text-xl font-bold text-blue-700">

{item.title}

</h2>




<p className="mt-4">

<b>Assigned To</b>

<br/>

{item.assigned}

</p>





<p className="mt-3">

<b>Deadline:</b>

<br/>

{item.deadline}

</p>







<p className="mt-3">

<b>Priority:</b>


<span

className={

`ml-2 px-3 py-1 rounded-full text-sm

${

item.priority==="High"

?

"bg-red-100 text-red-600"

:

item.priority==="Medium"

?

"bg-orange-100 text-orange-600"

:

"bg-green-100 text-green-600"

}

`

}

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

style={{width:item.progress}}

/>


</div>



<p className="mt-2 font-semibold text-gray-600">

{item.progress} Completed

</p>



</div>





</div>


))


}



</div>









<div className="mt-10 bg-gradient-to-r from-blue-100 to-cyan-100 border rounded-3xl p-6 shadow">


<h2 className="text-2xl font-bold text-blue-700">

🤖 HieraSync AI Recommendation

</h2>



<p className="mt-3 text-gray-700">

AI suggests prioritizing high priority tasks, monitoring deadlines and completing pending project reviews before due dates.

</p>



</div>





</div>


);


}