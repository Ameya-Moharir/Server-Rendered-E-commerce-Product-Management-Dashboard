'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Navbar } from '@/components/ui/Navbar';
import { UserPlus, Shield, Mail, Lock, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface Admin {
  _id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export default function AdminOnboardingClient({ admins }: { admins: Admin[] }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create admin');
      }

      toast.success('Admin account created successfully!');
      
      // Reset form
      setFormData({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      });

      // Refresh the page to show new admin in list
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create admin account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <div className="bg-primary-100 p-3 rounded-full mr-4">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Management
              </h1>
              <p className="text-gray-600 mt-1">
                Add new administrators to the system
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create Admin Form */}
          <Card className="shadow-lg">
            <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-primary-50 to-blue-50">
              <CardTitle className="flex items-center text-xl">
                <UserPlus className="w-5 h-5 mr-2 text-primary-600" />
                Create New Administrator
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="admin@company.com"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="Minimum 8 characters"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                      placeholder="Re-enter password"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-900 font-medium mb-2">
                    Password Requirements:
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Minimum 8 characters</li>
                    <li>• Include numbers and letters</li>
                    <li>• Avoid common passwords</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading} // Changed from isLoading prop to disabled + conditional text
                >
                  {isLoading ? (
                    'Creating...'
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Create Admin Account
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing Admins List */}
          <Card className="shadow-lg">
            <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center text-xl">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                Current Administrators
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {admins.length === 0 ? (
                <div className="text-center py-8">
                  <Shield className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No administrators found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {admins.map((admin) => (
                    <div
                      key={admin._id}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="bg-primary-100 p-2 rounded-full">
                            <UserIcon className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {admin.name}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center mt-1">
                              <Mail className="w-3 h-3 mr-1" />
                              {admin.email}
                            </p>
                            <div className="flex items-center mt-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <Shield className="w-3 h-3 mr-1" />
                                {admin.role.toUpperCase()}
                              </span>
                              {admin.email === session?.user?.email && (
                                <span className="ml-2 text-xs text-gray-500 italic">
                                  (You)
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              Added on {new Date(admin.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-900 font-medium mb-1">
                  ⚠️ Security Note
                </p>
                <p className="text-xs text-yellow-800">
                  Only create admin accounts for trusted team members. Admins have
                  full access to all dashboard features and data.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-6 shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Secure Access</h3>
                <p className="text-sm text-gray-600">
                  All passwords are hashed with bcrypt for maximum security
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserPlus className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Easy Onboarding</h3>
                <p className="text-sm text-gray-600">
                  New admins can log in immediately after account creation
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Admin Only</h3>
                <p className="text-sm text-gray-600">
                  This page is only accessible to authenticated administrators
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
