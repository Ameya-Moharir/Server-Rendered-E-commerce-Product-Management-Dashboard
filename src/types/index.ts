import { ObjectId } from 'mongodb';

export interface Product {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sku: string;
  images: string[];
  status: 'active' | 'inactive' | 'out_of_stock';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id?: ObjectId;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface SalesData {
  date: string;
  sales: number;
  revenue: number;
}

export interface AnalyticsData {
  totalProducts: number;
  totalRevenue: number;
  totalSales: number;
  lowStockProducts: number;
  salesChart: SalesData[];
  topProducts: {
    name: string;
    sales: number;
    revenue: number;
  }[];
  categoryDistribution: {
    category: string;
    count: number;
  }[];
}
