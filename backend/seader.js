import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import stocks from './data/stocks.js';
import Stock from './models/stockModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importStockData = async () => {
  try {
    await Stock.deleteMany();

    const adminUser = '64965e60ae7c8ef2accf0122';

    const sampleStocks = stocks.map((stock) => {
      return { ...stock, user: adminUser };
    });

    await Stock.insertMany(sampleStocks);
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyStockData = async () => {
  try {
    await Stock.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyStockData();
} else {
  importStockData();
}
