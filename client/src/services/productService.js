import API from './api';

const formatProductData = (productData) => {
  const data = { ...productData };

  // prefer explicit brandName, otherwise map brand -> brandName
  if (!data.brandName && data.brand) {
    data.brandName = data.brand;
  }
  // ensure numeric fields are numbers
  if (data.price !== undefined) data.price = parseFloat(data.price);
  if (data.mrp !== undefined) data.mrp = parseFloat(data.mrp);
  if (data.stock !== undefined) data.stock = parseFloat(data.stock);

  delete data.brand;
  return data;
};

export const getProducts = async (isPublished) => {
  const params = isPublished !== undefined ? { isPublished } : {};
  const response = await API.get('/products', { params });
  return response.data;
};

export const createProduct = async (productData) => {
  const formattedData = formatProductData(productData);
  const response = await API.post('/products', formattedData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const formattedData = formatProductData(productData);
  const response = await API.put(`/products/${id}`, formattedData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};