import asyncHandler from '../middleware/asyncHandler.js';
import Stock from '../models/stockModel.js';
import Product from '../models/productModel.js';

// @desc    Fetch all stocks
// @route   GET /api/stocks
// @access  Public
const getStocks = asyncHandler(async (req, res) => {
  const stocks = await Stock.find({});
  res.json(stocks);
});

// @desc    Fetch a stock
// @route   GET /api/stocks/:id
// @access  Public

const getStockById = asyncHandler(async (req, res) => {
  const stock = await Stock.findById(req.params.id);
  res.json(stock);

  if (stock) {
    return res.json(stock);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Create a stock
// @route   POST /api/stocks
// @access  Private/StocksAdmin
const createStock = asyncHandler(async (req, res) => {
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  // output 2023-07-08
  const stock = new Stock({
    nomenclature: 'Sample name stock',
    serialNumber: '0',
    makeBrand: 'Sample brand',
    unitItem: 'ea',
    boxNumber: 'Box-0',
    location: 'WH 0',
    remarks: 'Good',
    source: 'Sample source',
    dateInventory: `${date}`,
    ptisNumber: '0',
    unitPrice: '0.00',
    qtyReceived: '0',
    yearAcquired: `${date}`,
    image: '/images/sample.jpg',
    category: 'Sample category',
    user: req.user._id,
  });

  const createdStock = await stock.save();
  res.status(201).json(createdStock);
});

// @desc    Update a stock
// @route   PUT /api/stocks/:id
// @access  Private/StocksAdmin
const updateStock = asyncHandler(async (req, res) => {
  const {
    nomenclature,
    serialNumber,
    makeBrand,
    unitItem,
    boxNumber,
    location,
    remarks,
    source,
    dateInventory,
    ptisNumber,
    unitPrice,
    qtyReceived,
    yearAcquired,
    image,
    category,
  } = req.body;

  const stock = await Stock.findById(req.params.id);

  if (stock) {
    stock.nomenclature = nomenclature;
    stock.serialNumber = serialNumber;
    stock.makeBrand = makeBrand;
    stock.unitItem = unitItem;
    stock.boxNumber = boxNumber;
    stock.location = location;
    stock.remarks = remarks;
    stock.source = remarks;
    stock.dateInventory = dateInventory;
    stock.ptisNumber = ptisNumber;
    stock.unitPrice = unitPrice;
    stock.qtyReceived = qtyReceived;
    stock.yearAcquired = yearAcquired;
    stock.image = image;
    stock.category = category;

    const updatedStock = await stock.save();
    res.json(updatedStock);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    DELETE a stock
// @route   DELETE /api/stocks/:id
// @access  Private/StocksAdmin
const deleteStock = asyncHandler(async (req, res) => {
  const stock = await Stock.findById(req.params.id);

  if (stock) {
    await Stock.deleteOne({ _id: stock._id });
    res.status(200).json({ message: 'Stock deleted' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Create a stock
// @route   POST /api/stocks
// @access  Private/StocksAdmin
const createNewStock = asyncHandler(async (req, res) => {
  const stock = await Stock.findById(req.params.id);

  if (stock) {
    const productIsFound = await Product.findOne({ name: stock.nomenclature });

    if (!productIsFound) {
      // Add Stock to Product Table
      const product = new Product({
        name: stock.nomenclature,
        price: stock.unitPrice,
        user: req.user._id,
        image: stock.image,
        brand: stock.makeBrand,
        category: stock.category,
        countInStock: stock.qtyReceived,
        numReviews: 0,
        description: stock.remarks,
      });

      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
      res.status(200).json({ message: 'Product created successfully.' });
    } else {
      res.send('Product Exist');
      res.status(200).json({ message: 'Product do not exist' });
    }
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export {
  getStocks,
  getStockById,
  createStock,
  createNewStock,
  updateStock,
  deleteStock,
};
