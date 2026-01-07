import { getDatabase } from '@/lib/mongodb';
import DashboardClient from './DashboardClient';

async function getAnalytics() {
  const db = await getDatabase();
  
  const totalProducts = await db.collection('products').countDocuments();
  const lowStockProducts = await db.collection('products').countDocuments({
    stock: { $lt: 10 },
  });
  
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
  
  return {
    totalProducts,
    totalRevenue,
    totalSales,
    lowStockProducts,
    salesChart,
    topProducts: topProducts.map(p => ({
      name: p.name,
      sales: Math.round(p.sales),
      revenue: Math.round(p.revenue),
    })),
    categoryDistribution,
  };
}

export default async function DashboardPage() {
  const analytics = await getAnalytics();
  
  return <DashboardClient analytics={analytics} />;
}
