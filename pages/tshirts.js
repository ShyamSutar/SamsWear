/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import mongoose from "mongoose";
import Product from '../models/Product'
// import img from 'next/img'

const Tshirts = ({products}) => {
  
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {products.map((item)=>{
              return <Link passHref={true} key={item._id} href={`/product/${item.slug}`}>
              <div className="cursor-pointer p-6 px-16 shadow-lg m-5">
                <a className="block relative rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="m-auto h-72  block"
                    src={item.img}
                  />
                </a>
                <div className="mt-4 text-center">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    T-Shirts
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {item.title}
                  </h2>
                  <p className="mt-1">₹{item.price}</p>
                  <p className="mt-1">S, M, L, XL, XXL</p>
                </div>
              </div>
            </Link>})}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
      
    }
    let products = await Product.find();

  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}

export default Tshirts;
