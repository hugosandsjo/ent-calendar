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
          <h1 className="text-4xl hover:opacity-30">Ent</h1>
        </Link>
        <Link href="/dashboard" className="hidden md:flex">
          <p className="hover:bg-accent px-4 py-2 rounded-lg text-[22px] leading-[1.3em] font-medium">
            Dashboard
          </p>
        </Link>
        <AuthButton />
        <Link href="/dashboard/create" className="flex md:hidden">
          <Image
            className="hover:opacity-30"
            src="/plus.svg"
            width={30}
            height={30}
            alt="plus icon"
          />
        </Link>
        <div>
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-8 h-[3px] bg-black transition-all ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-8 h-[3px] bg-black transition-all ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-8 h-[3px] bg-black transition-all ${
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
