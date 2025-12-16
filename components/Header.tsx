'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';

export default function Header() {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline">
            {/* Logo removed */}
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Hospitals
            </Link>
            <Link href="/records" className="text-gray-600 hover:text-gray-900">
              Records
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-600">
                      {user.role === 'patient' ? 'Patient' : 'Healthcare Provider'}
                    </p>
                  </div>
                </div>
                {/* Profile and Logout buttons removed */}
              </div>
            ) : (
              <div className="flex items-center space-x-8">
                <Link
                  href="/login"
                  className="text-purple-600 hover:text-purple-700 font-medium px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors ml-2"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}