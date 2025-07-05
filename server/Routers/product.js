const express = require('express');
const router = express.Router();

//imp controller
const { postProduct, getProduct, getProductByid, putProductByid, deleteProductByid } = require('../controller/productController')

router.get('/product',getProduct)

router.get('/product/:productid',getProductByid)

router.post('/product',postProduct)

router.put('/product/:putproductid',putProductByid)

router.delete('/product/:deleteProductid',deleteProductByid)

module.exports = router