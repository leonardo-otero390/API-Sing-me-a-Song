import * as schemas from './schemas.js';

async function validateSongInput({ name, youtubeLink }) {
  const validation = schemas.songSchema.validate({ name, youtubeLink });
  if (validation.error) throw new Error('Bad request');
}

export { validateSongInput };
