export default function Approvals() {


const approvals = [

{
title:"Final Year Project Review",
requested:"AIML Final Year Students",
assigned:"Dr. Animesh Tayal",
priority:"High",
status:"Pending"
},


{
title:"AI Lab Equipment Request",
requested:"AI Lab Coordinator",
assigned:"Mrs. Neha Gurnani",
priority:"Medium",
status:"Pending"
},


{
title:"Machine Learning Workshop Approval",
requested:"AIML Student Club",
assigned:"Ms. Sweta Arun Bokade",
priority:"Low",
status:"Approved"
},


{
title:"Research Paper Submission Review",
requested:"Student Research Team",
assigned:"Dr. Bhushan Mahendra Manjre",
priority:"High",
status:"Pending"
}


];




return (


<div className="p-8 bg-slate-100 min-h-screen">



<h1 className="text-3xl font-bold mb-2">

Department Approvals

</h1>


<p className="text-gray-600 mb-8">

Manage faculty approvals and department requests

</p>






<div className="grid grid-cols-3 gap-6">


{

approvals.map((item,index)=>(


<div

key={index}

className="bg-white rounded-2xl shadow p-6"

>


<h2 className="text-xl font-bold text-blue-700">

{item.title}

</h2>




<p className="mt-4">

<b>Requested By:</b>

<br/>

{item.requested}

</p>



<p className="mt-3">

<b>Assigned To:</b>

<br/>

{item.assigned}

</p>




<p className="mt-3">

<b>Priority:</b>


<span

className={`ml-2 font-bold

${
item.priority==="High"
?
"text-red-600"
:
item.priority==="Medium"
?
"text-orange-500"
:
"text-green-600"

}

`}

>

{item.priority}

</span>


</p>





<p className="mt-3">

<b>Status:</b>


<span className="ml-2 text-blue-600 font-semibold">

{item.status}

</span>


</p>






<div className="flex gap-3 mt-5">


<button className="bg-green-600 text-white px-4 py-2 rounded-lg">

Approve

</button>


<button className="bg-red-600 text-white px-4 py-2 rounded-lg">

Reject

</button>


</div>




</div>



))


}



</div>






<div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow p-6">


<h2 className="text-2xl font-bold">

🤖 HieraSync AI Approval Assistant

</h2>


<p className="mt-3">

AI recommends reviewing high priority project approvals first and completing pending department requests before deadlines.

</p>



</div>





</div>


);


}