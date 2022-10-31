import express, { Request, Response } from 'express';
import morgan from 'morgan';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';
import { getPortCom, getPesoController } from './controller/peso.controller';
import getPesoTestController from './controller/pesoTest.controller';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
});

app.get(
  '/',
  process.env.NODE_ENV === 'development'
    ? getPesoTestController
    : getPesoController
);
app.get('/listPort', getPortCom);

app.use(errorHandler);
app.use(notFound);

export default app;
