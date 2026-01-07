import { getDatabase } from '@/lib/mongodb';
import ProductsClient from './ProductsClient';

async function getProducts() {
  const db = await getDatabase();
  
  const products = await db
    .collection('products')
    .find({})
    .sort({ createdAt: -1 })
    .limit(20)
    .toArray();
  
  // Convert ObjectId to string
  const serializedProducts = products.map(product => ({
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }));
  
  return serializedProducts;
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  return <ProductsClient initialProducts={products} />;
}
