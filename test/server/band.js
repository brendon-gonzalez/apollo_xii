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

    it('has the correct albums', (done) => {
      chai.request(server)
        .get('/band/Mastodon')
        .end((err, res) => {
          const { albums } = res.body;
          const LPs = albums[0];
          const expectedLPs = [{
            image: '/images/albums/243422.jpg-thumbl',
            title: 'Emperor of Sand',
            year: 2017,
            rating: 3.8,
            votes: 654
          },
          { image: '/images/albums/163355.jpg-thumbl',
            title: 'Once More \'Round the Sun',
            year: 2014,
            rating: 3.7,
            votes: 1591
          },
          { image: '/images/albums/83301.jpg-thumbl',
            title: 'The Hunter',
            year: 2011,
            rating: 3.7,
            votes: 2465
          },
          { image: '/images/albums/36170.jpg-thumbl',
            title: 'Crack the Skye',
            year: 2009,
            rating: 4.1,
            votes: 3916
          },
          { image: '/images/albums/11289.jpg-thumbl',
            title: 'Blood Mountain',
            year: 2006,
            rating: 4,
            votes: 3658
          },
          { image: '/images/albums/1474.jpg-thumbl',
            title: 'Leviathan',
            year: 2004,
            rating: 4.2,
            votes: 3840
          },
          { image: '/images/albums/982.jpg-thumbl',
            title: 'Remission',
            year: 2002,
            rating: 3.8,
            votes: 2162
          }];
          expect(albums).to.be.a('array');
          expect(albums).to.have.length(4);
          expect(LPs.type).to.eq('LPs');
          expect(LPs.albums).to.have.length(7);
          expect(LPs.albums).to.eql(expectedLPs);
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
