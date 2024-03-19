const db = require('../models/db')

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await db.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        let updateUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            line : req.body.line,
            facebook : req.body.facebook,
        }
        const user = await db.user.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: updateUser
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await db.user.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}