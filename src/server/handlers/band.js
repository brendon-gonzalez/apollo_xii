import cheerio from 'cheerio';
import request from 'request-promise';
import config from '../config';
import formatter from '../lib/formatter';

export function index(req, res) {
  const { id } = req.params;
  const { redirected } = req.query;
  let urlObject = {};
  // TODO: Find a better way to do this. I already hate it.
  if (redirected) {
    urlObject = {
      pathname: 'bands.php',
      query: {
        bandid: id
      }
    };
  } else {
    urlObject = {
      pathname: `band/${id}`
    };
  }
  const url = formatter(urlObject);

  request({ url, timeout: config.timeout })
  .then((body) => {
    const $ = cheerio.load(body);
    const albumTypes = $('.plaincontentbox > tr span[style*="a23939"]')
      .map((i, section) => ({
        start: $('.plaincontentbox > tr').index($(section).closest('tr').get(0)),
        type: $(section).text()
      })).get();

    const parsedAlbums = albumTypes.map((albumType, albumTypeIndex) => {
      const albums = [];
      const next = albumTypes[albumTypeIndex + 1];
      const start = albumType.start + 1;
      const end = (next) ? next.start - 1 : $('.plaincontentbox > tr').length - 1;

      for (let i = start; i <= end; i += 1) {
        const albumsInRow = $('.plaincontentbox > tr').eq(i).find('td[width="120"]');
        albumsInRow.each((j, albumInRow) => {
          const albumStats = $(albumInRow).next('td');
          const album = {
            image: $(albumInRow).find('img').attr('src'),
            title: albumStats.find('font[size="2"]').text(),
            year: parseInt(albumStats.find('font[size="1"]').text().split('/').pop(), 10),
            rating: parseFloat(albumStats.find('center font[size="4"]').text(), 10),
            votes: parseInt(albumStats.find('center font[size="1"]').text().replace(',', ''), 10)
          };
          albums.push(album);
        });
      }

      return {
        type: albumType.type,
        albums
      };
    });

    const response = {
      name: $('font[size="6"]').text(),
      genres: $('.tags .tag').map((i, tag) => $(tag).text().trim()).get(),
      albums: parsedAlbums,
      similar_bands: $('p.alt2[style*="font-size:9pt"] > a').map((i, band) => ({
        name: $(band).text(),
        href: $(band).attr('href')
      })).get()
    };
    res
      .status(200)
      .send(response);
  })
  .catch(error =>
    res
      .status(500)
      .send(error)
  );
}
