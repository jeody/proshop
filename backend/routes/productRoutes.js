import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  getWarehouseProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, admin, stockAdmin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router
  .route('/')
  .get(getProducts)
  .post(protect, admin, stockAdmin, createProduct);
router.get('/top', getTopProducts);
router.get('/warehouse', getWarehouseProducts);
router
  .route('/:id')
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);

export default router;
