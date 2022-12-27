const { query } = require('express');
const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // 1A) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);

    const query = Tour.find(JSON.parse(queryStr)); // this returns query and we then can chain other methods to it

    // 2) Sorting
    if (req.query.sort) {
      let sortStr = req.query.sort;
      sortStr = sortStr.split(',').join(' ');
      console.log(sortStr);
      query.sort(sortStr);
    } else {
      query.sort('-createdAt');
    }

    // 3) Limiting fields
    if (req.query.fields) {
      console.log(req.query.fields);
      const fields = req.query.fields.split(',').join(' ');
      query.select(fields);
    } else {
      query.select('-__v');
    }

    // EXECUTE QUERY
    const tours = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      data: {
        results: tours.length,
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed to get tour',
      message: error,
    });
  }
};

exports.createTour = async (req, res) => {
  // const newTour = new Tour({})
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Updated Successfully',
      data: {
        tour: updatedTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed To Update',
      message: error,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndDelete(id);
    console.log(tour);
    res.status(204).json({
      status: 'success',
      message: 'Deleted Items Successfully',
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: 'Not deleted, problem occurred',
    });
  }
};
