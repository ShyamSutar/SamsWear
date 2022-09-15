import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <div className="container -mt-12 mx-auto flex flex-col justify-center h-[100vh]">
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
      <form>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600"
              id="name"
              type="text"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600"
              id="email"
              type="email"
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
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-600 mb-3"
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
