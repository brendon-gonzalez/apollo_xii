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
  const keyword = req.param('keyword');
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
    } catch (e) { console.error(e); }
    return res.send(200, json);
  })
  .catch(error =>
    res.send(500, error)
  );
}
