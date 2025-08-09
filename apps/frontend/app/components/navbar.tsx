'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <CheckCircle className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">TaskFlow</span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Log In
              </Link>
              <Link href="/signup" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600 p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium w-full text-left">
                Home
              </Link>
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium w-full text-left">
                Log In
              </Link>
              <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="block bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium w-full text-left">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}