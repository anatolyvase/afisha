import axios, { AxiosError } from "axios";
import cors from "cors";
import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;
const KUDAGO_API_URL = "https://kudago.com/public-api/v1.4";

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.get("/locations", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${KUDAGO_API_URL}/locations`);
    res.json(response.data);
  } catch (error) {
    res.status(getStatus(error)).json({ error: "Error fetching locations" });
  }
});

app.get("/event-categories", async (req: Request, res: Response) => {
    try {
      const response = await axios.get(`${KUDAGO_API_URL}/event-categories`, {
        params: req.query,
      });
      res.json(response.data);
    } catch (error) {
      res.status(getStatus(error)).json({ error });
    }
  },
);
app.get("/events", async (req: Request, res: Response) => {
    try {
      const response = await axios.get(`${KUDAGO_API_URL}/events`, {
        params: req.query,
      });
      res.json(response.data);
    } catch (error) {
      res.status(getStatus(error)).json({ error });
    }
  },
);

app.get("/events/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${KUDAGO_API_URL}/events/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(getStatus(error)).json({ error });
  }
});

app.get("/search", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${KUDAGO_API_URL}/search`, {
      params : req.query,
    })
    res.json(response.data);
  } catch (error) {

    res.status(getStatus(error)).json({ error });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const getStatus = (error: unknown) => (error as AxiosError).status || 500