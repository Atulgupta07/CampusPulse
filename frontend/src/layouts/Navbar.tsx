import {
  FaSearch,
  FaBell,
  FaUserCircle
} from "react-icons/fa";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { searchApi } from "../api";
import { FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [search,setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };



  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }
    
    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await searchApi.globalSearch(search);
        setResults(data.results || []);
      } catch (err) {
        console.error("Search error", err);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);





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

<div className="absolute top-14 left-0 w-96 bg-white rounded-xl shadow-xl border z-50 max-h-96 overflow-y-auto">

{
  isSearching ? (
    <div className="p-4 text-gray-500 text-center">Searching...</div>
  ) : results.length > 0 ? (
    results.map((item,index)=>(
      <div
        key={item.id || index}
        onClick={() => {
           setSearch(""); // clear on select
           // Route according to type, simplistic mapping:
           if(item.type === 'faculty') navigate('/employees');
           else if(item.type === 'task') navigate('/tasks');
           else if(item.type === 'event') navigate('/calendar');
           else if(item.type === 'notification') navigate('/notifications');
           else navigate('/dashboard');
        }}
        className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 flex flex-col"
      >
        <span className="font-bold">{item.title}</span>
        <span className="text-xs text-gray-400 capitalize">{item.type}</span>
      </div>
    ))
  ) : (
    <div className="p-4 text-gray-500 text-center">No Result Found</div>
  )
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



<div className="flex items-center gap-3 bg-white shadow-sm px-4 py-2 rounded-xl group relative">



<FaUserCircle className="text-4xl text-blue-600"/>




<div>


<h3 className="font-bold text-gray-700">

{user?.name || "User"}

</h3>



<p className="text-sm text-gray-500">

{user?.role || "Faculty"}

</p>



</div>

{/* Logout Dropdown/Button */}
<button 
  onClick={handleLogout}
  className="hidden group-hover:flex absolute right-0 top-full mt-2 bg-white border border-red-100 text-red-600 px-4 py-2 rounded-lg shadow-lg items-center gap-2 hover:bg-red-50 z-50 whitespace-nowrap"
>
  <FaSignOutAlt />
  Logout
</button>


</div>





</div>





</div>


);


}