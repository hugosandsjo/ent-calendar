"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthButton } from "@/src/app/components/auth-button";
import { useMenu } from "@/src/contexts/MenuContext";

function Header() {
  const { isOpen, toggleMenu } = useMenu();
  return (
    <header
      className={`relative py-6 px-6 md:px-10 flex justify-between items-center`}
    >
      <div className={`flex items-center justify-between w-full`}>
        <Link href="/">
          <h1 className="text-4xl hover:opacity-30">ENTcalendar</h1>
        </Link>
        <Link href="/dashboard" className="hidden md:flex">
          <p className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md text-sm font-medium">
            Dashboard
          </p>
        </Link>
        <AuthButton />
        <div>
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-black transition-all ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black transition-all ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black transition-all ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
        <Link href="/dashboard/create" className="hidden md:flex">
          <Image
            className="hover:opacity-30"
            src="/plus.svg"
            width={30}
            height={30}
            alt="plus icon"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
