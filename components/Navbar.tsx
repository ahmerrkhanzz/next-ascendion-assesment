'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Login', href: '/login' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar Container */}
      <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center md:px-8">
        {/* Left: Menu Items (desktop) */}
        <div className="hidden md:flex gap-6">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <span className="hover:text-blue-400 cursor-pointer">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Right: Search Input (desktop) */}
        <div className="hidden md:flex">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded text-black"
          />
        </div>

        {/* Hamburger (Mobile) */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Sidebar Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-3/4 h-full bg-gray-800 text-white p-4 z-50 shadow-lg transition-all">
          <div className="flex justify-end mb-4">
            <button onClick={() => setIsOpen(false)}>
              <FiX size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  onClick={() => setIsOpen(false)}
                  className="hover:text-blue-400 cursor-pointer"
                >
                  {item.name}
                </span>
              </Link>
            ))}

            <input
              type="text"
              placeholder="Search..."
              className="mt-4 px-3 py-2 rounded text-black w-full"
            />
          </nav>
        </div>
      )}
    </>
  );
}
