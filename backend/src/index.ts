import express from 'express';
import userRoutes from './routes/auth.routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/auth', userRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
