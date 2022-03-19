import {v1 as uuid} from 'uuid'
import patientsData from '../data/patients';
import { Patient } from '../type';

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

const addEntry = (name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string) => {
  const newData = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  }
  patientsData.push(newData)
  return newData;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries
};
