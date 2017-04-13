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
    const response = {
      name: $('font[size="6"]').text(),
      genres: $('.tags .tag').map((i, tag) => $(tag).text().trim()).get(),
      albums: Array(7),
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
