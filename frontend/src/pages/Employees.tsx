import { useState } from "react";


export default function Employees() {


const [search,setSearch] = useState("");

const [selectedFaculty,setSelectedFaculty] = useState<any>(null);



const facultyList = [

{
name:"Dr. Animesh Tayal",
designation:"Assistant Professor & HoD",
area:"Programming Languages, DAA, Digital Image Processing",
joining:"Not Available",
association:"Regular",
email:"hodcsecm@sbjit.edu.in / animeshtayal@sbjit.edu.in"
},

{
name:"Mr. Ravindra R. Rasekar",
designation:"Assistant Professor",
area:"Programming, Networking",
joining:"Not Available",
association:"Regular",
email:"ravindrarasekar@sbjit.edu.in"
},

{
name:"Dr. Bhushan Mahendra Manjre",
designation:"Associate Professor",
area:"Artificial Intelligence, Cyber Forensics, Cloud Computing, Blockchain Technology",
joining:"Not Available",
association:"Regular",
email:"bhushanmanjre@sbjit.edu.in"
},

{
name:"Ms. Suchita Surendra Mesakar",
designation:"Associate Professor",
area:"Python, Object Oriented Programming",
joining:"Not Available",
association:"Regular",
email:"suchitamesakar@sbjit.edu.in"
},

{
name:"Ms. Sweta Arun Bokade",
designation:"Assistant Professor",
area:"Machine Learning, Blockchain Technology, Digital Forensics",
joining:"Not Available",
association:"Regular",
email:"swetabokade@sbjit.edu.in"
},

{
name:"Mr. Nitesh Lileshwar Hatwar",
designation:"Assistant Professor",
area:"Cybersecurity, Cloud Computing, Cryptography and Network Security, AI",
joining:"Not Available",
association:"Regular",
email:"niteshhatwar@sbjit.edu.in"
},

{
name:"Mr. Nikhil Sakhare",
designation:"Assistant Professor",
area:"Computer Networks, Security, Cyber Security",
joining:"29/08/2023",
association:"Regular",
email:"nikhilsakhare@sbjit.edu.in"
},

{
name:"Mrs. Neha Gurnani",
designation:"Assistant Professor",
area:"ML, Python, Power BI, Tableau, C, TOC, OS",
joining:"Not Available",
association:"Regular",
email:"nehagurnani@sbjit.edu.in"
},

{
name:"Mrs. Mayuri Getme",
designation:"Assistant Professor",
area:"Python, Machine Learning, Image Processing",
joining:"04/08/2022",
association:"Regular",
email:"mayurigetme@sbjit.edu.in"
},

{
name:"Ms. Sujata D. Sardare",
designation:"Assistant Professor",
area:"Python",
joining:"06/12/2024",
association:"Regular",
email:"sujatasardare@sbjit.edu.in"
},

{
name:"Ms. Swati Kamalsingh Thakur",
designation:"Assistant Professor",
area:"Machine Learning, Data Structure, Operating System, Blockchain",
joining:"19/05/2025",
association:"Regular",
email:"swatithakur@sbjit.edu.in"
},

{
name:"Mrs. Snehal Pawar",
designation:"Teaching Assistant",
area:"Networking",
joining:"06/12/2024",
association:"Regular",
email:"snehalpawar@sbjit.edu.in"
},

{
name:"Mr. Viveksingh Chauhan",
designation:"Teaching Assistant (Trainer)",
area:"DSA, Generative AI, Prompt Engineering, Java, TOC",
joining:"03/02/2023",
association:"Contractual",
email:"vivekchauhan@sbjit.edu.in"
},

{
name:"Ms. Harshika Dehariya",
designation:"Teaching Assistant (Trainer)",
area:"C++, Java",
joining:"02/01/2025",
association:"Regular",
email:"harshikadehariya@sbjit.edu.in"
}

];



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



{

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

{faculty.area}

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


<div className="bg-white w-[500px] rounded-3xl p-8 shadow-xl">



<div className="flex justify-between">


<h2 className="text-2xl font-bold text-blue-700">

Faculty Profile

</h2>


<button

onClick={()=>setSelectedFaculty(null)}

className="text-red-500 text-2xl"

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
{selectedFaculty.area}
</p>



<p>
<b>Joining Date:</b><br/>
{selectedFaculty.joining}
</p>



<p>
<b>Association:</b><br/>
{selectedFaculty.association}
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