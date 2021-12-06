import * as songRepository from '../repositories/songRepository.js';

async function updateSongScore({ id, isPositivePoint }) {
  const updatingSong = await songRepository.findSongById(id);
  let newScore;
  if (isPositivePoint) {
    newScore = updatingSong.score + 1;
  } else {
    newScore = updatingSong.score - 1;
  }
  await songRepository.updateSongScore({ id, newScore });
}
export { updateSongScore };
