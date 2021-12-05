import validateNewRecommendation from '../validations/schemas.js';
import connection from '../database/connection.js';

async function insertNewRecommendation(req, res) {
  const { name, youtubeLink } = req.body;

  const validation = validateNewRecommendation.validate(req.body);

  if (validation.error) return res.sendStatus(400);

  try {
    await connection.query(`INSERT INTO songs (name, link) VALUES ($1, $2);`, [
      name,
      youtubeLink,
    ]);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  return res.sendStatus(201);
}
export { insertNewRecommendation };
