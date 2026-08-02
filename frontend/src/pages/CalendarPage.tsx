export default function CalendarPage() {


const events = [

{
title:"Final Year Project Review",
date:"05 August 2026",
type:"Academic",
person:"Dr. Animesh Tayal"
},


{
title:"AI Lab Maintenance",
date:"08 August 2026",
type:"Department Activity",
person:"Mrs. Neha Gurnani"
},


{
title:"Machine Learning Workshop",
date:"15 August 2026",
type:"Workshop",
person:"Ms. Sweta Arun Bokade"
},


{
title:"Faculty Meeting",
date:"20 August 2026",
type:"Meeting",
person:"AIML Department Faculty"
},


{
title:"Student Research Discussion",
date:"25 August 2026",
type:"Research",
person:"Dr. Bhushan Mahendra Manjre"
}


];



return (

<div className="p-8 bg-slate-100 min-h-screen">



<h1 className="text-3xl font-bold mb-2">

AIML Department Calendar

</h1>


<p className="text-gray-600 mb-8">

Manage meetings, events and important deadlines

</p>





<div className="grid grid-cols-3 gap-6">


{

events.map((event,index)=>(


<div

key={index}

className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"

>



<h2 className="text-xl font-bold text-blue-700">

{event.title}

</h2>



<div className="mt-4 space-y-2">


<p>

📅 <b>Date:</b> {event.date}

</p>



<p>

📌 <b>Type:</b> {event.type}

</p>



<p>

👤 <b>Responsible:</b>

<br/>

{event.person}

</p>



</div>



<button className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg">

View Details

</button>



</div>


))


}



</div>







<div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow p-6">


<h2 className="text-2xl font-bold">

🤖 HieraSync AI Calendar Assistant

</h2>



<p className="mt-3">

AI predicts upcoming deadlines and recommends scheduling project reviews before important activities.

</p>



</div>




</div>

);


}