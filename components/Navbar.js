import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import Script from "next/script";
import { useRouter } from "next/router";

const Navbar2 = ({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  user,
  logout,
}) => {
  const [dropdown, setdropdown] = useState(false);
  const [sidebar, setsidebar] = useState(false);

  const router = useRouter();

  useEffect(() => {
    Object.keys(cart).length !== 0 && setsidebar(true);

    if (
      router.pathname == "/checkout" ||
      router.pathname == "/orders" ||
      router.pathname == "/order" ||
      router.pathname == "/myaccount"
    ) {
      setsidebar(false);
    }
  }, []);

  const toggleCart = () => {
    setsidebar(!sidebar);
  };

  const ref = useRef();

  return (
    <div className="navigation2">
      <div>
        {dropdown && (
          <div
            onMouseOver={() => {
              setdropdown(true);
            }}
            onMouseLeave={() => {
              setdropdown(false);
            }}
            className="fixed right-12 shadow-lg bg-white border top-11 py-4 rounded-md px-5 w-32 z-30"
          >
            <ul>
              <Link href={"/myaccount"}>
                <a>
                  <li className="py-1 hover:text-indigo-700 text-sm">
                    My Account
                  </li>
                </a>
              </Link>
              <Link href={"/orders"}>
                <a>
                  <li className="py-1 hover:text-indigo-700 text-sm">Orders</li>
                </a>
              </Link>
              <a>
                <li
                  onClick={logout}
                  className="cursor-pointer py-1 hover:text-indigo-700 text-sm"
                >
                  Logout
                </li>
              </a>
            </ul>
          </div>
        )}
      </div>

      <div
        className={`sticky top-0 z-10 bg-white flex flex-col md:flex-row justify-center md:justify-start items-center shadow-md ${
          !sidebar && "overflow-hidden"
        }`}
      >
        <div className="logo flex items-center mx-5 mt-2 md:mt-0">
          <Link href={"/"}>
            <a>
              <Image
                src="/logo.png"
                className="cursor-pointer m-4 mr-3 h-6 sm:h-9"
                height={25}
                width={120}
                alt="Flowbite Logo"
              />
            </a>
          </Link>
        </div>

        <div className="nav py-4">
          <ul className="flex items-center space-x-4 font-sans  text-base md:text-lg ">
            <Link href={"/tshirts"}>
              <a>
                <li className="hover:text-indigo-700">Tshirts</li>
              </a>
            </Link>
            <Link href={"/hoodies"}>
              <a>
                <li className="hover:text-indigo-700">Hoodies</li>
              </a>
            </Link>
            <Link href={"/stickers"}>
              <a>
                <li className="hover:text-indigo-700">Stickers</li>
              </a>
            </Link>
            <Link href={"/mugs"}>
              <a>
                <li className="hover:text-indigo-700">Mugs</li>
              </a>
            </Link>
          </ul>
        </div>

        <div className="cart cursor-pointer absolute right-1 top-2 md:right-2 md:top-4 flex">
          <Link href={"/login"}>
            <a>
              {!user.value && (
                <button className="flex mx-2 text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-base ">
                  Login
                </button>
              )}
            </a>
          </Link>
          <span
            onMouseOver={() => {
              setdropdown(true);
            }}
            onMouseLeave={() => {
              setdropdown(false);
            }}
          >
            {user.value && (
              <MdAccountCircle className="text-3xl text-center hover:text-indigo-700" />
            )}
          </span>
          <a>
            <AiOutlineShoppingCart
              className="text-3xl text-center hover:text-indigo-700 "
              onClick={toggleCart}
            />
          </a>
        </div>

        <div
          ref={ref}
          className={`sidecart overflow-y-scroll absolute top-0 bg-indigo-100 py-10 px-8 z-10 w-96 h-[100vh] transition-all  ${
            sidebar ? "right-0" : "-right-96"
          }`}
        >
          <h2 className="font-bold text-xl text-center">Shopping Cart</h2>

          <span className="absolute top-2 right-2 cursor-pointer text-2xl text-indigo-500">
            <AiFillCloseCircle onClick={toggleCart} />
          </span>
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length == 0 && (
              <div className="flex justify-center text-base">
                Your cart is empty
              </div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-5">
                    <div className="w-2/3 font-semibold">
                      {cart[k].name} ({cart[k].size}/{cart[k].variant})
                    </div>
                    <div className="flex items-center justify-center w-1/3 font-semibold text-lg">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer  text-indigo-500"
                      />{" "}
                      <span className="mx-2 text-sm">{cart[k].qty}</span>{" "}
                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-indigo-500"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <span className="font-bold">SubTotal: ₹ {subTotal}</span>
          <div className="flex">
            <Link href={"/checkout"}>
              <a>
                <button
                  disabled={Object.keys(cart).length === 0}
                  className="flex mr-2 mt-2 text-white bg-indigo-500 disabled:bg-indigo-300 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-base items-center"
                >
                  <BsFillBagCheckFill className="mx-2" />
                  Checkout
                </button>
              </a>
            </Link>
            <button
              onChange={clearCart}
              onClick={() => {
                clearCart();
              }}
              disabled={Object.keys(cart).length === 0}
              className="flex mx-2 mt-2 text-white bg-indigo-500 disabled:bg-indigo-300 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-base "
            >
              Clear Cart
            </button>
          </div>
        </div>
        {/* <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.3/dist/flowbite.min.css" /> */}
        <Script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></Script>
      </div>
    </div>
  );
};

export default Navbar2;
