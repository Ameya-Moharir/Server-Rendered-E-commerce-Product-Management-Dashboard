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
  
  // THE FIX: Explicitly map every field. 
  // We treat 'product' as 'any' here to stop TypeScript from complaining 
  // that properties don't exist on the generic Document type.
  const serializedProducts = products.map((product: any) => ({
    _id: product._id.toString(),
    name: product.name || 'Untitled Product', // Provide default values
    description: product.description || '',
    price: product.price || 0,
    category: product.category || 'Uncategorized',
    stock: product.stock || 0,
    sku: product.sku || 'N/A',
    images: product.images || [],
    // Force the status to match the strict type we added in the Client component
    status: (product.status as 'active' | 'inactive' | 'out_of_stock') || 'active',
    createdAt: product.createdAt ? new Date(product.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: product.updatedAt ? new Date(product.updatedAt).toISOString() : new Date().toISOString(),
  }));
  
  return serializedProducts;
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  return <ProductsClient initialProducts={products} />;
}
