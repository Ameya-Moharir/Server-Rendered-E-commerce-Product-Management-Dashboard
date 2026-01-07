'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Navbar } from '@/components/ui/Navbar';
import { ProductForm } from '@/components/forms/ProductForm';
import { formatCurrency, formatDate, truncateText } from '@/utils/helpers';
import { Plus, Edit, Trash2, Search, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

// Update the Product interface to be more specific
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sku: string;
  images: string[];
  // Fix: Change 'string' to the specific union type
  status: 'active' | 'inactive' | 'out_of_stock'; 
  createdAt: string;
  updatedAt: string;
}

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const queryClient = useQueryClient();
  
  const { data: products = initialProducts } = useQuery({
    queryKey: ['products', searchTerm, categoryFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (categoryFilter) params.append('category', categoryFilter);
      
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      return data.products;
    },
    initialData: initialProducts,
  });
  
  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsCreateModalOpen(false);
      toast.success('Product created successfully!');
    },
    onError: () => {
      toast.error('Failed to create product');
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setEditingProduct(null);
      toast.success('Product updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update product');
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete product');
    },
  });
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="mb-6">
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Sports">Sports</option>
                <option value="Books">Books</option>
                <option value="Toys">Toys</option>
              </select>
            </div>
          </CardContent>
        </Card>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <Card key={product._id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No image
                    </div>
                  )}
                  <span
                    className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {product.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {truncateText(product.description, 100)}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-primary-600">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="text-sm text-gray-600">
                      Stock: <span className="font-semibold">{product.stock}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>SKU: {product.sku}</span>
                    <span>{product.category}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setEditingProduct(product)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(product._id)}
                      isLoading={deleteMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {products.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-4"
              >
                Create Your First Product
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Create Product Modal */}
<Modal
  isOpen={isCreateModalOpen}
  onClose={() => setIsCreateModalOpen(false)}
  title="Create New Product"
  size="lg"
>
  <ProductForm
    onSubmit={async (data) => {
      await createMutation.mutateAsync(data);
    }}
    isLoading={createMutation.isPending}
  />
</Modal>
      
      {/* Edit Product Modal */}
<Modal
  isOpen={!!editingProduct}
  onClose={() => setEditingProduct(null)}
  title="Edit Product"
  size="lg"
>
  {editingProduct && (
    <ProductForm
      initialData={editingProduct}
      onSubmit={async (data) => {
        await updateMutation.mutateAsync({ id: editingProduct._id, data });
      }}
      isLoading={updateMutation.isPending}
    />
  )}
</Modal>    
</div>
  );
}
