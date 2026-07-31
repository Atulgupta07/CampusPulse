import { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";


export default function Chatbot() {


const [open,setOpen] = useState(false);


const messages = [

{
user:"How many pending approvals are there?",
ai:"There are 6 pending approvals. AI recommends reviewing project approvals first."
},


{
user:"Which tasks are high priority?",
ai:"AI detected AI Lab Maintenance and Project Review as high priority activities."
},


{
user:"Give department summary",
ai:"AIML Department has 14 faculty members, 24 active tasks and 85% workflow efficiency."
}


];



return (


<>

{/* Floating Button */}


<button

onClick={()=>setOpen(!open)}

className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl"

>

{

open ?

<FaTimes size={22}/>

:

<FaRobot size={22}/>

}


</button>






{
open &&


<div className="fixed bottom-20 right-6 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden">



<div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">


<h2 className="text-xl font-bold">

🤖 HieraSync AI Assistant

</h2>


<p className="text-sm">

AIML Department Support

</p>


</div>






<div className="p-4 space-y-4 h-96 overflow-y-auto">


{

messages.map((msg,index)=>(


<div key={index}>


<div className="bg-gray-100 rounded-lg p-3">

<b>
You:
</b>

<br/>

{msg.user}

</div>




<div className="bg-blue-100 rounded-lg p-3 mt-2">

<b>
AI:
</b>

<br/>

{msg.ai}

</div>



</div>


))


}


</div>





<div className="border-t p-3">


<input

placeholder="Ask HieraSync AI..."

className="w-full border rounded-lg p-3 outline-none"

/>


</div>




</div>


}



</>


);

}