"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* Hamburger Button - Hidden on larger screens */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center justify-center w-7 h-7 bg-gray-500 text-white rounded-md hover:bg-gray-700 focus:outline-none md:hidden"
        aria-label="Toggle Sidebar"
      >
        <span
          className={`block w-4 h-0.5 bg-white transition-transform ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`block w-4 h-0.5 bg-white mt-1 transition-opacity ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-4 h-0.5 bg-white mt-1 transition-transform ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>

      {/* Sidebar for smaller screens */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 bg-black text-white shadow-lg transform transition-transform z-40 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="mt-16 space-y-4">
          <ul className="pl-12 pr-6">
            <li>
              <Link
                href="/"
                onClick={closeSidebar}
                className="block py-2 hover:underline"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={closeSidebar}
                className="block py-2 hover:underline"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                onClick={closeSidebar}
                className="block py-2 hover:underline"
              >
                Admin
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                onClick={closeSidebar}
                className="block py-2 hover:underline"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={closeSidebar}
                className="block py-2 hover:underline"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                onClick={closeSidebar}
                className="block py-2 hover:underline"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Horizontal Navbar for larger screens */}
      <div className="hidden md:flex w-full bg-gray-800 text-white py-4 shadow-md fixed top-0 left-0 z-30">
        <nav className="flex justify-around w-full">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>
          <Link href="/services" className="hover:underline">
            Services
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </nav>
      </div>

      {/* Ensure Content is Pushed Down Below Navbar */}
      <div className="pt-0 md:pt-20 md:mt-4">
        {/* Additional margin (mt-4) ensures spacing below navbar */}
        {/* Your Page Content Goes Here */}
      </div>
    </div>
  );
}
