import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import { join } from 'path';
import config from './config';
import router from './router';

const app = express();
const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'dist/app')));
app.use('/', router);

const server = app.listen(config.port, () => {
  console.log(`process is running in ${NODE_ENV} on port ${config.port}`);
});

export default server;
