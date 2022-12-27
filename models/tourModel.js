const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have Name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    require: [true, 'A tour must have Durations.'],
  },
  maxGroupSize: {
    type: Number,
    require: [true, 'A tour must have max group size'],
  },
  difficulty: {
    type: String,
    require: [true, 'A tour must have difficulty level'],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    require: [true, 'A tour must have description'],
  },
  imageCover: {
    type: String,
    require: [true, 'A tour must have cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
