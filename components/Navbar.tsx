'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Change this based on your auth state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    setIsAuthenticated(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="text-white bg-blue-600">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link href="/" className="text-xl font-semibold hover:text-blue-200 transition-colors">
            MyNextApp
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1"
            aria-label="Toggle navigation"
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="hover:text-blue-200 transition-colors px-3 py-2 rounded-md hover:bg-blue-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/" 
                  className="hover:text-blue-200 transition-colors px-3 py-2 rounded-md hover:bg-blue-700"
                >
                  Home
                </Link>
                <Link 
                  href="/auth" 
                  className="hover:text-blue-200 transition-colors px-3 py-2 rounded-md hover:bg-blue-700"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} pb-4`}>
          <div className="flex flex-col space-y-2">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="hover:text-blue-200 transition-colors px-3 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors font-medium text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/" 
                  className="hover:text-blue-200 transition-colors px-3 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/auth" 
                  className="hover:text-blue-200 transition-colors px-3 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}