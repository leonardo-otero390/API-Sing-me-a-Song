import * as recommendationValidation from '../validations/recommendationValidation.js';
import * as songRespository from '../repositories/songRepository.js';
import * as recommendationService from '../services/recommendationService.js';

async function insertNewRecommendation(req, res) {
  const { name, youtubeLink } = req.body;

  try {
    await recommendationValidation.validateSongInput({
      name,
      youtubeLink,
    });
    await songRespository.insertNewSong({ name, link: youtubeLink });
  } catch (error) {
    if (error.message === 'Bad request') return res.sendStatus(400);
    return res.sendStatus(500);
  }

  return res.sendStatus(201);
}
async function upVoteSong(req, res) {
  const { id } = req.params;
  const isPositivePoint = true;
  try {
    await recommendationService.updateSongScore({ id, isPositivePoint });
  } catch (error) {
    if (error.message === 'Not found') return res.sendStatus(404);
    return res.sendStatus(500);
  }
  return res.sendStatus(200);
}
async function downVoteSong(req, res) {
  const { id } = req.params;
  const isPositivePoint = false;
  try {
    await recommendationService.updateSongScore({ id, isPositivePoint });
  } catch (error) {
    if (error.message === 'Not found') return res.sendStatus(404);
    return res.sendStatus(500);
  }
  return res.sendStatus(200);
}
export { insertNewRecommendation, upVoteSong, downVoteSong };
