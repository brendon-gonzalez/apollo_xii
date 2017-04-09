import chai from 'chai';
import chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
process.env.port = 8081;
chai.use(chaiHttp);
chai.should();
