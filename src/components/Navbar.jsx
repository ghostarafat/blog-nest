import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex justify-center">
      <Link href="/" className="px-5">
        Home
      </Link>
      <Link href="/blogs" className="px-5">
        Blogs
      </Link>
      <Link href="/about" className="px-5">
        About
      </Link>
      <Link href="/contact" className="px-5">
        Contact
      </Link>
      <Link href="/login" className="px-5">
        Login
      </Link>
      <Link href="/register" className="px-5">
        Register
      </Link>
    </div>
  );
}
