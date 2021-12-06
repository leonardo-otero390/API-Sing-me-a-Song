import connection from '../database/connection.js';

async function insertNewSong({ name, link }) {
  await connection.query(`INSERT INTO songs (name, link) VALUES ($1, $2);`, [
    name,
    link,
  ]);
}
export { insertNewSong };
