import * as songRepository from '../repositories/songRepository.js';

async function updateSongScore({ id, isPositivePoint }) {
  const updatingSong = await songRepository.findSongById(id);
  let newScore;
  if (isPositivePoint) {
    newScore = updatingSong.score + 1;
  } else {
    newScore = updatingSong.score - 1;
  }
  if (newScore > -6) {
    await songRepository.updateSongScore({ id, newScore });
  } else {
    await songRepository.deleteSong(id);
  }
}

async function getRandomSong(preference) {
  let song;
  if (preference === 'popular') {
    song = await songRepository.getRandomPopularSong();
  } else {
    song = await songRepository.getRandomNotPopularSong();
  }
  if (!song) {
    song = await songRepository.getRandomSong();
  }
  if (!song) throw new Error('Not found');
  return song;
}
async function rankTopSongs(amount) {
  if (!amount || amount < 0) throw new Error('Bad request');
  const rank = await songRepository.findBestSongs(amount);
  if (!rank) throw new Error('Not found');
  return rank;
}
export { updateSongScore, getRandomSong, rankTopSongs };
