import URL from 'url';
import request from 'request-promise';
import config from '../../config';

function formatter(options) {
  return URL.format(Object.assign({
    protocol: 'http',
    host: config.host,
  }, options));
}

export default function autoSuggest(req, res) {
  const { keyword } = req.params;
  const url = formatter({
    pathname: 'bsearch.php',
    query: {
      term: keyword
    }
  });
  request({ url })
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
