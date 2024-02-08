const express = require('express')
const router = express.Router()
const productController = require('../controllers/products');
const { authenticate } = require('../middlewares/auth');
// Retrieve all products
router.get('/',authenticate, productController.findAll);
// Add a new product
router.post('/', authenticate,productController.create);
// Retrieve a single product with id
router.get('/:id',authenticate, productController.findOne);
// Update a product with id
router.put('/:id',authenticate, productController.update);
// Delete a product with id
router.delete('/:id', authenticate,productController.delete);
module.exports = router