import express from 'express';
// const express = require('express');
import calculateBmi from './calculateBmi';
import calculateExercises  from './exerciseCalculator';
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

app.post("/exercises", (req, res) => {
  console.log(req)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;
  
  if (!daily_exercises || !target) {
    return res.status(400).json({ 
      error: "parameters missing"
    });
  }
  if (daily_exercises && target) {
    const result = calculateExercises(JSON.parse(daily_exercises), Number(target));
    console.log('result', result);
    return res.json(result);
  }

  return res.status(400).json({ 
    error: "malformatted parameters"
  });

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});