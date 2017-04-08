import chai, { expect } from 'chai';
import main from '../../src/server/main';

describe('search', () => {
  describe('autoSuggest', () => {
    it('returns an array of bands', (done) => {
      chai.request(main)
        .get('/auto_suggest/masto')
        .end((err, res) => {
          const { body, status } = res;
          const expectedBands = [
            'Mastodon',
            'Feist/Mastodon',
            'Maston'
          ];
          expect(status).to.equal(200);
          expect(body).to.have.lengthOf(3);
          expect(body).to.be.a('array');
          expect(body).to.eql(expectedBands);
          done();
        });
    });
  });
});
