import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router'
import { authentication } from '../services/api'
import { Flip, toast, ToastContainer, Zoom } from 'react-toastify'
import { ClipLoader } from "react-spinners";

const Register = () => {

    const[fromData  ,setFromdata] =useState({
        email: null,
        password: null,
        role: "ADMIN",
        username: null,
        confirmpasword:null,
    })

    
    const[loader,setLoader] =useState(false)
   console.log(fromData)

   const navigate =useNavigate("")

   const [allerror ,setAllerror] =useState({
      usernameerror:"border-blue-400",
      emailerror:"border-blue-400",
      passworderror:"border-blue-400",
      confirmpassworderror:"border-blue-400"
   })


   const handleregsiter =async(e)=>{
     setLoader(true)
    e.preventDefault();
    if(!fromData.username){
        setAllerror((prev)=> ({...prev , usernameerror:"border-red-400"}))
    }
     if(!fromData.email){
        setAllerror((prev)=> ({...prev , emailerror:"border-red-400"}))
    }
     if(!fromData.password){
        setAllerror((prev)=> ({...prev , passworderror:"border-red-400"}))
    }

     if(!fromData.confirmpasword)
        return setAllerror((prev)=> ({...prev , confirmpassworderror:"border-red-400"}))
    
    
     if(fromData.password != fromData.confirmpasword)
       return setAllerror((prev)=> ({...prev , passworderror:"border-red-400" ,confirmpassworderror:"border-red-400"}))

     


     const payload = {
        username:fromData.username,
        email:fromData.email,
        password:fromData.password,
        role: "ADMIN",
     }
     
    
      try{
         
           const res = await authentication.registerUser( payload);
          toast.success('Registration Success!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
});
  
         
     
       console.log("toas")
       navigate("/login")
   
          setLoader(false)
    }  
    catch(err){
          console.log(err)
           toast.error('🦄 Wow so easy!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
          });
       } 
      

   

    

   

    


   }



  return (
    <>

      <div className=" w-full min-h-screen flex justify-center items-center">
      

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Register
        </h2>

        {/* form inputs */}
        <form  onSubmit={handleregsiter} className="space-y-5">

          {/* username */}

          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-blue-300" />
            <input  onChange={
                (e)=> {
                    setFromdata((prev)=>({...prev , username:e.target.value})),
                setAllerror((prev)=>({...prev , usernameerror:"border-blue-400"}))
                }
            }
         
              type="text"
              name="username"
              placeholder="Username"
              className={`pl-10 pr-4 py-2 w-full border ${allerror.usernameerror}  rounded focus:outline-none focus:ring-2
              focus:ring-blue-200  text-blue-700`}
             
            />
          </div>

          {/* email input */}

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-blue-300" />
            <input  onChange={
                (e)=> {
                setFromdata((prev)=>({...prev , email:e.target.value})),
                setAllerror((prev)=>({...prev , emailerror:"border-blue-400"}))
             }
            }
             

            
            
              type="email"
              name="email"
              placeholder="Email"
              className={`pl-10 pr-4 py-2 w-full border ${allerror.emailerror} rounded focus:outline-none focus:ring-2
              focus:ring-blue-200  text-blue-700`}
              
            />
          </div>
          {/* password input */}

          <div className="relative">
            <FaLock
             className="absolute left-3 top-3 text-blue-300" />
            <input onChange={
                (e)=> ( setFromdata((prev)=>({...prev , password:e.target.value})) , 
                setAllerror((prev)=>({...prev , passworderror:"border-blue-400"})) )
            }
       
            
              type="password"
              name="password"
              placeholder="Password"
              className={`pl-10 pr-4 py-2 w-full border ${allerror.passworderror} rounded focus:outline-none focus:ring-2
              focus:ring-blue-200  text-blue-700`}
              
            />
          </div>

          {/* Confirm password input */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-blue-300" />
            <input onChange={(e)=>(
             setFromdata((prev)=>({...prev , confirmpasword:e.target.value})),
             setAllerror((prev)=>({...prev , confirmpassworderror:"border-blue-400"}))
            )
          }

              
            
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={`pl-10 pr-4 py-2 w-full border ${allerror.confirmpassworderror}  rounded focus:outline-none focus:ring-2
              focus:ring-blue-200  text-blue-700`}
             
            />
          </div>
          {
            loader?  <div
               
                className="w-full bg-blue-200 text-blue-700 py-2 rounded text-center hover:bg-blue-300 transition font-semibold"
            >
                <ClipLoader size={20}/>
            </div>:
          

            <button
                type="submit"
                className="w-full bg-blue-200 text-blue-700 py-2 rounded hover:bg-blue-300 transition font-semibold"
            >
                Register
            </button>
          }
          
      


          

         
       
         
        </form>

        <div className="mt-6 text-center">
          <span className="text-blue-500">Already have an account?</span>
          <Link to={'/login'}
            type="submit"
            className="ml-2 text-blue-700 px-4 py-1 rounded hover:bg-blue-200 transition font-medium"
          >
            Log In
          </Link>
        </div>
      </div>
      </div>
    </>
  )
}

export default Register;