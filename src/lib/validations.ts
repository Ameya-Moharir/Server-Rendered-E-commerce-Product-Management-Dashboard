import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  sku: z.string().min(1, 'SKU is required'),
  price: z.number().positive('Price must be positive'),
  stock: z.number().int().nonnegative('Stock must be non-negative'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  status: z.enum(['active', 'inactive', 'out_of_stock']),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export const productUpdateSchema = productSchema.partial();

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
