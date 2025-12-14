import React, { useState } from 'react';
import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import { updateProduct } from '../../services/productService';
import Toast from '../Common/Toast';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [toast, setToast] = useState(null);

  const handleTogglePublish = async (prod) => {
    try {
      const updatedData = { ...prod, isPublished: !prod.isPublished };
      await updateProduct(prod._id, updatedData);
      const message = updatedData.isPublished 
        ? 'Product published successfully!' 
        : 'Product unpublished successfully!';
      setToast({ message, type: 'success' });
      // Refresh product data by updating parent
      onEdit(updatedData);
    } catch (error) {
      setToast({ message: 'Failed to update product status', type: 'error' });
    }
  };
  return (
    <div className="bg-white p-2 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-32 rounded-lg px-5 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <div className="flex justify-between text-gray-600 text-sm mb-1 line-clamp-2">
          <span className="">Quantity Stock-</span>
          <span className='text-end'>{product.stock}</span>
        </div>
        <div className="flex justify-between text-gray-600 text-sm mb-1 line-clamp-2">
          <span className="">MRP-</span>
          <span className='text-black'>&#8377; {product.mrp}</span>
        </div>
        <div className="flex justify-between text-gray-600 text-sm mb-1 line-clamp-2">
          <span className="">Selling price-</span>
          <span className='text-black'>&#8377; {product.price}</span>
        </div>
        <div className="flex justify-between text-gray-600 text-sm mb-1 line-clamp-2">
          <span className="">Brand Name-</span>
          <span className='text-black'>{product?.brandName}</span>
        </div>
        <div className="flex justify-between text-gray-600 text-sm mb-1 line-clamp-2">
          <span className="">Exchange eligibility-</span>
          <span className='text-black'>{product?.exchange}</span>
        </div>
        
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 text-primary rounded-lg hover:bg-indigo-100 transition-colors text-sm"
          >
            <IoCreateOutline size={18} />
            Edit
          </button>
          <button
            onClick={() => handleTogglePublish(product)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
              product.isPublished
                ? 'bg-purple-500 text-white hover:bg-purple-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {product.isPublished ? "Unpublish" : "Publish" }
          </button>
          <button
            onClick={() => onDelete(product)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors text-sm"
          >
            <IoTrashOutline size={18} />
            
          </button>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default ProductCard;