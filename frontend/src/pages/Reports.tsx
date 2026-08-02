export default function Reports() {


const data = [

{
title:"Total Tasks",
value:"36",
desc:"Department activities"
},

{
title:"Completed Tasks",
value:"24",
desc:"66% completion rate"
},

{
title:"Faculty Active",
value:"14",
desc:"AIML Department"
},

{
title:"AI Efficiency",
value:"92%",
desc:"Workflow optimization"
}


];




return (


<div className="p-8 bg-slate-100 min-h-screen">


<h1 className="text-3xl font-bold mb-2">

Department Reports

</h1>


<p className="text-gray-600 mb-8">

AI generated workflow and performance analysis

</p>





{/* Cards */}


<div className="grid grid-cols-4 gap-6">



{

data.map((item,index)=>(


<div

key={index}

className="bg-white rounded-2xl shadow p-6"

>


<h2 className="text-gray-600">

{item.title}

</h2>



<h1 className="text-4xl font-bold text-blue-600 mt-3">

{item.value}

</h1>



<p className="mt-2 text-gray-500">

{item.desc}

</p>



</div>


))


}



</div>






{/* Report Section */}



<div className="mt-8 grid grid-cols-2 gap-6">



<div className="bg-white rounded-2xl shadow p-6">


<h2 className="text-2xl font-bold mb-4">

📈 Workflow Analysis

</h2>



<ul className="space-y-3">


<li>
✅ 24 tasks completed successfully
</li>


<li>
⚡ 8 tasks are in progress
</li>


<li>
⏳ 4 tasks waiting for approval
</li>


<li>
🤖 AI detected improved productivity
</li>


</ul>



</div>







<div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow p-6">


<h2 className="text-2xl font-bold">

🤖 HieraSync AI Report

</h2>



<p className="mt-4">

AI analysis shows AIML department workflow efficiency is high. Priority should be given to pending approvals and upcoming project reviews.

</p>




<button className="mt-6 bg-white text-blue-700 px-5 py-2 rounded-lg font-semibold">

Generate Full Report

</button>



</div>




</div>




</div>


);


}