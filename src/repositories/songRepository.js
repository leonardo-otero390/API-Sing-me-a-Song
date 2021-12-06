import connection from '../database/connection.js';

async function insertNewSong({ name, link }) {
  await connection.query(`INSERT INTO songs (name, link) VALUES ($1, $2);`, [
    name,
    link,
  ]);
}
async function findSongById(id) {
  const result = await connection.query(`SELECT * FROM songs WHERE id=$1;`, [
    id,
  ]);
  if (!result.rowCount) throw new Error('Not found');
  return result.rows[0];
}
async function updateSongScore({ id, newScore }) {
  await connection.query(`UPDATE songs SET score = $1 WHERE id=$2;`, [
    newScore,
    id,
  ]);
}
async function deleteSong(id) {
  await connection.query(`DELETE FROM songs WHERE id=$1 RETURNING *;`, [id]);
}
export { insertNewSong, findSongById, updateSongScore, deleteSong };
