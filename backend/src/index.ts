import express from 'express';
import cors from 'cors';
import userRoutes from './routes/auth.routes';

const app = express();
const port = process.env.PORT || 5000;

// Allow CORS for all origins
app.use(cors());

// OR Allow CORS for specific origin
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend origin
}));

app.use(express.json());
app.use('/auth', userRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
