export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateOTP = (otp) => {
  return /^\d{6}$/.test(otp);
};

export const validateProduct = (product) => {
  const errors = {};

  if (!product.name?.trim()) {
    errors.name = 'Product name is required';
  }

  if (!product.category?.trim()) {
    errors.category = 'Category is required';
  }

  if (!product.stock || product.stock <= 0) {
    errors.stock = 'Valid stock quantity is required';
  }

  if (!product.mrp || product.mrp <= 0) {
    errors.mrp = 'Valid MRP is required';
  }

  if (!product.price || product.price <= 0) {
    errors.price = 'Valid price is required';
  }

  if (!product.brandName?.trim()) {
    errors.brandName = 'Brand name is required';
  }

  if (!product.image) {
    errors.image = 'Product image is required';
  }

  if (product.price > product.mrp) {
    errors.price = 'Selling price cannot be greater than MRP';
  }

  return errors;
};