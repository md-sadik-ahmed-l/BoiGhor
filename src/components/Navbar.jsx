'use client'
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { motion } from "framer-motion";

const Navbar = () => {
  const links = (
    <>
      <li>
        <Link
          href="/"
          className={usePathname === "/" ? "bg-[#244D3F] text-white" : ""}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className={
            usePathname === "/destinations" ? "bg-[#244D3F] text-white" : ""
          }
          href="/destinations"
        >
          Rooms
        </Link>
      </li>
      <li>
        <Link
          className={
            usePathname === "/bookings" ? "bg-[#244D3F] text-white" : ""
          }
          href="/bookings"
        >
          My Bookings
        </Link>
      </li>
      <li>
        <Link
          className={
            usePathname === "/add-room" ? "bg-[#244D3F] text-white" : ""
          }
          href="/add-room"
        >
          Add Room
        </Link>
      </li>
    </>
  );

  return (
    <div className="border-b border-b-white/30 px-2 sticky top-0 z-50 bg-white/20 backdrop-blur-lg shadow-sm ">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="navbar-center hidden sm:flex">
            <ul className="flex  gap-2 lg:gap-10">{links}</ul>
          </div>
        </div>

        <div className=" flex justify-center text-cyan-500 text-2xl sm:text-4xl font-bold">
          <h4>BoiGhor</h4>
          <h4>
            {" "}
            {/* <MdTravelExplore /> */}
          </h4>
        </div>

        <div className="navbar-end gap-5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-white/50 rounded-full transition-colors "
          >
            <IoSearch className="text-xl md:text-2xl text-sun-dark" />
          </motion.button>
          <div className="flex items-center gap-1 md:gap-2">
             <Link href={"/signin"}>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                    <Button
                      size="sm"
                      className="rounded-md bg-cyan-500 text-sun-dark font-bold px-3 md:px-6 shadow-md hover:bg-sun-yellow-hover min-w-0"
                    >
                      Login
                    </Button>
                  </motion.div>
                </Link>
            
            {/* {user ? (
              <>
                <h1>
                  <Avatar>
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={user?.name}
                      src={user?.image}
                    />
                    <Avatar.Fallback>{user?.name[0]}</Avatar.Fallback>
                  </Avatar>
                </h1>
                <li>
                  <Button onClick={handleSignOut} variant="danger">
                    SignOut
                  </Button>
                </li>
              </>
            ) : (
              <>
                <Link href={"/signin"}>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                    <Button
                      size="sm"
                      className="rounded-md bg-cyan-500 text-sun-dark font-bold px-3 md:px-6 shadow-md hover:bg-sun-yellow-hover min-w-0"
                    >
                      Login
                    </Button>
                  </motion.div>
                </Link>
              </>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
