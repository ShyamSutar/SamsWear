import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar2 = ({cart, addToCart, removeFromCart, clearCart, subTotal}) => {

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
      ref.current.classList.remove('hidden')
    } else if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
      ref.current.classList.add('hidden')
    }
  };

  const ref = useRef();

  return (
    <div className="sticky top-0 z-10 bg-white flex flex-col md:flex-row justify-center md:justify-start items-center shadow-md">
      

      <div className="logo flex items-center mx-5 mt-2 md:mt-0">
      <Link href={"/"}><a>
            <Image
            src="/logo.png"
            className="cursor-pointer m-4 mr-3 h-6 sm:h-9"
            height={25}
            width={120}
            alt="Flowbite Logo"
          /></a></Link>
      </div>

      <div className="nav py-4">
        <ul className="flex items-center space-x-4 font-sans  text-base md:text-lg ">
          <Link href={"/tshirts"}><a><li className="hover:text-indigo-700">Tshirts</li></a></Link>
          <Link href={"/hoodies"}><a><li className="hover:text-indigo-700">Hoodies</li></a></Link>
          <Link href={"/stickers"}><a><li className="hover:text-indigo-700">Stickers</li></a></Link>
          <Link href={"/mugs"}><a><li className="hover:text-indigo-700">Mugs</li></a></Link>
        </ul>
      </div>

      <div className="cart cursor-pointer absolute right-1 top-2 md:right-2 md:top-4 flex">
        <Link href={"/login"}><a><MdAccountCircle className="text-3xl text-center hover:text-indigo-700"/></a></Link>
        <a><AiOutlineShoppingCart className="text-3xl text-center hover:text-indigo-700 " onClick={toggleCart}/></a>
      </div>


      <div ref={ref} className={`sidecart absolute  top-0 right-0 bg-indigo-100 py-10 px-8 z-10 w-72 h-[100vh] tansform transition-transform  ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>

      <h2 className="font-bold text-xl text-center">Shopping Cart</h2>

      <span  className="absolute top-2 right-2 cursor-pointer text-2xl text-indigo-500"><AiFillCloseCircle onClick={toggleCart}/></span>
      <ol className="list-decimal font-semibold">
       {Object.keys(cart).length ==  0 && <div className="flex justify-center text-base">
         Your cart is empty
       </div>}
        {Object.keys(cart).map((k)=>{return <li key={k}>
          <div className="item flex my-5">
          <div className="w-2/3 font-semibold">{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
          <div className="flex items-center justify-center w-1/3 font-semibold text-lg"><AiFillMinusCircle onClick={()=>{removeFromCart(k, 1, cart[k].name, cart[k].size, cart[k].variant)}} className="cursor-pointer  text-indigo-500"/> <span className="mx-2 text-sm">{cart[k].qty}</span> <AiFillPlusCircle onClick={()=>{addToCart(k, 1, cart[k].name, cart[k].size, cart[k].variant)}} className="cursor-pointer text-indigo-500"/></div>
          </div>
        </li>})}
       
      </ol>
      <span className="font-bold">SubTotal: ₹ {subTotal}</span>
          <div className="flex">
            <Link href={"/checkout"}><a><button className="flex mr-2 mt-2 text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-base items-center"><BsFillBagCheckFill className="mx-2"/> Checkout</button></a></Link>
            <button onChange={clearCart} onClick={()=>{clearCart()}} className="flex mx-2 mt-2 text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-base "> Clear Cart</button>
          </div>
       </div>
    </div>
  );
};

export default Navbar2;
