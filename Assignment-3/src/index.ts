import express, { Application } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ?? 3000;

app.use(bodyParser.json());
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
