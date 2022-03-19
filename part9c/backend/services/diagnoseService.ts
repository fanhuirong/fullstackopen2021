import diagnoseData from '../data/diagnoses';
import { Diagnose } from '../type';

const getEntries = (): Diagnose[] => {
  return diagnoseData;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};
