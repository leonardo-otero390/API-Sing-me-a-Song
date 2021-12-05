import { Router } from 'express';
import { insertNewRecommendation } from './controllers/recommendationController.js';

const routes = new Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});
routes.post('/recommendations', insertNewRecommendation);
export default routes;
