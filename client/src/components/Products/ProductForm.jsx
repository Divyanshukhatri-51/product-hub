import React, { useState, useEffect } from 'react';
import Input from '../Common/Input';
import Button from '../Common/Button';
import { convertToBase64, validateImage } from '../../utils/cloudinary';
import { validateProduct } from '../../utils/validation';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    mrp: '',
    price: '',
    brandName: '',
    image: '',
    exchange: false,
    isPublished: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (product) {
      setFormData(product);
      setImagePreview(product.image);
    }
  }, [product]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const error = validateImage(file);
    if (error) {
      setErrors(prev => ({ ...prev, image: error }));
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setFormData(prev => ({ ...prev, image: base64 }));
      setImagePreview(base64);
      setErrors(prev => ({ ...prev, image: '' }));
    } catch (err) {
      setErrors(prev => ({ ...prev, image: 'Failed to process image' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateProduct(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to save product' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <Input
        label="Product Name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Enter product name"
        error={errors.name}
        required
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Type: <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          placeholder="Select product type"
          rows={3}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        >
          <option value="">Select a product type</option>
          <option value="foods">Foods</option>
          <option value="electronics">Electronics</option>
          <option value="cloths">Cloths</option>
          <option value="beauty">Beauty Products</option>
          <option value="other">Others</option>
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
      </div>
       <Input
          label="stock"
          type="number"
          step="0.01"
          value={formData.stock}
          onChange={(e) => handleChange('stock', e.target.value)}
          placeholder="Total numbers of Stock available"
          error={errors.stock}
          required
        />

      <div className="gap-4">
        <Input
          label="MRP"
          type="number"
          step="0.01"
          value={formData.mrp}
          onChange={(e) => handleChange('mrp', e.target.value)}
          placeholder="MRP of the product"
          error={errors.mrp}
          required
        />
        <Input
          label="Selling Price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => handleChange('price', e.target.value)}
          placeholder="0.00"
          error={errors.price}
          required
        />

        <Input
          label="Brand Name"
          value={formData.brandName}
          onChange={(e) => handleChange('brandName', e.target.value)}
          placeholder="Enter Brand Name"
          error={errors.brandName}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Image <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
        
        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="Preview" className="w-24 h-12 object-cover rounded-lg" />
          </div>
        )}
      </div>
       <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Exchange or return eligibility: <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.exchange}
          onChange={(e) => handleChange('exchange', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.exchange ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        >
          <option value="">Select option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          </select>
        {errors.exchange && <p className="mt-1 text-sm text-red-500">{errors.exchange}</p>}
      </div>
      

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isPublished"
          checked={formData.isPublished}
          onChange={(e) => handleChange('isPublished', e.target.checked)}
          className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
          Publish product
        </label>
      </div>

      {errors.submit && (
        <div className="text-red-500 text-sm text-center">{errors.submit}</div>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
          fullWidth
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;