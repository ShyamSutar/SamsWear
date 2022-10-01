/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import mongoose from "mongoose";
import Product from "../../models/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "next/error";

const Post = ({ addToCart, product, varients, buyNow, error }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setpin] = useState();
  const [service, setservice] = useState();

  const [color, setcolor] = useState();
  const [size, setsize] = useState();

  useEffect(() => {

  if(!error){
    setcolor(product.color)
    setsize(product.size)
  }
    
  
  }, [router.query])

  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setservice(true);
      toast.success("Your pincode is serviceable.!", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setservice(false);
      toast.error("Sorry, Pincode is not serviceable", {
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

  const onChangePin = (e) => {
    setpin(e.target.value);
  };


 

  const refreshVarient = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${varients[newcolor][newsize]["slug"]}`;
    // window.location = url;
    router.push(url)
  };

  if(error == 404){
    return <Error statusCode={404}/>
  }
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
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
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full flex justify-center items-center">
              <img alt="ecommerce" className="h-96 rounded" src={product.img} />
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                SAMSWEAR
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} ({product.size}/{product.color})
              </h1>
              <div className="flex mb-4"></div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(varients).includes("white") &&
                    Object.keys(varients["white"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVarient(size, "white");
                        }}
                        className={`border-2  rounded-full w-6 h-6 focus:outline-none ${
                          color === "white" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(varients).includes("red") &&
                    Object.keys(varients["red"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVarient(size, "red");
                        }}
                        className={`border-2  ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${
                          color === "red" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(varients).includes("green") &&
                    Object.keys(varients["green"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVarient(size, "green");
                        }}
                        className={`border-2  ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "green" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(varients).includes("blue") &&
                    Object.keys(varients["blue"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVarient(size, "blue");
                        }}
                        className={`border-2  ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "blue" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(varients).includes("purple") &&
                    Object.keys(varients["purple"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVarient(size, "purple");
                        }}
                        className={`border-2  ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "purple"
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(varients).includes("yellow") &&
                    Object.keys(varients["yellow"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVarient(size, "yellow");
                        }}
                        className={`border-2  ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "yellow"
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      onChange={(e) => {
                        refreshVarient(e.target.value, color);
                      }}
                      value={size}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    >
                      {color && Object.keys(varients[color]).includes("S") && (
                        <option value={"S"}>S</option>
                      )}
                      {color && Object.keys(varients[color]).includes("M") && (
                        <option value={"M"}>M</option>
                      )}
                      {color && Object.keys(varients[color]).includes("L") && (
                        <option value={"L"}>L</option>
                      )}
                      {color && Object.keys(varients[color]).includes("XL") && (
                        <option value={"XL"}>Xl</option>
                      )}
                      {color && Object.keys(varients[color]).includes("XLL") && (
                        <option value={"XLL"}>XLL</option>
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 justify-center md:justify-start">
              {product.availableQty>0 && <span className="title-font font-medium text-lg md:text-2xl text-gray-900">
                  ₹{product.price}.00
                </span>}
                {product.availableQty<=0 && <span className="title-font font-medium text-lg md:text-2xl text-gray-900">
                  Out of Stock..!
                </span>}
                <button
                  onClick={() => {
                    buyNow(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color
                    );
                  }}
                  disabled={product.availableQty <= 0}
                  className="flex disabled:bg-indigo-300 text-white bg-indigo-500 border-0 py-2 px-2 text-base md:px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color
                    );
                    // toast.success("Your item has been added.!", {
                    //   position: "top-left",
                    //   autoClose: 2000,
                    //   hideProgressBar: false,
                    //   closeOnClick: true,
                    //   pauseOnHover: true,
                    //   draggable: true,
                    //   progress: undefined,
                    // });
                  }}
                  disabled={product.availableQty <= 0}
                  className="flex disabled:bg-indigo-300 text-white bg-indigo-500 border-0 py-2 px-2 md:px-6 text-base focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add to Cart
                </button>
                ``
              </div>

              <div className="pin mt-6 flex space-x-2 text-sm justify-center md:justify-start">
                <input
                  onChange={onChangePin}
                  placeholder="Enter Your Pincode"
                  type="text"
                  className="px-2 border-2 border-gray-400 rounded-md"
                />
                <button
                  onClick={checkServiceability}
                  className='className="flex ml-auto text-white bg-indigo-500 border-0 rounded-md py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"'
                >
                  Check
                </button>
              </div>
              {!service && service != null && (
                <div className="text-red-500 text-sm mt-3">
                  Sorry! We do not deliver to this pincode yet
                </div>
              )}
              {service && service != null && (
                <div className="text-green-500 text-sm mt-3">
                  This pincode is serviceable
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  if(product == null){
    return {
      props: {
        error: 404,
      }, // will be passed to the page component as props
    };
  }
  let varients = await Product.find({
    title: product.title,
    category: product.category,
  });
  let colorSizeSlug = {};
  for (let item of varients) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }


  return {
    props: {
      error: error,
      product: JSON.parse(JSON.stringify(product)),
      varients: JSON.parse(JSON.stringify(colorSizeSlug)),
    }, // will be passed to the page component as props
  };
}

export default Post;
