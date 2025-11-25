"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Listen for Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          BlogNest
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link href="/" className="hover:text-indigo-600">
            Home
          </Link>
          <Link href="/items" className="hover:text-indigo-600">
            Items
          </Link>
          <Link href="/about" className="hover:text-indigo-600">
            About
          </Link>
          <Link href="/contact" className="hover:text-indigo-600">
            Contact
          </Link>

          {/* If NOT logged in */}
          {!user && (
            <Link
              href="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Login
            </Link>
          )}

          {/* After Login */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-gray-100 px-4 py-2 rounded-md"
              >
                {user.displayName || "User"} ▼
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-md p-2">
                  <p className="px-2 py-1 text-sm text-gray-600 border-b">
                    {user.email}
                  </p>

                  <Link
                    href="/add-product"
                    className="block px-2 py-1 hover:bg-gray-100"
                  >
                    Add Product
                  </Link>

                  <Link
                    href="/manage-products"
                    className="block px-2 py-1 hover:bg-gray-100"
                  >
                    Manage Products
                  </Link>

                  <button
                    onClick={() => signOut(auth)}
                    className="w-full text-left px-2 py-1 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden block text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 font-medium">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/items" className="block">
            Items
          </Link>
          <Link href="/about" className="block">
            About
          </Link>
          <Link href="/contact" className="block">
            Contact
          </Link>

          {/* If NOT logged in */}
          {!user && (
            <Link
              href="/login"
              className="block bg-indigo-600 text-white px-4 py-2 rounded-md w-fit"
            >
              Login
            </Link>
          )}

          {/* After Login */}
          {user && (
            <>
              <p className="text-gray-600 text-sm">{user.email}</p>

              <Link href="/add-product" className="block hover:text-indigo-600">
                Add Product
              </Link>
              <Link
                href="/manage-products"
                className="block hover:text-indigo-600"
              >
                Manage Products
              </Link>

              <button
                onClick={() => signOut(auth)}
                className="block hover:text-indigo-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
