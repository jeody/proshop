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
      trim: true,
    },
    serialNumber: {
      type: String,
    },
    makeBrand: {
      type: String,
    },
    unitItem: {
      type: String,
    },
    boxNumber: {
      type: String,
    },
    location: {
      type: String,
    },
    remarks: {
      type: String,
    },
    dateInventory: {
      type: Date,
    },
    ptisNumber: {
      type: String,
    },
    unitPrice: {
      type: Number,
      default: 0,
    },
    qtyReceived: {
      type: Number,
      default: 0,
    },
    qtyIssued: {
      type: Number,
      default: 0,
    },
    onHand: {
      type: Number,
      required: true,
      default: 0,
    },
    dateIssued: {
      type: Date,
    },
    requisitioningUnit: {
      type: String,
    },
    authority: {
      type: String,
    },
    documentNumber: {
      type: String,
    },
    yearAcquired: {
      type: Date,
      required: true,
      default: Date.now,
    },
    source: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      trim: true,
    },
    partNumber: {
      type: String,
    },
    sparePartOf: {
      type: String,
      trim: true,
    },
    isAdded: {
      type: Boolean,
      required: true,
      default: false,
    },
    fsc: {
      type: Number,
      required: true,
      default: 0,
    },
    niin: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
    },
    warehouse: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
