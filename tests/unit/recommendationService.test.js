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
