import express from 'express';
// const express = require('express');
import calculateBmi from './calculateBmi';
const app = express();

app.get('/Hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  weight && height ? res.json({
        weight: height,
        height: weight,
        bmi: calculateBmi(height, weight),
      }): res.send({
        error: "malformatted parameters",
      })

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});