const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()
require('./config/database.js');
const { verifyAccessToken } = require('./helpers/jwt_helper')

//Routes
const userRoutes = require('./routes/user')
const bookRoutes = require('./routes/books')
//const productRoutes = require('./routes/product')
// const orderRoutes = require('./routes/order')
// const authRoutes = require('./routes/auth')
// const userRoutes = require('./routes/user')
// const categoryRoutes = require('./routes/category')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//THIS IS FOR CORS ERRORS WHICH DO NOT SHOW IN POSTMAN BUT WILL SHOW PN WEBSITE
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
        'Origin, X-requested-With,Content-Type,Accept, Authorization')
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET')
        return res.status(200).json({})
    }
    next()
});

//Sending to the Routes
app.use('/user', userRoutes);
app.use('/books', bookRoutes);
// app.use('/product', productRoutes);

// app.use('/category', categoryRoutes);
// app.use('/order', orderRoutes);
// app.use('/auth', authRoutes);
//app.use('/user', verifyAccessToken, userRoutes)

app.get('/', async (req, res, next) => {
    res.send("Hello!")
});

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app