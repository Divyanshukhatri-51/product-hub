import React, { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import ProductCard from '../components/Products/ProductCard';
import EmptyState from '../components/Products/EmptyState';
import Modal from '../components/Common/Modal';
import ProductForm from '../components/Products/ProductForm';
import DeleteModal from '../components/Products/DeleteModal';
import Toast from '../components/Common/Toast';
import Button from '../components/Common/Button';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { IoAddCircleOutline, IoSearchOutline } from 'react-icons/io5';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      setToast({ message: 'Failed to load products', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleSubmitProduct = async (productData) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct._id, productData);
        setToast({ message: 'Product updated successfully!', type: 'success' });
      } else {
        await createProduct(productData);
        setToast({ message: 'Product created successfully!', type: 'success' });
      }
      setShowProductModal(false);
      loadProducts();
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(selectedProduct._id);
      setToast({ message: 'Product deleted successfully!', type: 'success' });
      setShowDeleteModal(false);
      loadProducts();
    } catch (error) {
      setToast({ message: 'Failed to delete product', type: 'error' });
    }
  };

  return (
    <MainLayout title="All Products">
      <div className="space-y-6">
        {/* Search and Add Section */}
        <div className="sm:flex gap-4">
          <div className="flex-1 relative">
            <IoSearchOutline
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name or category..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button onClick={handleAddProduct} variant="primary">
            <div className="flex items-center gap-2">
              <IoAddCircleOutline size={20} />
              Add Product
            </div>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-medium mb-2">Total Products</h3>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          <div className="bg-linear-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-medium mb-2">Published</h3>
            <p className="text-3xl font-bold">
              {products.filter(p => p.isPublished).length}
            </p>
          </div>
          <div className="bg-linear-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-medium mb-2">Drafts</h3>
            <p className="text-3xl font-bold">
              {products.filter(p => !p.isPublished).length}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState onAddProduct={handleAddProduct} />
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <Modal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        title={selectedProduct ? 'Edit Product' : 'Add Product'}
      >
        <ProductForm
          product={selectedProduct}
          onSubmit={handleSubmitProduct}
          onCancel={() => setShowProductModal(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title=""
        size="sm"
      >
        <DeleteModal
          product={selectedProduct}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      </Modal>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </MainLayout>
  );
};

export default Products;