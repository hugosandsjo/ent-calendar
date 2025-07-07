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
      className={`relative h-28 px-4 md:px-10 flex justify-between items-center`}
    >
      <div className={`flex items-center justify-between w-full`}>
        <Link href="/">
          <h1 className="text-4xl hover:opacity-30">ENTcalendar</h1>
        </Link>
        <Link href="/dashboard" className="hidden md:flex">
          <p className="hover:underline bg-primary text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 px-4 py-2 rounded-md">
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
