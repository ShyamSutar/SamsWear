import { Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {AiOutlineShoppingCart} from "react-icons/ai"


const Navbar2 = () => {
  return (
    <div className="shadow-md">
      <Navbar fluid={true} rounded={true} >
        <Navbar.Brand >
            <Link href={"/"}>
            <Image
            src="/logo.png"
            className="cursor-pointer m-4 mr-3 h-6 sm:h-9"
            height={20}
            width={100}
            alt="Flowbite Logo"
          />
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link href={"/tshirts"} ><span className="cursor-pointer text-lg font-sans"><Navbar.Link >
          Tshirts
          </Navbar.Link></span></Link>
          <Link href={"/hoodies"} ><span className="cursor-pointer text-lg font-sans"><Navbar.Link >Hoodies</Navbar.Link></span></Link>
          <Link href={"/stickers"} ><span className="cursor-pointer text-lg font-sans"><Navbar.Link  >Stickers</Navbar.Link></span></Link>
          <Link href={"/mugs"} ><span className="cursor-pointer text-lg font-sans"><Navbar.Link  >Mugs</Navbar.Link></span></Link>
          <AiOutlineShoppingCart className="text-3xl text-center mx-auto"/>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navbar2;
