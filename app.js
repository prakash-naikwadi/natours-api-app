const fs = require('fs');
const express = require('express');
const app = express();

// middleware (between req and res)
app.use(express.json()); // this middleware adds req data to req.body

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const parameters = req.params;
  const body = req.body;
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated',
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const parameters = req.params;
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
