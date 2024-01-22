import asyncHandler from '../middleware/asyncHandler.js';
import Stock from '../models/stockModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { log } from 'console';
// import { useSelector } from 'react-redux';

// const { userInfo } = useSelector((state) => state.auth);
// @desc    Fetch all stocks
// @route   GET /api/stocks
// @access  Public
const getStocks = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const count = await Stock.countDocuments({ ...keyword });

  const stocks = await Stock.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ stocks, page, pages: Math.ceil(count / pageSize) });
  //const stocks = await Stock.find({});
  //res.json(stocks);
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
    qtyIssued: '0',
    onHand: '0',
    dateIssued: `${date}`,
    requisitioningUnit: 'Sample Req Unit',
    authority: 'Sample Authority',
    documentNumber: 'Sample Docs',
    isAdded: false,
    fsc: '0',
    niin: '0',
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
    dateInventory,
    ptisNumber,
    unitPrice,
    qtyReceived,
    yearAcquired,
    image,
    category,
    source,
    qtyIssued,
    onHand,
    dateIssued,
    requisitioningUnit,
    authority,
    documentNumber,
    fsc,
    niin,
    description,
    warehouse,
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
    stock.dateInventory = dateInventory;
    stock.ptisNumber = ptisNumber;
    stock.unitPrice = unitPrice;
    stock.qtyReceived = qtyReceived;
    stock.yearAcquired = yearAcquired;
    stock.image = image;
    stock.category = category;
    stock.source = source;
    stock.qtyIssued = qtyIssued;
    stock.onHand = onHand;
    stock.dateIssued = dateIssued;
    stock.requisitioningUnit = requisitioningUnit;
    stock.authority = authority;
    stock.documentNumber = documentNumber;
    stock.fsc = fsc;
    stock.niin = niin;
    stock.description = description;
    stock.warehouse = warehouse;

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
        stockId: stock._id,
        image: stock.image,
        brand: stock.makeBrand,
        category: stock.category,
        countInStock: stock.qtyReceived,
        numReviews: 0,
        description: stock.description,
        unitItem: stock.unitItem,
        location: stock.location,
        qtyIssued: stock.qtyIssued,
        onHand: stock.onHand,
        dateIssued: stock.dateIssued,
        authority: stock.authority,
        yearAcquired: stock.yearAcquired,
        source: stock.source,
        partNumber: stock.partNumber,
        sparePartOf: stock.sparePartOf,
        fsc: stock.fsc,
        niin: stock.niin,
        warehouse: stock.warehouse,
        documentNumber: stock.documentNumber,
        requisitioningUnit: stock.requisitioningUnit,
      });
      stock.isAdded = true;

      const createdProduct = await product.save();
      const updatedStock = await stock.save();
      res.json(updatedStock);
      res.status(201).json(createdProduct);
      res.status(200).json({ message: 'Product created successfully.' });
    } else {
      //update the product
      productIsFound.name = stock.nomenclature;
      productIsFound.price = stock.unitPrice;
      productIsFound.description = stock.description;
      productIsFound.image = stock.image;
      productIsFound.brand = stock.makeBrand;
      productIsFound.category = stock.category;
      productIsFound.countInStock =
        productIsFound.countInStock + stock.qtyReceived;
      productIsFound.unitItem = stock.unitItem;
      productIsFound.location = stock.location;
      productIsFound.qtyIssued = stock.qtyIssued;
      productIsFound.onHand = stock.onHand;
      productIsFound.dateIssued = stock.dateIssued;
      productIsFound.authority = stock.authority;
      productIsFound.yearAcquired = stock.yearAcquired;
      productIsFound.source = stock.source;
      productIsFound.partNumber = stock.partNumber;
      productIsFound.sparePartOf = stock.sparePartOf;
      productIsFound.fsc = stock.fsc;
      productIsFound.niin = stock.niin;
      productIsFound.warehouse = stock.warehouse;
      productIsFound.documentNumber = stock.documentNumber;
      productIsFound.requisitioningUnit = stock.requisitioningUnit;
      stock.isAdded = true;

      const updatedProduct = await productIsFound.save();
      const updatedStock = await stock.save();
      res.json(updatedStock);
      res.json(updatedProduct);
      res.status(200).json({ message: 'Product exist and was updated' });
    }
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Create many stock
// @route   POST /api/stocks/excel
// @access  Private/StocksAdmin
const uploadStockExcel = asyncHandler(async (req, res) => {
  //res.send('excel uploaded');
  const { excelData } = req.body;
  //console.log(excelData);

  if (excelData) {
    const adminUser = req.user._id;
    const image = '/images/sample.jpg';
    //const adminUser = '656f9a222ab9bb77d8a56745';

    const sampleStocks = excelData.map((stock) => {
      return { ...stock, user: adminUser, image: image };
    });
    await Stock.insertMany(sampleStocks);
    res.status(200).json({ message: 'Stock forwarded' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

const getAdminStocks = asyncHandler(async (req, res) => {
  const user = await User.findById(req.query.userId);
  const stockUser = { _id: user._id };
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const count = await Stock.countDocuments({
    ...keyword,
    user: stockUser,
    isAdded: false,
  });

  const stocks = await Stock.find({
    ...keyword,
    user: stockUser,
    isAdded: false,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  //const stocks = await Stock.find({ user: stockUser, isAdded: false });
  res.json({ stocks, page, pages: Math.ceil(count / pageSize) });
  //console.log(stockUser);
  // const stockUser = '6487fe0e4cf777e3ddd55a56';
  // const stocks = await Stock.find({ user: stockUser, isAdded: false });
  // res.json(stocks);
});

export {
  getStocks,
  getStockById,
  createStock,
  createNewStock,
  updateStock,
  deleteStock,
  uploadStockExcel,
  getAdminStocks,
};
