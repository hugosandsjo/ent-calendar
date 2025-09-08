"use client";

import React from "react";
import Link from "next/link";
import { useMenu } from "@/src/contexts/MenuContext";

function FullScreenMenu() {
  const { isOpen, toggleMenu } = useMenu();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-brand-gray flex items-center justify-center">
      <div className="text-2xl">
        {/* Close button */}
        <button
          onClick={toggleMenu}
          className="absolute top-2 right-5 text-6xl hover:opacity-70 transition-opacity"
          aria-label="Close menu"
        >
          ×
        </button>

        {/* Menu items */}
        <nav className="space-y-4">
          <div className="flex flex-col text-center gap-4">
            <Link
              href="/"
              onClick={toggleMenu}
              className="md:text-5xl text-4xl font-karla font-extrabold tracking-tighter"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              onClick={toggleMenu}
              className="md:text-5xl text-4xl font-karla font-extrabold tracking-tightert"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              onClick={toggleMenu}
              className="md:text-5xl text-4xl font-karla font-extrabold tracking-tightert"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={toggleMenu}
              className="md:text-5xl text-4xl font-karla font-extrabold tracking-tightert"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default FullScreenMenu;
