
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../util';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newEntry = patientService.addEntry(newPatientEntry)
    res.json(newEntry)
  } catch (error) {
    res.status(400).send(error);
  }

});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  const patient = patientService.getPatient(id);
  
  res.send(patient);
});

export default router;