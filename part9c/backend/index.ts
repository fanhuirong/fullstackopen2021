import express from 'express';
import diagnoseRouter from './routes/diagnoseRouter';
import patientRouter from './routes/patientRouter';
var cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

app.use('/api/patients', patientRouter)
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});