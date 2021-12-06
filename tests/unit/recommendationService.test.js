import * as recommendationService from '../../src/services/recommendationService.js';
import * as songRepository from '../../src/repositories/songRepository.js';

describe('Get songs ranked by amount', () => {
  it('should answer with Bad request', async () => {
    const promise = recommendationService.rankTopSongs(0);
    await expect(promise).rejects.toThrowError('Bad request');
  });

  it('should answer with Not Found', async () => {
    jest
      .spyOn(songRepository, 'findBestSongs')
      .mockImplementationOnce(() => false);
    const promise = recommendationService.rankTopSongs(10);
    await expect(promise).rejects.toThrowError('Not found');
  });

  it('should answer with a array of recommendations', async () => {
    jest.spyOn(songRepository, 'findBestSongs').mockImplementationOnce(() => [
      {
        id: 150,
        name: 'Chitãozinho E Xororó - Evidências',
        youtubeLink:
          'https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO',
        score: 245,
      },
      {
        id: 12,
        name: 'Falamansa - Xote dos Milagres',
        youtubeLink:
          'https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO',
        score: 112,
      },
    ]);
    const promise = await recommendationService.rankTopSongs(10);
    await expect(promise.length).toBeGreaterThan(0);
  });
});
describe('Get random songs', () => {
  const song = {
    id: 150,
    name: 'Chitãozinho E Xororó - Evidências',
    youtubeLink: 'https://www.youtube.com/watch?v=ePjtnSPFWK',
    score: 0,
  };
  it('should answer with popular song', async () => {
    song.score = 10;
    jest
      .spyOn(songRepository, 'getRandomPopularSong')
      .mockImplementationOnce(() => song);
    const promise = await recommendationService.getRandomSong('popular');
    expect(promise.score).toBeGreaterThan(9);
  });

  it('should answer with not popular song', async () => {
    song.score = 9;
    jest
      .spyOn(songRepository, 'getRandomNotPopularSong')
      .mockImplementationOnce(() => song);
    const promise = await recommendationService.getRandomSong('notPopular');
    expect(promise.score).toBeLessThan(10);
  });

  it('should answer any song when popular or notPopular arent available', async () => {
    jest
      .spyOn(songRepository, 'getRandomPopularSong')
      .mockImplementationOnce(() => false);
    jest
      .spyOn(songRepository, 'getRandomSong')
      .mockImplementationOnce(() => song);
    const promise = await recommendationService.getRandomSong('popular');
    expect(typeof promise).toEqual('object');
  });
  it('should Not found', async () => {
    jest
      .spyOn(songRepository, 'getRandomPopularSong')
      .mockImplementationOnce(() => false);
    jest
      .spyOn(songRepository, 'getRandomSong')
      .mockImplementationOnce(() => false);
    const promise = recommendationService.getRandomSong('popular');
    await expect(promise).rejects.toThrowError('Not found');
  });
});
describe('updateSongScore function', () => {
  it('should return Not found error', async () => {
    jest
      .spyOn(songRepository, 'findSongById')
      .mockImplementationOnce(() => false);
    const promise = recommendationService.updateSongScore({
      id: 1,
      isPositivePoint: true,
    });
    await expect(promise).rejects.toThrowError('Not found');
  });
});
