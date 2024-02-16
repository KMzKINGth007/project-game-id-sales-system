const db = require('../models/db')

exports.getProducts = async (req, res, next) => {
  try {
    const products = await db.product.findMany()
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}

exports.createProduct = async (req, res, next) => {
  try {
    const product = await db.product.create({
      data: {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        gameTypeId: req.body.gameTypeId
      }
    })
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
}

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