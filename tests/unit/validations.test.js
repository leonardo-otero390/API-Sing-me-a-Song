import '../../src/setup.js';
import * as recommendationValidation from '../../src/validations/recommendationValidation.js';

describe('recommendation validation suit', () => {
  it('should answer with Bad request', async () => {
    const promise = recommendationValidation.validateSongInput({
      name: 'jujuva',
    });
    await expect(promise).rejects.toThrowError('Bad request');
  });

  it('should answer with undefined', async () => {
    const promise = recommendationValidation.validateSongInput({
      name: 'jujuva',
      youtubeLink: 'http://www.youtube.com/watch?v=123asd',
    });
    expect(promise).toMatchObject({});
  });
});
