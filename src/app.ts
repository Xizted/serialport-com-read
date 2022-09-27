import express, { Request, Response } from 'express';
import morgan from 'morgan';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';
import getPesoController from './controller/peso.controller';
import getPesoTestController from './controller/pesoTest.controller';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
});

app.get('/', getPesoController);
if (process.env.NODE_ENV === 'development') {
  app.get('/test', getPesoTestController);
}

app.use(errorHandler);
app.use(notFound);

export default app;
