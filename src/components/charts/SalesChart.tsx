'use client';

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface SalesData {
  date: string;
  sales: number;
  revenue: number;
}

interface SalesChartProps {
  data: SalesData[];
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales & Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#0ea5e9"
              strokeWidth={2}
              name="Sales"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2}
              name="Revenue ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface CategoryData {
  category: string;
  count: number;
}

interface CategoryChartProps {
  data: CategoryData[];
}

export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#0ea5e9" name="Products" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
