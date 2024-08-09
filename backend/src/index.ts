import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
