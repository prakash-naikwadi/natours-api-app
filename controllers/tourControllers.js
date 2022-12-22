const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find((el) => el.id === parseInt(req.params.id));

  console.log(!tour);

  if (!tour) {
    return res.status(404).json({
      status: 'Tour Id Not Present',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const parameters = req.params;
  const body = req.body;
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated',
    },
  });
};

exports.deleteTour = (req, res) => {
  const parameters = req.params;
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
