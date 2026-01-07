import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const createAdminSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = createAdminSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, name, password } = validation.data;

    // Connect to database
    const db = await getDatabase();

    // Check if email already exists
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user
    const newAdmin = {
      email,
      name,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      createdBy: session.user.email,
    };

    const result = await db.collection('users').insertOne(newAdmin);

    return NextResponse.json(
      {
        success: true,
        message: 'Admin account created successfully',
        admin: {
          id: result.insertedId.toString(),
          email,
          name,
          role: 'admin',
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
