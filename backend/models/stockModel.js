import mongoose from 'mongoose';

var year = new Date().getFullYear(); //To get the Current Year

const stockSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    nomenclature: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
    },
    makeBrand: {
      type: String,
      required: true,
    },
    unitItem: {
      type: String,
      required: true,
    },
    boxNumber: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    dateInventory: {
      type: Date,
    },
    ptisNumber: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    qtyReceived: {
      type: Number,
      required: true,
      default: 0,
    },
    yearAcquired: {
      type: Date,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
