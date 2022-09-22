import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from 'next/router'

const Signup = () => {
  // const [name, setname] = useState('');
  // const [email, setemail] = useState('');
  // const [password, setpassword] = useState('');

  useEffect(() => {
    if(localStorage.getItem('token')){
      Router.push('/')
    }
  }, [])

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email:email.toLowerCase(), password }),
    });

    const json = await response.json();
    console.log(json);

    setCredentials({ name: "", email: "", password: "" });

    toast.success("Your account has been created", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
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
      <h2 className="text-center text-3xl font-extrabold">
        Sign un for an account
      </h2>
      <div className="text-center text-sm text-gray-600">
        Or
        <Link href={"/login"}>
          <a className="font-medium text-indigo-600 hover:text-indigo-500">
            {" "}
            Login
          </a>
        </Link>
      </div>
      <form onSubmit={handleSubmit} method="POST">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600"
              value={credentials.name}
              id="name"
              type="text"
              name="name"
              placeholder="name"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600"
              value={credentials.email}
              id="email"
              type="email"
              name="email"
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
              name="password"
              onChange={onChange}
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-600 mb-3"
              value={credentials.password}
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
