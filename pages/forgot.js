import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

const Forgot = () => {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [cpassword, setcpassword] = useState("")

  const onChange = async(e) => {
    if(e.target.name == 'password'){
      setpassword(e.target.value)
    }
    if(e.target.name == 'cpassword'){
      setcpassword(e.target.value)
    }
    if(e.target.name == 'email'){
      setemail(e.target.value)
    }
  }

  let Router = useRouter()

  useEffect(() => {
    if(localStorage.getItem('token')){
      Router.push('/')
    }
  }, [])

  const sendResetEmail = async() => {
    let data = {
      email,
      sendMail:true,
      token: localStorage.getItem('token')
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/forgot`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const res = await response.json();

    if(res.success){
      console.log("Password reset intructions have been sent");
    }else{
      console.log("Error");
    }
  }

  const resetPassword = async() => {
    let data = {
      email,
      sendMail:false,
      token: localStorage.getItem('token')
    }

    if(password == cpassword){

    let data = {
      password,
      sendMail:true
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/forgot`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const res = await response.json();

    if(res.success){
      console.log("Password has been changed");
    }else{
      console.log("Error");
    }
  }else{
    console.log("error");
  }
  }

  return (
    <div className="container -mt-12 mx-auto flex flex-col justify-center h-[100vh]">
        <h2 className="text-center text-3xl font-extrabold">
          Forgot Password
        </h2>
        <div className="text-center text-sm text-gray-600">
          Or
          <Link href={"/login"}><a className="font-medium text-indigo-600 hover:text-indigo-500">
            {" "}
            Login
          </a></Link>
        </div>
    {Router.query.token && <div>
      
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
       

       <div className="mb-4">
         <label
           className="block text-gray-600 text-sm font-bold mb-2"
           htmlFor="password"
         >
           New Password
         </label>
         <input
         onChange={onChange}
         value={password}
           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600"
           name='password'
           id="password"
           type="password"
           placeholder="New Password"
         />
       </div>

       <div className="mb-4">
         <label
           className="block text-gray-600 text-sm font-bold mb-2"
           htmlFor="cpassword"
         >
           Confirm Password
         </label>
         <input
         onChange={onChange}
         value={cpassword}
           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600"
           name='cpassword'
           id="cpassword"
           type="password"
           placeholder="Confirm Password"
         />
       </div>

       
       <div className="flex items-center justify-between">
         <button
          onClick={resetPassword}
           className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
           type="submit"
         >
           Continue
         </button>
        
       </div>
     </div>
     {password != cpassword && <span className='text-red-600'>Passwords do not match</span>}
     {password && password == cpassword && <span className='text-green-600'>Passwords Matched</span>}
        
    </div>}
    {!Router.query.token && 
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
       

       <div className="mb-4">
         <label
           className="block text-gray-600 text-sm font-bold mb-2"
           htmlFor="email"
         >
           Email
         </label>
         <input
         onChange={onChange}
         value={email}
           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600"
           id="email"
           name='email'
           type="email"
           placeholder="Email"
         />
       </div>

       
       <div className="flex items-center justify-between">
         <button
           className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
           onClick={sendResetEmail}
           type="submit"
         >
           Continue
         </button>
        
       </div>
     </div>}
      </div>
  )
}

export default Forgot