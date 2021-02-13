const express = require('express');
const Manufacturer = require('./models/Manufacturer');
const Receiver = require('./models/receiver');
const app = express();

app.use(express.json());

app.post('/api/v1/manufacturer', (req, res, next) => {
  Manufacturer.insert(req.body)
    .then((manufacturer) => res.send(manufacturer))
    .catch(next);
});

app.post('/api/v1/receiver', (req, res, next) => {
  Receiver.insert(req.body)
    .then((receiver) => res.send(receiver))
    .catch(next);
});

app.get('/api/v1/manufacturer' (req, res, next) => {
  Manufacturer 
  .insert(req.body)
})

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
