import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { AiOutlineShoppingCart, AiFillCloseCircle } from "react-icons/ai";

const Navbar2 = () => {
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  const ref = useRef();

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center shadow-md">
      

      <div className="logo flex items-center mx-5 mt-2 md:mt-0">
      <Link href={"/"}>
            <Image
            src="/logo.png"
            className="cursor-pointer m-4 mr-3 h-6 sm:h-9"
            height={25}
            width={120}
            alt="Flowbite Logo"
          /></Link>
      </div>

      <div className="nav py-4">
        <ul className="flex items-center space-x-4 font-sans  text-base md:text-lg ">
          <Link href={"tshirts"}><a><li className="hover:text-blue-700">Tshirts</li></a></Link>
          <Link href={"hoodies"}><a><li className="hover:text-blue-700">Hoodies</li></a></Link>
          <Link href={"stickers"}><a><li className="hover:text-blue-700">Stickers</li></a></Link>
          <Link href={"mugs"}><a><li className="hover:text-blue-700">Mugs</li></a></Link>
        </ul>
      </div>

      <div className="cart cursor-pointer absolute right-1 top-2 md:right-2 md:top-4">
        <AiOutlineShoppingCart className="text-3xl text-center mx-auto" onClick={toggleCart}/>
      </div>

      <div ref={ref} className="sidecart absolute top-0 right-0 bg-pink-100 py-10 px-8 z-10 w-72 tansform transition-transform translate-x-full ">

      <h2 className="font-bold text-xl text-center">Shopping Cart</h2>

      <span  className="absolute top-2 right-2 cursor-pointer text-2xl text-pink-500"><AiFillCloseCircle onClick={toggleCart}/></span>
      
      <ul className="list-decimal font-semibold">
        <li>
          <div className="item flex my-5">
          <div className="w-2/3 font-semibold">Tshirts - Wear the Code</div>
          <div className="flex items-center justify-center w-1/3 font-semibold">1</div>
          </div>
        </li>
      </ul>
      
    </div>
    </div>
  );
};

export default Navbar2;
