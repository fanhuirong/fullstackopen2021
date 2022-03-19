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

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries
};
