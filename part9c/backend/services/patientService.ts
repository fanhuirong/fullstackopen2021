import {v1 as uuid} from 'uuid'
import patientsData from '../data/patients';
import { NewPatient, Patient, PublicPatient } from '../type';

const getEntries = (): Patient[] => {
  return patientsData;
};

const getPatient = (id: string): Patient | undefined => {
  return patientsData.find(patient => patient.id === id);
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patientsData.map(({id, name, dateOfBirth,gender, occupation, entries}) =>({
    id, 
    name, 
    dateOfBirth,
    gender, 
    occupation,
    entries
  }));
}

const addEntry = (newEnty: NewPatient) : Patient=> {
  const newData = {
    id: uuid(),
    ...newEnty,
    entries: []
  }
  patientsData.push(newData)
  return newData;
};

export default {
  getPatient,
  getEntries,
  addEntry,
  getNonSensitiveEntries
};
