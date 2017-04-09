import chai, { expect } from 'chai';
import server from '../../src/server/main';

describe('search', () => {
  describe('autoSuggest', () => {
    it('returns an array of bands', (done) => {
      chai.request(server)
        .get('/auto_suggest/masto')
        .end((err, res) => {
          const { body, status } = res;
          const expectedBands = [
            'Mastodon',
            'Feist/Mastodon',
            'Maston'
          ];
          expect(status, 'status').to.equal(200);
          expect(body, 'type').to.be.a('array');
          expect(body, 'result').to.eql(expectedBands);
          expect(body, 'length').to.have.lengthOf(3);
          done();
        });
    });
  });
});
