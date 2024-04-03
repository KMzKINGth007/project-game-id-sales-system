const db = require("../models/db");

exports.createPayment = async (req, res, next) => {
    try  {
        const paymentDate = req.body.paymentDate;
        const amount = parseInt(req.body.amount);
        const status = req.body.status;
        const cartId = parseInt(req.body.cartId);
        const paymentMethodId = parseInt(req.body.paymentMethodId);

        const payment = await db.payment.create({
            data: {
                paymentDate: paymentDate,
                amount: amount,
                status: status,
                cartId: cartId,
                paymentMethodId: paymentMethodId
            }
        })
        
        res.status(201).json(payment);
    } catch (error) {
        next(error);
    }
}



exports.getPaymentDetails = async (req, res, next) => {
    try {
        const paymentId = parseInt(req.params.id);

        const payment = await db.payment.findUnique({
            where: {
                id: paymentId
            },
            include: {
                cart: true,
                paymentMethod: true
            }
        });

        res.status(200).json(payment);
    } catch (error) {
        next(error);
    }
}

