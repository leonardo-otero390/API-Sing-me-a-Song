import { Router } from 'express';
import * as recommendationController from '../controllers/recommendationController.js';

const routes = new Router();

routes.post(
  '/',
  recommendationController.insertNewRecommendation
);
routes.post('/:id/upvote', recommendationController.upVoteSong);
routes.post('/:id/downvote',recommendationController.downVoteSong);
routes.get('/random', recommendationController.getRandomSong);
routes.get('/top/:amount', recommendationController.getSongsRanked);

export default routes;
