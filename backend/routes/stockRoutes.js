import express from 'express';
const router = express.Router();
import {
  getStocks,
  getStockById,
  createStock,
  createNewStock,
  deleteStock,
  updateStock,
} from '../controllers/stockController.js';
import { protect, stockAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(getStocks).post(protect, stockAdmin, createStock);
router
  .route('/:id')
  .get(getStockById)
  .put(protect, stockAdmin, updateStock)
  .delete(protect, stockAdmin, deleteStock);
router.route('/:id').post(protect, stockAdmin, createNewStock);

export default router;
