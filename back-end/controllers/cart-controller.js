const db = require("../models/db");

exports.addProductToCard = async (req, res, next) => {
    try {
        const userId = req.user.id; 
        const productId = parseInt(req.body.productId);
        const quantity = parseInt(req.body.quantity);
        
        const cart = await db.cart.create({
            data: {
                userId: userId, 
                productId: productId,
                quantity: quantity,
            }
        });

        res.status(201).json(cart);
    } catch (error) {
        next(error);
    }
}


exports.getCart = async (req, res, next) => {
    try {
        const userId = req.user.id; 
        const cart = await db.cart.findMany({
            where: {
                userId: userId
            },
            include: {
                product: true
            }
        });
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
}

exports.updateCart = async (req, res, next) => {
    try {
        const cart = await db.cart.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                quantity: parseInt(req.body.quantity)
            }
        });
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
}

exports.deleteCart = async (req, res, next) => {
    try {
        const cart = await db.cart.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
}