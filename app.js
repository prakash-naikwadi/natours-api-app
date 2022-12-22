const fs = require('fs');
const express = require('express');
const app = express();

// middleware (between req and res)
app.use(express.json()); // this middleware adds req data to req.body

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// tours routes handlers

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
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

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
  const parameters = req.params;
  const body = req.body;
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated',
    },
  });
};

const deleteTour = (req, res) => {
  const parameters = req.params;
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// users routes handlers

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Path is under construction',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Path is under construction',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Path is under construction',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Path is under construction',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Path is under construction',
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);

// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// tours routes

const tourRouter = express.Router();

app.use('/api/v1/tours', tourRouter);

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// users routes

const userRouter = express.Router();

app.use('/api/v1/users', userRouter);

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
