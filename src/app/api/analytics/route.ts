import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    
    // Get total products
    const totalProducts = await db.collection('products').countDocuments();
    
    // Get low stock products
    const lowStockProducts = await db.collection('products').countDocuments({
      stock: { $lt: 10 },
    });
    
    // Get products by category
    const categoryDistribution = await db
      .collection('products')
      .aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            category: '$_id',
            count: 1,
            _id: 0,
          },
        },
      ])
      .toArray();
    
    // Generate mock sales data for the last 7 days
    const salesChart = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toISOString().split('T')[0],
        sales: Math.floor(Math.random() * 50) + 20,
        revenue: Math.floor(Math.random() * 5000) + 1000,
      };
    });
    
    const totalSales = salesChart.reduce((sum, day) => sum + day.sales, 0);
    const totalRevenue = salesChart.reduce((sum, day) => sum + day.revenue, 0);
    
    // Get top products (mock data based on stock)
    const topProducts = await db
      .collection('products')
      .aggregate([
        { $match: { status: 'active' } },
        { $sort: { stock: -1 } },
        { $limit: 5 },
        {
          $project: {
            name: 1,
            sales: { $multiply: ['$stock', 0.1] },
            revenue: { $multiply: ['$price', '$stock', 0.1] },
          },
        },
      ])
      .toArray();
    
    return NextResponse.json({
      totalProducts,
      totalRevenue,
      totalSales,
      lowStockProducts,
      salesChart,
      topProducts,
      categoryDistribution,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
