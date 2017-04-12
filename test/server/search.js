import chai, { expect } from 'chai';
import server from '../../src/server/main';
import config from './../test.config';

describe('search', () => {
  describe('index', () => {
    it('redirects if it found something it', (done) => {
      chai.request(server)
        .get('/search/mastodon')
        .end((err, res) => {
          expect(res, 'redirect').to.redirect;
          expect(res, 'redirect location')
            .to.redirectTo(`${config.host}band/598?redirected=true`);
          done();
        });
    });
  });
  describe('autoSuggest', () => {
    it('returns an array of bands', (done) => {
      chai.request(server)
        .get('/auto_suggest/masto')
        .end((err, res) => {
          const { body } = res;
          const expectedBands = [
            'Mastodon',
            'Feist/Mastodon',
            'Maston'
          ];
          expect(res, 'status').to.have.status(200);
          expect(body, 'type').to.be.a('array');
          expect(body, 'result').to.eql(expectedBands);
          expect(body, 'length').to.have.lengthOf(3);
          done();
        });
    });
  });
});
