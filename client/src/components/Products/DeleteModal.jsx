import React from 'react';
import Button from '../Common/Button';
import { IoWarningOutline } from 'react-icons/io5';

const DeleteModal = ({ product, onConfirm, onCancel, isLoading }) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <IoWarningOutline size={32} className="text-red-500" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Product</h3>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete "{product?.name}"? This action cannot be undone.
      </p>

      <div className="flex gap-3">
        <Button
          onClick={onCancel}
          variant="secondary"
          fullWidth
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="danger"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
