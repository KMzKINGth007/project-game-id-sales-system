require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/error')
const authRoute = require('./routes/auth-route')
const userRoute = require('./routes/user-route')
const productRoute = require('./routes/product-route')
const cartRoute = require('./routes/cart-route')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('upload'));

// service
app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/product', productRoute)
app.use('/cart', cartRoute)
app.use('/useronly', (req, res, next) => {
    res.json({msg: 'Private area'})
})

// notFound
app.use(notFound)

// error
app.use(errorMiddleware)


let port = process.env.PORT || 8889
app.listen(port, () => console.log('Server on Port :', port))