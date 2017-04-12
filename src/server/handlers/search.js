// import cheerio from 'cheerio';
import request from 'request-promise';
import config from '../config';
import formatter from '../lib/formatter';

export function index(req, res) {
  const { keyword } = req.params;
  const url = formatter({
    pathname: 'search_results.php',
    query: {
      search_in: 'Bands',
      search_text: keyword
    }
  });
  request({
    url,
    timeout: config.timeout,
    followRedirect: false,
    resolveWithFullResponse: true,
    simple: false
  })
  .then((response) => {
    const { statusCode, headers } = response;
    if (statusCode === 200) {
      // Do search
      res
        .status(200)
        .send({});
    } else if (statusCode === 302) {
      // Found something, redirect.
      const bandId = headers.location.split('bandid=')[1];
      res
        .status(302)
        .redirect(`/band/${bandId}?redirected=true`);
    }
  })
  .catch(error =>
    res
      .status(500)
      .send(error)
  );
}

export function autoSuggest(req, res) {
  const { keyword } = req.params;
  const url = formatter({
    pathname: 'bsearch.php',
    query: {
      term: keyword
    }
  });
  request({ url, timeout: config.timeout })
  .then((body) => {
    let json = {};
    try {
      json = JSON.parse(body);
    } catch (e) { throw (e); }
    return res
      .status(200)
      .send(json);
  })
  .catch(error =>
    res
      .status(500)
      .send(error)
  );
}
