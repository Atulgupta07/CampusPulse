import loginImage from "../../assets/login image.jpg";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  BrainCircuit
} from "lucide-react";


export default function Login() {


  const navigate = useNavigate();


  const [showPassword,setShowPassword] = useState(false);



  const handleLogin = () => {

    navigate("/dashboard");

  };



  return (


    <div className="
    min-h-screen
    flex
    items-center
    justify-center
    bg-gradient-to-br
    from-blue-50
    via-white
    to-indigo-100
    p-6
    ">



      <div className="
      w-full
      max-w-6xl
      grid
      md:grid-cols-2
      bg-white
      rounded-3xl
      overflow-hidden
      shadow-2xl
      ">




        {/* LEFT IMAGE */}



        <div className="
        hidden
        md:flex
        flex-col
        justify-center
        items-center
        bg-gradient-to-br
        from-blue-100
        to-cyan-100
        p-10
        ">



          <img

          src={loginImage}

          alt="Education AI"

          className="
          w-full
          max-w-md
          object-contain
          "

          />



          <h2 className="
          text-3xl
          font-bold
          text-blue-700
          mt-6
          text-center
          ">

          HieraSync AI Portal

          </h2>



          <p className="
          text-gray-600
          text-center
          mt-3
          ">

          Smart Workflow Management System  
          for CSE AI & ML Department

          </p>



        </div>








        {/* LOGIN SECTION */}



        <div className="
        bg-gradient-to-br
        from-indigo-900
        via-blue-900
        to-cyan-700
        p-10
        text-white
        ">




          {/* Logo */}


          <div className="
          flex
          justify-center
          mb-5
          ">


            <div className="
            w-16
            h-16
            rounded-2xl
            bg-white/20
            backdrop-blur
            flex
            items-center
            justify-center
            ">


              <BrainCircuit size={35}/>


            </div>


          </div>





          <h1 className="
          text-4xl
          font-bold
          text-center
          ">

          HieraSync

          </h1>




          <p className="
          text-center
          text-blue-200
          mt-2
          ">

          CSE AI & ML Department Portal

          </p>







          {/* Email */}



          <div className="mt-8">


          <label className="text-sm">

          Email Address

          </label>



          <div className="
          mt-2
          flex
          items-center
          bg-white/10
          border
          border-white/30
          rounded-xl
          px-4
          ">



            <Mail size={20}/>



            <input

            type="email"

            placeholder="Enter college email"

            className="
            w-full
            bg-transparent
            outline-none
            p-4
            "

            />



          </div>


          </div>









          {/* Password */}



          <div className="mt-5">


          <label className="text-sm">

          Password

          </label>




          <div className="
          mt-2
          flex
          items-center
          bg-white/10
          border
          border-white/30
          rounded-xl
          px-4
          ">



            <Lock size={20}/>



            <input


            type={
              showPassword
              ?
              "text"
              :
              "password"
            }



            placeholder="Enter password"



            className="
            w-full
            bg-transparent
            outline-none
            p-4
            "


            />





            <button

            onClick={()=>
            setShowPassword(!showPassword)
            }

            >



            {

            showPassword

            ?

            <EyeOff/>

            :

            <Eye/>

            }



            </button>



          </div>



          </div>









          {/* Forget */}



          <div className="
          flex
          justify-between
          mt-5
          text-sm
          ">


            <label>

            <input type="checkbox"/>

            <span className="ml-2">

            Remember me

            </span>

            </label>





            <button className="
            text-cyan-200
            hover:text-white
            ">

            Forgot Password?

            </button>



          </div>









          {/* Login Button */}



          <button


          onClick={handleLogin}



          className="
          mt-8
          w-full
          py-4
          rounded-xl
          bg-white
          text-blue-800
          font-bold
          flex
          justify-center
          items-center
          gap-3
          hover:scale-105
          transition
          ">


          Login


          <ArrowRight size={20}/>



          </button>









          <p className="
          text-center
          text-xs
          text-blue-200
          mt-8
          ">


          HieraSync AI Workflow Management System


          </p>





        </div>





      </div>





    </div>


  );

}