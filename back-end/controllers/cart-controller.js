const db = require("../models/db");

exports.addProductToCard = async (req, res, next) => {
    try {
        const userId = req.user.id; // ดึงค่า userId จาก req.user.id
        const productId = parseInt(req.body.productId);
        const quantity = parseInt(req.body.quantity);
        
        const cart = await db.cart.create({
            data: {
                userId: userId, // กำหนด userId จาก req.user.id
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
        const userId = req.user.id; // ดึงค่า userId จาก req.user.id
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