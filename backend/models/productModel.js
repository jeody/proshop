import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
    },
    numReviews: {
      type: Number,
    },
    price: {
      type: Number,
    },
    countInStock: {
      type: Number,
    },
    warehouse: {
      type: Number,
    },
    unitItem: {
      type: String,
    },
    location: {
      type: String,
    },
    qtyIssued: {
      type: Number,
    },
    onHand: {
      type: Number,
    },
    dateIssued: {
      type: Date,
    },
    authority: {
      type: String,
    },
    yearAcquired: {
      type: Date,
    },
    source: {
      type: String,
    },
    partNumber: {
      type: String,
    },
    sparePartOf: {
      type: String,
    },
    fsc: {
      type: String,
    },
    niin: {
      type: String,
    },
    documentNumber: {
      type: String,
    },
    requisitioningUnit: {
      type: String,
    },
    stockId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
