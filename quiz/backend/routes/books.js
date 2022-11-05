// const express = require('express')
// const router = express.Router()
// const booksController = require('../controllers/books_controller')
// const { verifyAccessToken } = require('../helpers/jwt_helper');


// router.get('/getBooks', verifyAccessToken, booksController.Books)

// module.exports = router
const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../helpers/jwt_helper');
const booksController = require('../controllers/books_controller')

router.get('/getBooks', verifyAccessToken, booksController.getBooks)

// USER
//router.post('/newOrder', orderController.newOrder);

// ADMIN ACCESS NEEDED
// router.delete('/deleteOrder/:id', verifyAccessToken, adminMiddleware, orderController.deleteOrder)
// router.get('/getOrders', verifyAccessToken, adminMiddleware, orderController.getOrders)
// router.get('/getOrderById/:id', verifyAccessToken, adminMiddleware, orderController.getOrderById)



module.exports = router;