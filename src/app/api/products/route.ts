import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { productSchema } from '@/lib/validations';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    const query: any = {};
    
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const products = await db
      .collection('products')
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    const total = await db.collection('products').countDocuments(query);
    
    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = productSchema.parse(body);
    
    const db = await getDatabase();
    
    const existingSKU = await db.collection('products').findOne({ sku: validatedData.sku });
    if (existingSKU) {
      return NextResponse.json(
        { error: 'SKU already exists' },
        { status: 400 }
      );
    }
    
    const product = {
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection('products').insertOne(product);
    
    return NextResponse.json(
      { 
        message: 'Product created successfully',
        productId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating product:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
