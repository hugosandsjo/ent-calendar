"use client";

import React from "react";
import Link from "next/link";
import { useMenu } from "@/src/contexts/MenuContext";

function FullScreenMenu() {
  const { isOpen, toggleMenu } = useMenu();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-brand-book flex items-center justify-center">
      <div className="text-2xl">
        {/* Close button */}
        <button
          onClick={toggleMenu}
          className="absolute top-5 right-10 text-white text-6xl hover:opacity-70 transition-opacity"
          aria-label="Close menu"
        >
          ×
        </button>

        {/* Menu items */}
        <nav className="space-y-4">
          <Link
            href="/"
            onClick={toggleMenu}
            className="block text-white md:text-6xl hover:text-pink-300 transition-colors"
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            onClick={toggleMenu}
            className="block text-white  md:text-6xl hover:text-pink-300 transition-colors font-light"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/create"
            onClick={toggleMenu}
            className="block text-white md:text-6xl hover:text-pink-300 transition-colors font-light"
          >
            Create Entry
          </Link>

          <Link
            href="/about"
            onClick={toggleMenu}
            className="block text-white md:text-6xl hover:text-pink-300 transition-colors font-light"
          >
            About
          </Link>

          <Link
            href="/contact"
            onClick={toggleMenu}
            className="block text-white md:text-6xl hover:text-pink-300 transition-colors font-light"
          >
            Contact
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default FullScreenMenu;
