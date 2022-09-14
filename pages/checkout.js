import Link from "next/link";
import React from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = ({removeFromCart, subTotal, addToCart, cart}) => {
  return (
    <div className="container px-2 sm:mx-auto">
      <h1 className="text-3xl m-4 font-bold text-center">Checkout</h1>

      <h2 className="text-xl font-semibold">1. Delivery Details</h2>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
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
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
          </label>

          <textarea
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
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold">2. Review Cart Items & Pay</h2>

      <div className="sidecart bg-indigo-100 py-10 px-8 z-10 mt-4">
      
      <ol className="list-decimal font-semibold">
       {Object.keys(cart).length ==  0 && <div className="flex justify-center text-base">
         Your cart is empty
       </div>}
        {Object.keys(cart).map((k)=>{return <li key={k}>
          <div className="item flex">
          <div className=" font-semibold">{cart[k].name}</div>
          <div className="flex items-center justify-center w-1/3 font-semibold text-lg"><AiFillMinusCircle onClick={()=>{removeFromCart(k, 1, cart[k].name, cart[k].size, cart[k].variant)}} className="cursor-pointer  text-indigo-500"/> <span className="mx-2 text-sm">{cart[k].qty}</span> <AiFillPlusCircle onClick={()=>{addToCart(k, 1, cart[k].name, cart[k].size, cart[k].variant)}} className="cursor-pointer text-indigo-500"/></div>
          </div>
        </li>})}
      </ol>
          <span className="font-bold">SubTotal: ₹ {subTotal}</span>

       </div>

       <div className="">
          <button className="flex pl-2 mt-2 text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base items-center"><BsFillBagCheckFill className="mx-2"/> Pay ₹ {subTotal}</button>
          </div>

    </div>
  );
};

export default Checkout;
