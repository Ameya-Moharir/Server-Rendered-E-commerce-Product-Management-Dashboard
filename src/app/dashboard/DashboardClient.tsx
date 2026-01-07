'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { SalesChart, CategoryChart } from '@/components/charts/SalesChart';
import { Navbar } from '@/components/ui/Navbar';
import { formatCurrency } from '@/utils/helpers';
import {
  Package,
  DollarSign,
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';

interface AnalyticsProps {
  analytics: {
    totalProducts: number;
    totalRevenue: number;
    totalSales: number;
    lowStockProducts: number;
    salesChart: Array<{ date: string; sales: number; revenue: number }>;
    topProducts: Array<{ name: string; sales: number; revenue: number }>;
    categoryDistribution: Array<{ category: string; count: number }>;
  };
}

export default function DashboardClient({ analytics }: AnalyticsProps) {
  const stats = [
    {
      title: 'Total Products',
      value: analytics.totalProducts,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(analytics.totalRevenue),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Sales',
      value: analytics.totalSales,
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Low Stock Items',
      value: analytics.lowStockProducts,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="animate-fade-in">
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SalesChart data={analytics.salesChart} />
          <CategoryChart data={analytics.categoryDistribution} />
        </div>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Top Performing Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="table-header">Product Name</th>
                    <th className="table-header">Sales</th>
                    <th className="table-header">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {analytics.topProducts.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="table-cell font-medium">{product.name}</td>
                      <td className="table-cell">{product.sales}</td>
                      <td className="table-cell text-green-600 font-semibold">
                        {formatCurrency(product.revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
