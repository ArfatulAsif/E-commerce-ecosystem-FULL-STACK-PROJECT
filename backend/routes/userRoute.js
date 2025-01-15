const express = require('express');
const router = express.Router();
const authController = require('../controllers/Controller');
const authMiddleware = require('../middlewares/Middleware');

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/addproduct', authMiddleware.isSupplier, authController.addProduct);
router.get('/allproducts', authController.getAllProducts);
router.post('/AddToCart', authMiddleware.isCustomer, authController.addToCart);
router.post('/buyproduct', authMiddleware.isCustomer, authController.buy);
router.post('/addaccount', authController.addBankAccount );
router.post('/supplyproduct', authMiddleware.isSupplier, authController.deliverProduct );
router.get('/getCart', authMiddleware.isCustomer, authController.getCart);
router.get('/getAllOrdersCustomer', authMiddleware.isCustomer, authController.getAllOrdersForCustomer);
router.get('/getAllPendingOrdersSupplier', authMiddleware.isSupplier, authController.getAllPendingOrdersForSupplier);
router.get('/getAllDeliveredOrdersSupplier', authMiddleware.isSupplier, authController.getAllDeliveredOrdersForSupplier);
router.get('/getAllOrders', authMiddleware.isAdmin, authController.getAllOrders);
router.post('/transaction', authController.postTransactionsByAccount);
router.post('/productbyid', authController.ProductById);


module.exports = router;
