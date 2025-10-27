import React, { useState } from 'react'
import { Link } from 'react-router'
import { authentication } from '../services/api'
import { Flip, toast, ToastContainer } from 'react-toastify'

const Login = () => {

     const[fromData  ,setFromdata] =useState({
            password: null,
           username: null
       })

     const [allerror ,setAllerror] =useState({
             usernameerror:"border-blue-400",
             passworderror:"border-blue-400",
      })


        const handleLogin =(e)=>{
      
          e.preventDefault();
          if(!fromData.username){
              setAllerror((prev)=> ({...prev , usernameerror:"border-red-400"}))
          }
         
           if(!fromData.password)
             return setAllerror((prev)=> ({...prev , passworderror:"border-red-400"}))
          
      
         
      
      
           const payload = {
              username:fromData.username,
              password:fromData.password,
           }
           
           try{
               
               
               const res =authentication.loginUser( payload);
      
      
              console.log("Login Success",res);
              toast.success('Login Success', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Flip,
      
          });
      
     
          
      
         
      
           }catch(err){
              console.log(err)
            toast.error('Login failed', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Flip,
      
          });
      
           } 
          
          
          
          
      
      
         }
      



  return (
    <>
    <div className="w-full h-screen flex justify-center items-center">
         <ToastContainer />
    <div
    className="w-90 rounded-lg shadow h-[380px] p-6 bg-white relative overflow-hidden"
    >
    <div class="flex flex-col justify-center items-center space-y-6">
        <h2 className="text-2xl font-medium text-slate-700">Login</h2>
        <p className="text-slate-500">Enter details below.</p>
    </div>
    <form  onSubmit={handleLogin} class="w-full mt-4 space-y-8 ">
        <div>
        <input  onChange={
                (e)=> {
                    setFromdata((prev)=>({...prev , username:e.target.value})),
                setAllerror((prev)=>({...prev , usernameerror:"border-blue-400"}))
                }}
            className={`outline-none border-2 rounded-md px-2 py-1 ${allerror.usernameerror} text-slate-500 w-full
             focus:border-blue-300`}
            placeholder="Username"
            id="username"
            name="username"
            type="text"
        />
        </div>
        <div>
        <input  onChange={
                (e)=> {
                    setFromdata((prev)=>({...prev , password:e.target.value})),
                setAllerror((prev)=>({...prev , passworderror:"border-blue-400"}))
                }}
            className= {`outline-none border-2 rounded-md px-2 py-1 ${allerror.passworderror} text-slate-500 w-full
             focus:border-blue-300`}
            placeholder="Password"
            id="password"
            name="password"
            type="password"
        />
        </div>
    
        <button
        className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2"
        id="login"
        name="login"
        type="submit"
        >
        login
        </button>
        <p className="flex justify-center space-x-1 pb-4">
        <span className="text-slate-700"> Have an account? </span>
        <Link className="text-blue-500 hover:underline" to={"/"}>Sign Up</Link>
        </p>
    </form>
    </div>
    </div>

    </>
  )
}

export default Login
