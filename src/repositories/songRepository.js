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
  if (!result.rowCount) return false;
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
async function getRandomPopularSong() {
  const result = await connection.query(
    `SELECT * FROM songs WHERE score>9 ORDER BY RANDOM() LIMIT 1;`
  );
  if (!result.rowCount) return false;
  return result.rows[0];
}
async function getRandomNotPopularSong() {
  const result = await connection.query(
    `SELECT * FROM songs WHERE score<10 ORDER BY RANDOM() LIMIT 1;`
  );
  if (!result.rowCount) return false;
  return result.rows[0];
}
async function getRandomSong() {
  const result = await connection.query(
    `SELECT * FROM songs ORDER BY RANDOM() LIMIT 1;`
  );
  if (!result.rowCount) return false;
  return result.rows[0];
}
async function findBestSongs(amount){
  const result = await connection.query(
    `SELECT * FROM songs ORDER BY score DESC LIMIT $1;`,[amount]
  );
  if (!result.rowCount) return false;
  return result.rows;
}
export {
  insertNewSong,
  findSongById,
  updateSongScore,
  deleteSong,
  getRandomPopularSong,
  getRandomNotPopularSong,
  getRandomSong,
  findBestSongs
};
