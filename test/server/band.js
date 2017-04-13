import chai, { expect } from 'chai';
import server from '../../src/server/main';

describe('band', () => {
  describe('index', () => {
    it('has the correct data structure', (done) => {
      chai.request(server)
        .get('/band/Mastodon')
        .end((err, res) => {
          const { body } = res;
          expect(res, 'status').to.have.status(200);
          expect(body.name, 'name').to.eq('Mastodon');
          expect(body.similar_bands).to.be.a('array');
          expect(body.similar_bands).to.have.length(5);
          expect(body.genres).to.be.a('array');
          expect(body.genres).to.have.length(3);
          expect(body.albums).to.be.a('array');
          expect(body.albums).to.have.length.of.at.least(7);
          done();
        });
    });

    it('has the correct genres', (done) => {
      chai.request(server)
        .get('/band/Mastodon')
        .end((err, res) => {
          const { genres } = res.body;
          const expectedGenres = [
            'Progressive Metal',
            'Sludge Metal',
            'Metal'
          ];
          expect(genres).to.be.a('array');
          expect(genres).to.eql(expectedGenres);
          done();
        });
    });
  });
});
