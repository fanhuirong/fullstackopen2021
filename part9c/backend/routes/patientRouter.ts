
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const { name, ssn, dateOfBirth, gender, occupation } = req.body;
  const newEntry = patientService.addEntry(name, ssn, dateOfBirth, gender, occupation)
  res.json(newEntry)
});

export default router;