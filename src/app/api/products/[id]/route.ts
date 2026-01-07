import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { productUpdateSchema } from '@/lib/validations';
import { ObjectId } from 'mongodb';

// Define the type for the route context
type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteContext // Destructure params from the second argument
) {
  try {
    // 1. Await params before accessing properties (Next.js 15 requirement)
    const { id } = await params;

    const db = await getDatabase();
    const product = await db.collection('products').findOne({
      _id: new ObjectId(id), // Use the extracted 'id'
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params; // Await params first
    const body = await request.json();
    const validatedData = productUpdateSchema.parse(body);
    
    const db = await getDatabase();
    
    if (validatedData.sku) {
      const existingSKU = await db.collection('products').findOne({
        sku: validatedData.sku,
        _id: { $ne: new ObjectId(id) }, // Use 'id'
      });
      
      if (existingSKU) {
        return NextResponse.json(
          { error: 'SKU already exists' },
          { status: 400 }
        );
      }
    }
    
    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...validatedData,
          updatedAt: new Date(),
        },
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (error: any) {
    console.error('Error updating product:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params; // Await params first
    const db = await getDatabase();
    
    const result = await db.collection('products').deleteOne({
      _id: new ObjectId(id),
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
