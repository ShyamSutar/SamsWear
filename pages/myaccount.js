import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { userAgent } from "next/server";

const Myaccount = ({
  removeFromCart,
  subTotal,
  addToCart,
  cart,
  clearCart,
}) => {

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    pincode: "",
    currentpassword: "",
    npassword: "",
    cpassword: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Router.push("/");
    }
    fetchData(localStorage.getItem("token"))
  }, []);

  const fetchData = async(token) => {
    const { name, email, address, phone, pincode } = credentials;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      }
    );

    const json = await response.json();
    console.log(json);
    setCredentials({name: json.name,
      pincode: json.pincode,
      email: json.email,
      address: json.address,
      phone: json.phone,
      currentpassword: "",
      npassword: "",
      cpassword: ""})
  }




  const onChange = async (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  };

  const handlePassword = async (e) => {
    e.preventDefault();
    const { name, email, address, phone, pincode } = credentials;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          currentpassword:credentials.currentpassword,
          npassword:credentials.npassword,
          cpassword: credentials.cpassword,
        }),
      }
    );

    const json = await response.json();
    console.log(json);

    setCredentials({name: json.name,
      pincode: json.pincode,
      email: json.email,
      address: json.address,
      phone: json.phone,
      currentpassword: "",
      npassword: "",
      cpassword: ""})

    if (json.success) {
      toast.success("Successfully updated", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      
    } else {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, address, phone, pincode } = credentials;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/updateuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          address,
          name,
          phone,
          pincode
        }),
      }
    );

    const json = await response.json();
    console.log(json);

    if (json.success) {
      toast.success("Successfully Updated", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
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
    <div className="container mx-auto">
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
      <h1 className="text-3xl text-center my-9 font-bold">
        Update your Account
      </h1>

      <h2 className="text-xl font-semibold">1. Delivery Details</h2>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                onChange={onChange}
                value={credentials.name}
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email (cannot be updated)
              </label>

              <input
                onChange={onChange}
                value={credentials.email}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>

        <div className="px-2 w-full">
          <div className="mb-4">
            <label
              htmlFor="address"
              className="leading-7 text-sm text-gray-600"
            >
              Address
            </label>

            <textarea
              onChange={onChange}
              value={credentials.address}
              cols="30"
              rows="2"
              id="address"
              name="address"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
        </div>

        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone
              </label>
              <input
                onChange={onChange}
                pattern="\d*"
                minLength={10}
                maxLength={10}
                value={credentials.phone}
                type="phone"
                id="phone"
                name="phone"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="pincode"
                className="leading-7 text-sm text-gray-600"
              >
                Pincode
              </label>
              <input
                minLength={6}
                maxLength={6}
                onChange={onChange}
                value={credentials.pincode}
                type="text"
                pattern="\d*"
                id="pincode"
                name="pincode"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>

        <div className="">
          <button className="flex m-2 text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base items-center">
            Submit
          </button>
        </div>
      </form>

      <h2 className="text-xl font-semibold mt-6">1. Change Password</h2>

      <form method="POST" onSubmit={handlePassword}>
        
          <div className="mx-auto flex my-2">
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="currentpassword"
                  className="leading-7 text-sm text-gray-600"
                >
                  Current Password
                </label>
                <input
                  onChange={onChange}
                  value={credentials.currentpassword}
                  type="password"
                  id="currentpassword"
                  name="currentpassword"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="npassword"
                  className="leading-7 text-sm text-gray-600"
                >
                  New Password
                </label>
                <input
                  onChange={onChange}
                  value={credentials.npassword}
                  type="password"
                  id="npassword"
                  name="npassword"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="cpassword"
                  className="leading-7 text-sm text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  onChange={onChange}
                  value={credentials.cpassword}
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className="">
          <button className=" flex m-2 text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base items-center">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};


export default Myaccount;
