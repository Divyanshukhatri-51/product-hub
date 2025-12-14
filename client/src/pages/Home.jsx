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
import { IoAddCircleOutline } from 'react-icons/io5';

const Home = () => {
  const [activeTab, setActiveTab] = useState('published'); // 'published' or 'unpublished'
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadProducts();
  }, [activeTab]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const isPublished = activeTab === 'published';
      const data = await getProducts(isPublished);
      setProducts(data);
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
    <MainLayout title="Home">
      <div className="">
        {/* Tabs */}
        <div className="w-full border-b-2 flex">
          <button
            onClick={() => setActiveTab('published')}
            className={`px-2 py-1 font-medium transition-all duration-200 ${
              activeTab === 'published'
                ? 'bg-gray-300 text-gray-700 shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Published Products
          </button>
          <button
            onClick={() => setActiveTab('unpublished')}
            className={`px-2 py-1 font-medium transition-all duration-200 ${
              activeTab === 'unpublished'
                ? 'bg-gray-300 text-gray-700 shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Unpublished Products
          </button>
        </div>

        {/* Add Product Button */}
        <div className="flex justify-end">
          <Button onClick={handleAddProduct} variant="primary">
            <div className="flex items-center gap-2">
              <IoAddCircleOutline size={20} />
              Add Product
            </div>
          </Button>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : products.length === 0 ? (
          <EmptyState onAddProduct={handleAddProduct} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
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

export default Home;