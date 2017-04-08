import { join } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import config from '../config';
import router from './router';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'dist/app')));
app.use('/', router);

const server = app.listen(config.port, () => {
  console.log('server is running');
});

export default server;
