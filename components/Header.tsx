"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import Form from "next/form";
import { ShoppingCart, Package } from "lucide-react";

const Header = () => {
  const { user } = useUser();
  
  const createClerkPasskey = async() => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.log("Error: ", JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-2">
      <div className="flex w-full flex-wrap items-center justify-between ">
        <Link
          href="/"
          className="mx-auto cursor-pointer text-2xl font-bold text-blue-500 hover:opacity-50 sm:mx-0"
        >
          Shopr
        </Link>

        <Form
          action="/search"
          className="mt-2 max-w-md sm:mx-4 sm:mt-0 sm:w-auto sm:flex-1"
        >
          <input
            className="w-full max-w-4xl rounded bg-gray-100 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            type="text"
            name="query"
            placeholder="Search for products"
          />
        </Form>

        <div className="mt-2 flex flex-1 items-center justify-end space-x-4 sm:mt-0">
          <Link
            href="/basket"
            className="relative flex flex-1 items-center justify-center space-x-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 sm:flex-none sm:justify-start"
          >
            <ShoppingCart className="w-6 h-6" />
            <span>Basket</span>
          </Link>

          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="relative flex flex-1 items-center justify-center space-x-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 sm:flex-none sm:justify-start"
              >
                <Package className="w-6 h-6" />
                <span>My Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />

                <div className="hidden text-xs sm:block">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {user?.passkeys.length === 0  && (
              <button
              onClick={createClerkPasskey}
              className="bg-white hover:bg-blue-700 hover:text-white
              animate-pulse text-blue-500 font-bold py-2 px-4 rounded
              borfer-blue-300 border"
              >
                Create passkey
              </button>
            )}

          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;