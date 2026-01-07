'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductFormData } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isLoading: boolean;
}

export function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [uploading, setUploading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      status: 'active',
      tags: [],
      images: [],
    },
  });
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    console.log('Files selected:', files.length);
    setUploading(true);
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        console.log('Uploading file:', file.name);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) throw new Error('Upload failed');
        
        const data = await response.json();
	console.log('Upload response:', data);
        return data.url;
      });
      
      const uploadedUrls = await Promise.all(uploadPromises);
	console.log('All uploaded URLs:', uploadedUrls);
      const newImages = [...images, ...uploadedUrls];
	console.log('New images array:', newImages);
      setImages(newImages);
      setValue('images', newImages);
      toast.success('Images uploaded successfully');
    } catch (error) {
	console.error('Upload error:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };
  
  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setValue('images', newImages);
  };
  
const onFormSubmit = async (data: ProductFormData) => {
  console.log('📝 Form submitted with data:', data);
  console.log('🖼️ Images:', images);
  try {
    await onSubmit({ ...data, images });
    console.log('✅ Submit successful');
  } catch (error) {
    console.error('❌ Submit failed:', error);
  }
};
  
  return (
      <form 
  onSubmit={(e) => {
    console.log('📋 Form onSubmit triggered');
    console.log('❓ Form errors:', errors);
    console.log('📊 Form values:', watch());
    handleSubmit(onFormSubmit)(e);
  }} 
  className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Product Name *"
          {...register('name')}
          error={errors.name?.message}
          placeholder="Enter product name"
        />
        
        <Input
          label="SKU *"
          {...register('sku')}
          error={errors.sku?.message}
          placeholder="SKU-XXX-XXX"
        />
        
        <Input
          label="Price *"
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          error={errors.price?.message}
          placeholder="0.00"
        />
        
        <Input
          label="Stock *"
          type="number"
          {...register('stock', { valueAsNumber: true })}
          error={errors.stock?.message}
          placeholder="0"
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            {...register('category')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Sports">Sports</option>
            <option value="Books">Books</option>
            <option value="Toys">Toys</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            {...register('status')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Enter product description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tags (comma-separated)
        </label>
        <input
  type="text"
  placeholder="tag1, tag2, tag3"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
  onChange={(e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    setValue('tags', tags);
  }}
/>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images *
        </label>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Product ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
            disabled={uploading}
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="w-12 h-12 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">
              {uploading ? 'Uploading...' : 'Click to upload images'}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              PNG, JPG up to 5MB
            </span>
          </label>
        </div>
        {errors.images && (
          <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
        )}
      </div>
      
      <div className="flex justify-end gap-4">
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
}
