import express from 'express';
const router = express.Router();
import {
  getStocks,
  getStockById,
  createStock,
  createNewStock,
  deleteStock,
  updateStock,
  uploadStockExcel,
  getAdminStocks,
} from '../controllers/stockController.js';
import { protect, stockAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(getStocks).post(protect, stockAdmin, createStock);
router.route('/:id').get(protect, stockAdmin, getAdminStocks);
router.route('/excel').post(protect, stockAdmin, uploadStockExcel);
router.route('/edit/:id').get(getStockById);
router
  .route('/:id')
  .put(protect, stockAdmin, updateStock)
  .delete(protect, stockAdmin, deleteStock);
router.route('/:id').post(protect, stockAdmin, createNewStock);

export default router;
