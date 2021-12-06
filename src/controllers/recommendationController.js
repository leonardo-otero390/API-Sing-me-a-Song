import * as recommendationValidation from '../validations/recommendationValidation.js';
import * as recommendationRespository from '../repositories/recommendationRespository.js';

async function insertNewRecommendation(req, res) {
  const { name, youtubeLink } = req.body;

  try {
    await recommendationValidation.validateSongInput({
      name,
      youtubeLink,
    });
    await recommendationRespository.insertNewSong({ name, link: youtubeLink });
  } catch (error) {
    if (error.message === 'Bad request') return res.sendStatus(400);
    return res.sendStatus(500);
  }

  return res.sendStatus(201);
}
export { insertNewRecommendation };
