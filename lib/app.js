const express = require('express');
const Receiver = require('../lib/models/Receiver');

const app = express();

app.use(express.json());

app.post('/api/v1/receivers', (req, res, next) => {
  Receiver.insert(req.body)
    .then((receiver) => res.send(receiver))
    .catch(next);
});

app.get('/api/v1/receivers', (req, res, next) => {
  Receiver.find()
    .then((receiver) => res.send(receiver))
    .catch(next);
});

app.get('/api/v1/receivers/:id', (req, res, next) => {
  Receiver.findById(req.params.id)
    .then((receiver) => res.send(receiver))
    .catch(next);
});

app.put('/api/v1/receivers/:id', (req, res, next) => {
  Receiver.update(req.params.id, req.body)
    .then((receivers) => res.send(receivers))
    .catch(next);
});

app.delete('/api/v1/receivers/:id', (req, res, next) => {
  Receiver.delete(req.params.id)
    .then((receiver) => res.send(receiver))
    .catch(next);
});

module.exports = app;
