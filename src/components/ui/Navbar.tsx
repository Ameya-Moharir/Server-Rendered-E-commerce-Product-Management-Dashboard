'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { BarChart3, Package, LogOut, User, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-primary-600 mr-3" />
            <span className="text-xl font-bold text-gray-900">
              E-commerce Admin
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/dashboard')
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Dashboard
            </Link>
            <Link
              href="/products"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/products')
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Package className="w-4 h-4 inline mr-2" />
              Products
            </Link>
            <Link
              href="/admin-onboarding"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/admin-onboarding')
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <UserPlus className="w-4 h-4 inline mr-2" />
              Add Admin
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {session?.user && (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500">{session.user.email}</p>
                </div>
                <div className="bg-primary-100 p-2 rounded-full">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 flex space-x-2">
          <Link
            href="/dashboard"
            className={`flex-1 px-3 py-2 rounded-lg text-center text-sm ${
              isActive('/dashboard')
                ? 'bg-primary-100 text-primary-700 font-medium'
                : 'text-gray-600 bg-gray-50'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/products"
            className={`flex-1 px-3 py-2 rounded-lg text-center text-sm ${
              isActive('/products')
                ? 'bg-primary-100 text-primary-700 font-medium'
                : 'text-gray-600 bg-gray-50'
            }`}
          >
            Products
          </Link>
          <Link
            href="/admin-onboarding"
            className={`flex-1 px-3 py-2 rounded-lg text-center text-sm ${
              isActive('/admin-onboarding')
                ? 'bg-primary-100 text-primary-700 font-medium'
                : 'text-gray-600 bg-gray-50'
            }`}
          >
            Admins
          </Link>
        </div>
      </div>
    </nav>
  );
}
