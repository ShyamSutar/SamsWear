import Link from "next/link";
import Router from "next/router";
import React,{useEffect, useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

  useEffect(() => {
    if(localStorage.getItem('token')){
      Router.push('/')
    }
  }, [])
  

  const [credentials, setCredentials] = useState({
    email: "".toLowerCase(),
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // credentials.email.toLowerCase();
    const { email, password } = credentials;

    // let lowerEmail = email.toLowerCase();

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:email.toLowerCase(), password }),
    });

    const json = await response.json();
    console.log(json);

    

    if(json.success){
      localStorage.setItem('token', json.token)
      toast.success("You are successfully logged in", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCredentials({ email: "", password: "" });

      setTimeout(() => {
        Router.push('/')
      }, 1500);

    }else{
      toast.error(json.error, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  };

  return (
    <>
      <div className="container -mt-12 mx-auto flex flex-col justify-center h-[100vh]">
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form method="POST" onSubmit={handleSubmit}>
        <h2 className="text-center text-3xl font-extrabold">
          Sign in to your account
        </h2>
        <div className="text-center text-sm text-gray-600">
          Or
          <Link href={"/signup"}><a className="font-medium text-indigo-600 hover:text-indigo-500">
            {" "}
            Signup
          </a></Link>
        </div>
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
              value={credentials.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-600 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={onChange}
              value={credentials.password}
              name="password"
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-600 mb-3"
              id="password"
              type="password"
              placeholder="******************"
            />
            {/* <div className="text-red-600 text-xs italic">Please choose a password.</div> */}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Sign In
            </button>
            <Link href={"/forgot"}><a
              className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-600"
              
            >
              Forgot Password?
            </a></Link>
          </div>
        </div>
        </form>
      </div>
    </>
  );
};

export default Login;
