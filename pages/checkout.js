import Head from "next/head";
import Link from "next/link";
import React,{useState} from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import Router from 'next/router'
import { ToastContainer, toast } from "react-toastify";

const Checkout = ({removeFromCart, subTotal, addToCart, cart,clearCart}) => {

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    pincode: "",
  });

  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  
  // const [disabled, setdisabled] = useState(false)

  const onChange = async(e) => {

    

    setCredentials({ ...credentials, [e.target.name]: e.target.value });

    if(e.target.name == 'pincode'){
      if(e.target.value.length == 6){
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinJson = await pins.json();
        if(Object.keys(pinJson).includes(e.target.value)){
          setcity(pinJson[e.target.value][0])
          setstate(pinJson[e.target.value][1])
          console.log(state);
        }else{
          setcity('')
          setstate('')
        }
      }else{
        setcity('')
        setstate('')
      }
    }
    
    // if(credentials.name == "" && credentials.email == "" && credentials.address == "" && credentials.phone == "" && city == "" && state == "" && credentials.pincode == ""){
    //   setdisabled(false)
    // }if(credentials.name != "" && credentials.email != "" && credentials.address != "" && credentials.phone != "" && city != "" && state != "" && credentials.pincode != ""){
    //   setdisabled(true)
    // }

    // if(!credentials.name){
    //   setdisabled(true)
    // }else if(credentials.name){
    //   setdisabled(true)
    // }

  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    // credentials.email.toLowerCase();
    const { name, email, address, phone, city, state, pincode } = credentials;

    // let lowerEmail = email.toLowerCase();
    let oid = Math.floor(Math.random() * Date.now());
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/postorders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:email.toLowerCase(), oid, cart, subTotal, name, address, pincode, phone}),
    });

    const json = await response.json();
    console.log(json);

    

    if(json.success){
      toast.success("Your order Successfully Placed", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCredentials({ name: "",
      email: "",
      address: "",
      phone: "",
      pincode: "" });

      setTimeout(() => {
        Router.push('/order?id='+ json.id)
        clearCart()
      }, 1000);


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


  const handlePay = () => {
    // Router.push('/order?id=' + Order._id)
  }

  return (
    <div className="container px-2 sm:mx-auto">
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
    <Head>
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
    </Head>
      <h1 className="text-3xl m-4 font-bold text-center">Checkout</h1>

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
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
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
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
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
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              onChange={onChange}
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
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
              Pincode
            </label>
            <input
              onChange={onChange}
              value={credentials.pincode}
              type="text"
              id="pincode"
              name="pincode"
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
              readOnly
              onChange={onChange}
              value={state}
              type="text"
              id="state"
              name="state"
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
              readOnly
              onChange={onChange}
              value={city}
              type="text"
              id="city"
              name="city"
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
          <div className=" font-semibold">{cart[k].name} ({cart[k].size}/{cart[k].variant}) </div>
          <div className="flex items-center justify-center w-1/3 font-semibold text-lg"><AiFillMinusCircle onClick={()=>{removeFromCart(k, 1, cart[k].name, cart[k].size, cart[k].variant)}} className="cursor-pointer  text-indigo-500"/> <span className="mx-2 text-sm">{cart[k].qty}</span> <AiFillPlusCircle onClick={()=>{addToCart(k, 1, cart[k].name, cart[k].size, cart[k].variant)}} className="cursor-pointer text-indigo-500"/></div>
          </div>
        </li>})}
      </ol>
          <span className="font-bold">SubTotal: ₹ {subTotal}</span>

       </div>

       <div className="">
          <button disabled={!credentials.name || !credentials.email || !credentials.address || !credentials.phone || !credentials.pincode} className="disabled:bg-indigo-300 flex pl-2 mt-2 text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base items-center"><BsFillBagCheckFill className="mx-2"/> Pay ₹ {subTotal}</button>
          </div>
          </form>

    </div>
  );
};

export default Checkout;