require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-admin';

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    price: 129.99,
    category: 'Electronics',
    stock: 45,
    sku: 'SKU-ELECT-001',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
    status: 'active',
    tags: ['wireless', 'audio', 'bluetooth'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Premium Cotton T-Shirt',
    description: 'Comfortable and stylish cotton t-shirt available in multiple colors. Made from 100% organic cotton.',
    price: 29.99,
    category: 'Clothing',
    stock: 120,
    sku: 'SKU-CLOTH-001',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'],
    status: 'active',
    tags: ['clothing', 'casual', 'cotton'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Smart Watch Series 5',
    description: 'Advanced smartwatch with fitness tracking, heart rate monitoring, and GPS. Water-resistant up to 50 meters.',
    price: 399.99,
    category: 'Electronics',
    stock: 8,
    sku: 'SKU-ELECT-002',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
    status: 'active',
    tags: ['smartwatch', 'fitness', 'technology'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Yoga Mat Pro',
    description: 'Extra-thick yoga mat with superior grip and cushioning. Eco-friendly and non-toxic materials.',
    price: 49.99,
    category: 'Sports',
    stock: 65,
    sku: 'SKU-SPORT-001',
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800'],
    status: 'active',
    tags: ['yoga', 'fitness', 'wellness'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Bestselling Novel Collection',
    description: 'Collection of 5 bestselling novels from award-winning authors. Perfect gift for book lovers.',
    price: 79.99,
    category: 'Books',
    stock: 35,
    sku: 'SKU-BOOK-001',
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'],
    status: 'active',
    tags: ['books', 'reading', 'fiction'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Comfortable office chair with lumbar support and adjustable height. Breathable mesh back.',
    price: 299.99,
    category: 'Home & Garden',
    stock: 22,
    sku: 'SKU-HOME-001',
    images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800'],
    status: 'active',
    tags: ['office', 'furniture', 'ergonomic'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Kids Building Blocks Set',
    description: 'Educational building blocks set with 200 pieces. Safe, non-toxic materials suitable for ages 3+.',
    price: 39.99,
    category: 'Toys',
    stock: 88,
    sku: 'SKU-TOY-001',
    images: ['https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800'],
    status: 'active',
    tags: ['toys', 'educational', 'kids'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof.',
    price: 24.99,
    category: 'Sports',
    stock: 150,
    sku: 'SKU-SPORT-002',
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800'],
    status: 'active',
    tags: ['water bottle', 'insulated', 'eco-friendly'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'High-precision gaming mouse with customizable RGB lighting and programmable buttons.',
    price: 79.99,
    category: 'Electronics',
    stock: 5,
    sku: 'SKU-ELECT-003',
    images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=800'],
    status: 'active',
    tags: ['gaming', 'mouse', 'wireless'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Indoor Plant Collection',
    description: 'Set of 3 easy-care indoor plants perfect for home or office. Includes care instructions.',
    price: 59.99,
    category: 'Home & Garden',
    stock: 0,
    sku: 'SKU-HOME-002',
    images: ['https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800'],
    status: 'out_of_stock',
    tags: ['plants', 'indoor', 'decor'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seed() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('ecommerce-admin');
    
    // Clear existing data
    await db.collection('products').deleteMany({});
    console.log('Cleared existing products');
    
    await db.collection('users').deleteMany({});
    console.log('Cleared existing users');

    // Create demo admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const demoUser = {
      email: 'admin@demo.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date(),
    };
    
    await db.collection('users').insertOne(demoUser);
    console.log('Created demo admin user');
    console.log('  Email: admin@demo.com');
    console.log('  Password: admin123');

    // Insert sample products
    const result = await db.collection('products').insertMany(sampleProducts);
    console.log(`Inserted ${result.insertedCount} products`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Email: admin@demo.com');
    console.log('   Password: admin123');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seed();
