import express, { NextFunction, Request, Response } from 'express';
import { SerialPort } from 'serialport';
import morgan from 'morgan';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const getPeso = new Promise<string>((res, rej) => {
  try {
    const port = 'COM1';

    const serialPort = new SerialPort({
      path: port,
      baudRate: 9600,
    });

    serialPort.on('open', () => {
      console.log('Serial Port Opend');
    });

    serialPort.on('data', (data: string, err: Error) => {
      if (err) {
        rej(err);
        return;
      }
      serialPort.on('close', () => console.log('Serial Port Close'));
      res(data);
    });
  } catch (error) {
    rej(error);
  }
});

app.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
});

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getPeso;
    return res.send(data);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);
app.use(notFound);

export default app;
