import { Router } from 'express';
import * as recommendationController from './controllers/recommendationController.js';

const routes = new Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});
routes.post(
  '/recommendations',
  recommendationController.insertNewRecommendation
);
routes.post('/recommendations/:id/upvote', recommendationController.upVoteSong);
routes.post('/recommendations/:id/downvote',recommendationController.downVoteSong);
routes.get('/recommendations/random', recommendationController.getRandomSong);

export default routes;
