const db = require("../models/db");

exports.createPayment = async (req, res, next) => {
    try {
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
      const paymentId = parseInt(req.params.paymentId);

      const payment = await db.payment.findUnique({
          where: {
              id: paymentId
          },
          include: {
              carts: {
                  include: {
                      product: true
                  }
              },
              paymentMethod: true
          }
      });

      res.status(200).json(payment);
  } catch (error) {
      next(error);
  }
}

exports.updatePayment = async (req, res, next) => {
  try {
    const paymentId = parseInt(req.params.paymentId);

    const payment = await db.payment.update({
      where: { id: paymentId },
      data: { status: 'paid' }
    });

    res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
}



exports.deletePayment = async (req, res, next) => {
  try {
      const paymentId = parseInt(req.params.paymentId); // แก้จาก req.params.id เป็น req.params.paymentId
      await db.payment.delete({
          where: {
              id: paymentId // ใส่ ID ของ payment ที่ต้องการลบ
          }
      });
      res.status(200).json({ message: 'Payment deleted successfully' }); // ส่งข้อความแสดงว่าการลบเสร็จสมบูรณ์
  } catch (error) {
      next(error);
  }
}



exports.getAllPayment = async (req, res, next) => {
    try {
        const payments = await db.payment.findMany({
          include: {
            carts: {
              include: {
                product: true,
                user: true,
              },
            },
          },
        });
        res.status(200).json(payments);
      } catch (error) {
        next(error);
      }
}

exports.getPaymentById = async (req, res, next) => {
    try {
      const paymentId = parseInt(req.params.id);
      const payment = await db.payment.findUnique({
        where: {
          id: paymentId
        },
        include: {
          carts: {
            include: {
              user: true,
              product: {
                include: {
                  gameType: true
                }
              }
            }
          }
        }
      });
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found.' });
      }
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  };
  

