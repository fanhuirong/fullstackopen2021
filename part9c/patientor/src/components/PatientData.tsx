import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Icon, SemanticICONS } from 'semantic-ui-react';
import { Gender, Patient } from '../types';
import { apiBaseUrl } from '../constants';


export const PatientData = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(()=>{
    void fetchPatient();
  }, [id]);

  const fetchPatient = async ()=> {
    try {
        const { data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientData);
        // dispatch({ type: 'UPDATE_PATIENT', payload: patientData });
      } catch (error) {
        console.log(error);
      } 
  };

  const genderIcon = (gender: Gender): SemanticICONS => {
    switch (gender) {
      case 'male':
        return 'mars';

      case 'female':
        return 'venus';

      default:
        return 'genderless';
    }
  };

  return (
    <>
      {patient && (
        <Card>
          <Card.Content >
            {patient.name}
            <Icon name={genderIcon(patient.gender)} />
          </Card.Content>
   
          <Card.Content description={`occupation: ${patient.occupation}`} />
          <Card.Content extra>
            
            {patient.ssn}
          </Card.Content>
        </Card>
      )}
    </>
  );
};
