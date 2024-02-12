// back-end/controllers/product-controller.js
const db = require('../models/db');

exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, stock } = req.body;
    const newProduct = await db.product.create({
      data: { name, price, stock }
    });
    res.json({ msg: 'Product created successfully', product: newProduct });
  } catch (error) {
    next(error);
  }
};
