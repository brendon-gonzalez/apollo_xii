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
          expect(body.similar_bands).to.have.length(4);
          expect(body.genres).to.be.a('array');
          expect(body.genres).to.have.length(3);
          expect(body.discography).to.be.a('array');
          expect(body.discography).to.have.length.of.at.least(4);
          done();
        });
    });

    it('has the correct genres', (done) => {
      chai.request(server)
        .get('/band/Mastodon')
        .end((err, res) => {
          const { genres } = res.body;
          const expectedGenres = [
            'Sludge Metal',
            'Progressive Metal',
            'Metal'
          ];
          expect(genres).to.be.a('array');
          expect(genres).to.eql(expectedGenres);
          done();
        });
    });

    it('discography', (done) => {
      chai.request(server)
        .get('/band/Mastodon')
        .end((err, res) => {
          const { discography } = res.body;
          const LPs = discography[0];
          const emperorOfSand = LPs.albums.find(album => album.title === 'Emperor of Sand');

          // Discography structure
          expect(discography).to.be.a('array');
          expect(discography).to.have.length.at.least(4);
          expect(LPs.type).to.eq('LPs');
          expect(LPs.albums).to.have.length.at.least(4);

          // Album structure
          expect(emperorOfSand.rating).to.be.at.least(3.8);
          expect(emperorOfSand.votes).to.be.at.least(500);
          expect(emperorOfSand.title).to.equal('Emperor of Sand');
          done();
        });
    });

    it('has the correct similar artists', (done) => {
      chai.request(server)
        .get('/band/Mastodon')
        .end((err, res) => {
          const { similar_bands } = res.body;
          const expectedSimilarBands = [{
            href: '/band/Intronaut',
            name: 'Intronaut'
          },
          {
            href: '/band/Baroness',
            name: 'Baroness'
          },
          {
            href: '/band/Red+Fang',
            name: 'Red Fang'
          },
          {
            href: '/band/Burst',
            name: 'Burst'
          }];
          expect(similar_bands).to.be.a('array');
          expect(similar_bands).to.eql(expectedSimilarBands);
          done();
        });
    });
  });
});
