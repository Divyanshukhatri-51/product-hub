const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

exports.getAllProducts = async (req, res) => {
  try {
    const { isPublished } = req.query;
    const filter = { userId: req.userId };
    
    if (isPublished !== undefined) {
      filter.isPublished = isPublished === 'true';
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, image, stock, mrp, brandName, exchange, isPublished } = req.body;

    // Validate required fields
    if (!name || !price || !category || !image || !stock || !mrp || !brandName || !exchange) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'products',
      resource_type: 'auto'
    });

    const product = new Product({
      name,
      price: parseFloat(price),
      category,
      stock: parseFloat(stock),
      mrp: parseFloat(mrp),
      brandName,
      exchange: exchange || "No",
      image: uploadResponse.secure_url,
      imagePublicId: uploadResponse.public_id,
      isPublished: isPublished || false,
      userId: req.userId
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, image, stock, mrp, brandName, exchange, isPublished } = req.body;

    const product = await Product.findOne({ _id: id, userId: req.userId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let imageUrl = product.image;
    let imagePublicId = product.imagePublicId;

    // If new image is provided
    if (image && image.startsWith('data:')) {
      // Delete old image from Cloudinary
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      // Upload new image
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: 'products',
        resource_type: 'auto'
      });

      imageUrl = uploadResponse.secure_url;
      imagePublicId = uploadResponse.public_id;
    }

    product.name = name || product.name;
    product.price = price ? parseFloat(price) : product.price;
    product.stock = stock ? parseFloat(stock) : product.stock;
    product.mrp = mrp ? parseFloat(mrp) : product.mrp;
    product.category = category || product.category;
    product.brandName = brandName || product.brandName;
    product.image = imageUrl;
    product.exchange = exchange || product.exchange
    product.imagePublicId = imagePublicId;
    
    if (exchange !== undefined) {
      product.exchange = exchange;
    }

    if (isPublished !== undefined) {
      product.isPublished = isPublished;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id, userId: req.userId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete image from Cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await Product.deleteOne({ _id: id });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};