import { useState, useEffect } from "react";
import { employeesApi } from "../api";
import { EmployeeResponse } from "../types";


export default function Employees() {


const [search,setSearch] = useState("");
const [selectedFaculty,setSelectedFaculty] = useState<EmployeeResponse | null>(null);
const [facultyList, setFacultyList] = useState<EmployeeResponse[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const data = await employeesApi.getAll();
      setFacultyList(data);
    } catch (err: any) {
      setError(err.message || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  };
  fetchEmployees();
}, []);



const filteredFaculty = facultyList.filter((faculty)=>

faculty.name.toLowerCase()
.includes(search.toLowerCase())

);



return (


<div className="p-8 bg-blue-50 min-h-screen">



<h1 className="text-4xl font-bold text-gray-800">

AIML Faculty Management

</h1>


<p className="text-gray-500 mt-2 mb-8">

Artificial Intelligence & Machine Learning Department Faculty

</p>






<div className="bg-white p-4 rounded-2xl shadow mb-8">


<input

className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-400"

placeholder="🔍 Search Faculty..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>


</div>







<div className="grid grid-cols-3 gap-6">


{loading && <div className="col-span-3 text-center text-lg text-gray-500 py-10">Loading employees...</div>}
{error && <div className="col-span-3 text-center text-lg text-red-500 py-10">{error}</div>}

{
!loading && !error && filteredFaculty.length === 0 && (
  <div className="col-span-3 text-center text-lg text-gray-500 py-10">No employees found.</div>
)}

{
!loading && !error &&
filteredFaculty.map((faculty,index)=>(



<div

key={index}

className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl hover:-translate-y-2 transition"

>



<div className="flex items-center gap-4">


<div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white flex items-center justify-center text-3xl font-bold">

{faculty.name.charAt(0)}

</div>



<div>

<h2 className="font-bold text-blue-700">

{faculty.name}

</h2>


<span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">

Faculty

</span>


</div>


</div>






<p className="mt-5">

<b>Designation</b>

<br/>

{faculty.designation}

</p>




<p className="mt-4 text-gray-600">

<b>Expertise</b>

<br/>

{faculty.area_of_interest || "Not Available"}

</p>





<button

onClick={()=>setSelectedFaculty(faculty)}

className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"

>

View Profile

</button>




</div>



))


}



</div>








{
selectedFaculty && (


<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


<div 
  className="bg-white w-[500px] rounded-3xl p-8 shadow-xl"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>



<div className="flex justify-between">


<h2 id="modal-title" className="text-2xl font-bold text-blue-700">

Faculty Profile

</h2>


<button

onClick={()=>setSelectedFaculty(null)}

className="text-red-500 text-2xl"
aria-label="Close profile modal"

>

×

</button>


</div>





<div className="mt-6 space-y-4">


<h3 className="text-xl font-bold">

{selectedFaculty.name}

</h3>



<p>
<b>Designation:</b><br/>
{selectedFaculty.designation}
</p>



<p>
<b>Area of Interest:</b><br/>
{selectedFaculty.area_of_interest || "Not Available"}
</p>



<p>
<b>Joining Date:</b><br/>
{selectedFaculty.joining_date || "Not Available"}
</p>



<p>
<b>Association:</b><br/>
{selectedFaculty.association || "Not Available"}
</p>



<p>
<b>Email:</b><br/>
{selectedFaculty.email}
</p>



</div>





<button

onClick={()=>setSelectedFaculty(null)}

className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl"

>

Close Profile

</button>



</div>



</div>


)

}



</div>


);

}