const db = require('../models/db')

exports.getProducts = async (req, res, next) => {
  try {
    const products = await db.product.findMany({})
    const productList = products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      gameTypeId: product.gameTypeId,
      imageUrl: product.imageUrl,
      gameType: product.gameType
    }));
    res.status(200).json(productList);
  } catch (error) {
    next(error);
  }
}

const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload with the storage engine
const upload = multer({ storage: storage }).single('imageUrl');

exports.createProduct = async (req, res, next) => {
  upload(req, res, async (uploadError) => {
    if (uploadError) {
      return next(uploadError);
    }
    try {
      const product = await db.product.create({
        data: {
          name: req.body.name,
          price: parseInt(req.body.price),
          stock: parseInt(req.body.stock),
          gameTypeId: parseInt(req.body.gameTypeId),
          imageUrl: req.file ? req.file.path : null
        }
      });
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  });
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await db.product.update({
      where: {
        id: req.params.id
      },
      data: {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock
      }
    })
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await db.product.delete({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
}