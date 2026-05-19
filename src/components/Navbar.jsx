'use client'
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname(); 
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login"); 
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/library", label: "Library" },
    { href: "/bookings", label: "My Bookings" },
    { href: "/add-room", label: "Add Room" },
  ];

  const links = (
    <>
      {navLinks.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className={pathname === href ? "bg-[#244D3F] text-white p-2 rounded-md" : ""}
          >
            {label}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <div className="border-b border-b-white/30 px-2 sticky top-0 z-50 bg-white/20 backdrop-blur-lg shadow-sm">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0} 
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul className="flex gap-2 lg:gap-10">{links}</ul>
          </div>
        </div>

        <div className="flex justify-center text-cyan-500 text-2xl sm:text-4xl font-bold">
          <h4>BoiGhor</h4>
        </div>

        <div className="navbar-end gap-5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <IoSearch className="text-xl md:text-2xl text-sun-dark" />
          </motion.button>

          <div className="flex items-center gap-1 md:gap-2">
            {user ? (
              <>
                
                <Avatar
                  src={user?.image ?? ""}
                  name={user?.name}
                  referrerPolicy="no-referrer"
                  size="sm"
                />
               
                <Button
                  size="sm"
                  onClick={handleSignOut}
                  className="rounded-md bg-red-500 text-white font-bold px-3 md:px-6"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/login">
                <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <Button
                    size="sm"
                    className="rounded-md bg-cyan-500 text-sun-dark font-bold px-3 md:px-6 shadow-md min-w-0"
                  >
                    Login
                  </Button>
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;