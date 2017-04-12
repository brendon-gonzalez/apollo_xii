import URL from 'url';
import config from '../config';

export default function formatter(options) {
  return URL.format(Object.assign({
    protocol: 'http',
    host: config.host,
  }, options));
}
