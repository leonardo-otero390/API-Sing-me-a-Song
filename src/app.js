import express from 'express';
import cors from 'cors';
import recommendationRoutes from './routers/recommendation.routes.js';
import routes from './routers/routes.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use('/recommendations', recommendationRoutes);

export default app;
