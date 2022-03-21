import {v1 as uuid} from 'uuid'
import patientsData from '../data/patients';
import { NewPatient, Patient } from '../type';

const getEntries = (): Patient[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): Omit<Patient, 'ssn'>[] => {
  return patientsData.map(({id, name, dateOfBirth,gender, occupation}) =>({
    id, 
    name, 
    dateOfBirth,
    gender, 
    occupation
  }));
}

const addEntry = (newEnty: NewPatient) : Patient=> {
  const newData = {
    id: uuid(),
    ...newEnty
  }
  patientsData.push(newData)
  return newData;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries
};
