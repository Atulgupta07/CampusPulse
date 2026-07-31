export default function Notifications() {


const notifications = [


{
title:"New Task Assigned",
message:"AI Lab Maintenance task assigned to Mrs. Neha Gurnani",
time:"10 minutes ago",
type:"Task",
icon:"📋",
status:"New"
},



{
title:"Approval Pending",
message:"Final Year Project Review approval is waiting for review",
time:"1 hour ago",
type:"Approval",
icon:"✅",
status:"Pending"
},




{
title:"Deadline Reminder",
message:"Machine Learning Workshop deadline is near",
time:"Today",
type:"Reminder",
icon:"⏰",
status:"Important"
},




{
title:"Faculty Activity Update",
message:"Dr. Bhushan Mahendra Manjre updated research tracking status",
time:"Today",
type:"Faculty",
icon:"👨‍🏫",
status:"Updated"
},





{
title:"AI Recommendation",
message:"HieraSync AI suggested completing pending approvals first",
time:"Today",
type:"AI",
icon:"🤖",
status:"AI Alert"
}


];






return(



<div className="p-8 bg-blue-50 min-h-screen">






<h1 className="text-4xl font-bold text-gray-800">

Notifications

</h1>




<p className="text-gray-500 mt-2 mb-8">

Department alerts and AI powered updates

</p>








<div className="space-y-5">



{

notifications.map((notification,index)=>(




<div

key={index}

className="bg-white rounded-3xl shadow-md p-6 flex justify-between items-center hover:shadow-xl hover:-translate-y-1 transition"



>






<div className="flex items-center gap-5">





<div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-4xl">

{notification.icon}

</div>







<div>


<div className="flex items-center gap-3">


<h2 className="text-xl font-bold text-blue-700">

{notification.title}

</h2>



<span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">

{notification.status}

</span>



</div>





<p className="text-gray-600 mt-2">

{notification.message}

</p>




<p className="text-sm text-gray-400 mt-2">

{notification.time}

</p>



</div>





</div>








<span


className={

`

px-4 py-2 rounded-full font-semibold


${

notification.type==="AI"

?

"bg-blue-100 text-blue-700"

:

notification.type==="Approval"

?

"bg-green-100 text-green-700"

:

notification.type==="Reminder"

?

"bg-orange-100 text-orange-700"

:

notification.type==="Faculty"

?

"bg-purple-100 text-purple-700"

:

"bg-cyan-100 text-cyan-700"

}


`

}



>


{notification.type}


</span>






</div>



))


}



</div>









{/* AI Assistant */}



<div className="mt-10 bg-gradient-to-r from-blue-100 to-cyan-100 border rounded-3xl shadow p-6">





<h2 className="text-2xl font-bold text-blue-700">

🤖 HieraSync AI Notification Assistant

</h2>






<p className="mt-3 text-gray-700">

AI analyzes department activities and highlights important tasks, approvals and upcoming deadlines.

</p>






<button

className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"

>


Generate AI Summary


</button>




</div>





</div>



);


}