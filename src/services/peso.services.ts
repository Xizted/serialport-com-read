import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

export const getPesoServices = () =>
  new Promise<string>((res, rej) => {
    const path = 'COM1';

    const serialPort = new SerialPort({
      path: path,
      baudRate: 9600,
      autoOpen: false,
      lock: true,
    });

    const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    serialPort.on('open', () => {
      console.log('Serial Port Opened');
    });

    serialPort.open((err) => {
      if (err) {
        rej(new Error('The balance is not connected'));
        return;
      }
    });

    parser.on('data', (data: Buffer, err: Error) => {
      if (err) {
        rej(err);
        return;
      }
      serialPort.close((err) => {
        if (err) {
          rej(err);
          return;
        }
      });
      console.log('Data: ', data.toString());
      res(data.toString());
      return;
    });
  });

export const getPortService = () =>
  new Promise<any[]>((res, rej) => {
    SerialPort.list().then((ports) => {
      let coms: any[] = [];
      ports.forEach((port) => {
        coms.push(port);
      });
      res(coms);
    });
  });
