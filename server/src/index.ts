import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3000;
const KUDAGO_API_URL = "https://kudago.com/public-api/v1.4"

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/locations', async (req: Request, res: Response) => {
  const response = await axios.get(`${KUDAGO_API_URL}/locations`);
  res.json(response.data);
});

app.get('/events', async (req: Request, res: Response) => {
  const response = await axios.get(`${KUDAGO_API_URL}/events`, {
    params: req.query
  });
  res.json(response.data);
  }
)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});