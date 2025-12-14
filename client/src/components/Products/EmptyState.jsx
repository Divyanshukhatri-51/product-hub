import React from 'react';
import Button from '../Common/Button';

const EmptyState = ({ onAddProduct }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="No products"
        className="w-64 h-64 mb-6 opacity-50"
      />
      <h3 className="text-2xl font-bold text-gray-700 mb-2">No Products Found</h3>
      <p className="text-gray-500 mb-6">Start by adding your first product</p>
      <Button onClick={onAddProduct} variant="primary">
        Add Product
      </Button>
    </div>
  );
};

export default EmptyState;