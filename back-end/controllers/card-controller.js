const db = require("../models/db");
exports.addProductToCard = async (req, res, next) => {
    try {
        const card = await db.card.create({
            data: {
                userId: parseInt(req.params.id),
                productId: parseInt(req.body.productId),
                quantity: parseInt(req.body.quantity)
            }
        })
        res.status(201).json(card)
    } catch (error) {
        next(error)
    }
}

exports.updateCard = async (req, res, next) => {
    try {
        const card = await db.card.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                quantity: parseInt(req.body.quantity)
            }
        })
        res.status(200).json(card)
    } catch (error) {
        next(error)
    }
}

exports.deleteCard = async (req, res, next) => {
    try {
        const card = await db.card.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json(card)
    } catch (error) {
        next(error)
    }
}